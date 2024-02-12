let colors = ['#3cace1', '#d9f200' ];
let currentColor;
let rectSize = 40;
let backgroundImage;
let drawingCanvas; // Separate canvas for drawing rectangles

function setup() {
  stroke(0, 0, 0);
  createCanvas(1540, 866);
  background('#e9e9e9');
  currentColor = color(255, 0, 0);

  // Create file input element
  //let fileInput = createFileInput(handleFile);
  //fileInput.position(20, 20); // Position at the top

  // Optional: Add some instructions
  //let instructions = createP('Upload an image and start drawing!');
  //instructions.position(20, 50);

  // Create a separate canvas for drawing rectangles
  drawingCanvas = createGraphics(width, height);
}

function draw() {
  // Draw the background image if available
  if (backgroundImage) {
    let aspectRatio = backgroundImage.width / backgroundImage.height;
    let canvasWidth = height * aspectRatio;
    let canvasHeight = height;
    image(backgroundImage, 0, 0, canvasWidth, canvasHeight);
  }

  // Draw the rectangles on the separate canvas
  if (mouseIsPressed) {
    drawingCanvas.fill(currentColor);
    drawingCanvas.noStroke();

    // Add corner radii to create rectangles with rounded corners
    let cornerRadius = 10;
    drawingCanvas.rect(
      mouseX - rectSize / 2,
      mouseY - rectSize / 2,
      rectSize,
      rectSize,
      cornerRadius
    );
  }

  // Display the drawing canvas on top of the main canvas
  image(drawingCanvas, 0, 0);
}

function mousePressed() {
  // Change color randomly from the set of colors
  currentColor = color(random(colors));
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    saveCanvas('EK-bg', 'png');
  } else if (keyCode === LEFT_ARROW) {
    noLoop();
  }
}

// Handle file selection
function handleFile(file) {
  if (file.type === 'image') {
    // Load the selected image as the background
    backgroundImage = loadImage(file.data, () => {
      redraw(); // Redraw the canvas to display the new background
    });
  } else {
    alert('Please upload an image file.');
  }
}
