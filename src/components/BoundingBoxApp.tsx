import React, { useState, useRef, useCallback } from 'react';
import { Plus, X } from 'lucide-react';

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

interface Point {
  x: number;
  y: number;
}

const BoundingBoxApp: React.FC = () => {
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([
    {
      id: '1',
      x: 180,
      y: 80,
      width: 180,
      height: 80,
      label: 'Correct Cross Pinch Bolt'
    },
    {
      id: '2',
      x: 180,
      y: 180,
      width: 220,
      height: 120,
      label: 'Stub Shaft Visible in U Joint'
    }
  ]);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentBox, setCurrentBox] = useState<Omit<BoundingBox, 'id' | 'label'> | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  
  const imageRef = useRef<HTMLDivElement>(null);

  const annotationItems = [
    'Stub Shaft in U Joint',
    'Cross Pinch Bolt',
    'U Joint',
    'Steering Column'
  ];

  const getMousePosition = (e: React.MouseEvent): Point => {
    if (!imageRef.current) return { x: 0, y: 0 };
    const rect = imageRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target !== imageRef.current) return;
    const point = getMousePosition(e);
    setStartPoint(point);
    setIsDrawing(true);
    setSelectedBoxId(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !startPoint) return;
    
    const currentPoint = getMousePosition(e);
    const box = {
      x: Math.min(startPoint.x, currentPoint.x),
      y: Math.min(startPoint.y, currentPoint.y),
      width: Math.abs(currentPoint.x - startPoint.x),
      height: Math.abs(currentPoint.y - startPoint.y)
    };
    
    setCurrentBox(box);
  }, [isDrawing, startPoint]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || !currentBox || !startPoint) return;
    
    if (currentBox.width > 10 && currentBox.height > 10) {
      const newBox: BoundingBox = {
        id: Date.now().toString(),
        ...currentBox,
        label: 'New Annotation'
      };
      setBoundingBoxes(prev => [...prev, newBox]);
      setSelectedBoxId(newBox.id);
      setNewLabel('New Annotation');
    }
    
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentBox(null);
  }, [isDrawing, currentBox, startPoint]);

  const deleteBoundingBox = (id: string) => {
    setBoundingBoxes(prev => prev.filter(box => box.id !== id));
    setSelectedBoxId(null);
  };

  const updateLabel = (id: string, label: string) => {
    setBoundingBoxes(prev => prev.map(box => 
      box.id === id ? { ...box, label } : box
    ));
  };

  const selectAnnotationItem = (item: string) => {
    if (selectedBoxId) {
      updateLabel(selectedBoxId, item);
      setNewLabel(item);
    }
  };

  const handleSubmit = () => {
    const annotationData = {
      image: "steering-column-image",
      annotations: boundingBoxes.map(box => ({
        id: box.id,
        label: box.label,
        coordinates: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height
        }
      })),
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting annotations:', annotationData);
    alert(`Submitted ${boundingBoxes.length} annotations successfully!`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Image Area */}
      <div className="flex-1 p-4">
        <div 
          ref={imageRef}
          className="relative w-full h-96 bg-gray-800 cursor-crosshair overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/190537/pexels-photo-190537.jpeg?auto=compress&cs=tinysrgb&w=600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Existing Bounding Boxes */}
          {boundingBoxes.map(box => (
            <div key={box.id}>
              <div
                className={`absolute border-2 ${
                  selectedBoxId === box.id ? 'border-yellow-400' : 'border-blue-500'
                } cursor-pointer`}
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.width,
                  height: box.height
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBoxId(box.id);
                  setNewLabel(box.label);
                }}
              />
              <div
                className="absolute bg-blue-500 text-white text-xs px-2 py-1 whitespace-nowrap"
                style={{
                  left: box.x,
                  top: box.y - 25
                }}
              >
                {box.label}
              </div>
              {selectedBoxId === box.id && (
                <button
                  className="absolute bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  style={{
                    left: box.x + box.width - 12,
                    top: box.y - 12
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBoundingBox(box.id);
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          
          {/* Current Drawing Box */}
          {currentBox && (
            <div
              className="absolute border-2 border-yellow-400 border-dashed"
              style={{
                left: currentBox.x,
                top: currentBox.y,
                width: currentBox.width,
                height: currentBox.height
              }}
            />
          )}
        </div>
        
        {/* Bottom Thumbnails */}
        <div className="flex mt-4 space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-20 h-16 bg-gray-600 rounded"></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white p-4 border-l">
        {/* Controls */}
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 text-white p-2 rounded mr-2">
            <Plus size={16} />
          </button>
          <button className="bg-gray-500 text-white p-2 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Annotation Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Annotate</h3>
          <h4 className="text-base font-medium mb-3">Steering Column</h4>
          
          <div className="space-y-2">
            {annotationItems.map(item => (
              <div
                key={item}
                className={`p-2 cursor-pointer rounded ${
                  item === 'Stub Shaft in U Joint' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                }`}
                onClick={() => selectAnnotationItem(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Box Controls */}
        {selectedBoxId && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Edit Label:</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
                updateLabel(selectedBoxId, e.target.value);
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
          <button className="w-full bg-gray-300 text-gray-700 py-2 rounded font-medium">
            SAVE
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded font-medium">
            CANCEL
          </button>
        </div>

        {/* Current Boxes List */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Current Annotations:</h4>
          <div className="space-y-1 text-sm">
            {boundingBoxes.map(box => (
              <div
                key={box.id}
                className={`p-2 rounded cursor-pointer ${
                  selectedBoxId === box.id ? 'bg-blue-100' : 'bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedBoxId(box.id);
                  setNewLabel(box.label);
                }}
              >
                {box.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoundingBoxApp;