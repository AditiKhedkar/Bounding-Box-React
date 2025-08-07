
<img width="1311" height="569" alt="image" src="https://github.com/user-attachments/assets/f9965d37-d3ca-4613-908e-2b4498996543" />
<img width="629" height="341" alt="image" src="https://github.com/user-attachments/assets/309d7728-a084-4edd-b1c2-e89bac89dcc3" />
commit changes 
![Uploading image.png…]()



https://strong-cucurucho-f8832e.netlify.app/
# Bounding Box Annotation Tool

A simple web application for drawing and labeling rectangular annotations on images. Perfect for creating training data for machine learning models or documenting image contents.

## What does this do?

This tool lets you:
- Draw rectangular boxes around objects in images
- the thumbnails will be captured
- Add labels to describe what's in each box
- Export your annotations as structured data
- Edit or delete annotations as needed

Think of it like drawing boxes around things in a photo and writing notes about what each box contains.

## Getting Started


### Setting up the project

1. **Download the code**
   ```bash
   git clone <your-repository-url>
   cd bounding-box-app
   ```

2. **Install the required packages**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

4. **Open your browser** and go to the URL shown in your terminal (usually http://localhost:5173)

## How to use it

### Creating annotations

1. **Draw a box**: Click and drag on the image to create a rectangular box around something interesting
2. **Add a label**: Click on the box you just created, then type a description in the text field on the right
3. **Use quick labels**: Click on the predefined labels in the sidebar to quickly label common items
4. **Save your work**: Click the SUBMIT button to export your annotations

### Managing your annotations

- **Select a box**: Click on any existing box to select it (it will turn yellow)
- **Edit labels**: Select a box and type in the text field to change its label
- **Delete boxes**: Select a box and click the red X button to remove it
- **See all annotations**: Check the list at the bottom of the sidebar to see everything you've labeled

### Exporting your data

When you click SUBMIT, the app creates a structured file with:
- The coordinates of each box you drew
- The labels you assigned
- A timestamp of when you created the annotations

This data can be used for training AI models, documentation, or any other purpose.

## Technical Details

### Built with
- **React**: For the user interface
- **TypeScript**: For better code reliability
- **Tailwind CSS**: For styling
- **Vite**: For fast development and building

### Project structure
```
src/
├── components/
│   └── BoundingBoxApp.tsx    # Main application
├── App.tsx                   # App wrapper
├── main.tsx                  # Entry point
└── index.css                 # Styles
```

### Key features
- **Real-time drawing**: See your boxes as you draw them
- **Visual feedback**: Selected boxes are highlighted differently
- **Responsive design**: Works on different screen sizes
- **Data validation**: Prevents tiny or invalid boxes

## Customizing the tool


### Using different images

Replace the image URL in the component:

```typescript
backgroundImage: 'url("your-image-url-here")'
```

### Changing colors

The app uses Tailwind CSS classes. Key colors:
- Blue boxes: `border-blue-500`
- Selected boxes: `border-yellow-400`
- Buttons: Various `bg-` classes

## Common issues and solutions

**Problem**: Boxes aren't appearing when I draw
- **Solution**: Make sure you're clicking and dragging on the image itself, not the sidebar

**Problem**: Labels aren't saving
- **Solution**: Make sure you've selected a box (it should be yellow) before typing

**Problem**: The app won't start
- **Solution**: Run `npm install` again, then `npm run dev`

**Problem**: I can't see my changes
- **Solution**: Refresh your browser or restart the development server

## Building for production

When you're ready to share your app:

```bash
npm run build
```

This creates a `dist` folder with files you can upload to any web hosting service.


## Getting help

If something isn't working:
1. Check the browser console for error messages (F12 → Console)
2. Make sure all dependencies are installed (`npm install`)
3. Try restarting the development server
4. Check that your Node.js version is up to date


