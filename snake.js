// Snake Game
// Define canvas size
const canvasWidth = 500;
const canvasHeight = 500;

// Define the size of the square grid
const gridSize = 20;

// Get the canvas element
const canvas = document.getElementById("game-board");

// Set the canvas size
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Get the context of the canvas
const ctx = canvas.getContext("2d");

// Define the initial position of the snake
let snakeX = canvasWidth / 2;
let snakeY = canvasHeight / 2;

// Define the initial direction of the snake
let direction = "right";

// Define the initial size of the snake
let snakeSize = gridSize;

// Define the food position
let foodX;
let foodY;

// Define the score
let score = 0;

// Define the snake body
let snakeBody = [{x: snakeX, y: snakeY}];

// Draw the snake
function drawSnake() {
ctx.fillStyle = "green";
snakeBody.forEach((segment) => {
ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
});
}

// Draw the food
function drawFood() {
ctx.fillStyle = "red";
ctx.fillRect(foodX, foodY, snakeSize, snakeSize);
}

// Check if the snake has collided with the wall or itself
function checkCollision() {
if (snakeX < 0 || snakeX >= canvasWidth || snakeY < 0 || snakeY >= canvasHeight) {
clearInterval(gameInterval);
alert("Game Over! Your score is: " + score);
location.reload();
}
for (let i = 1; i < snakeBody.length; i++) {
if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
clearInterval(gameInterval);
alert("Game Over! Your score is: " + score);
location.reload();
}
}
}

// Generate the food position
function generateFood() {
foodX = Math.floor(Math.random() * canvasWidth / gridSize) * gridSize;
foodY = Math.floor(Math.random() * canvasHeight / gridSize) * gridSize;
}

// Check if the snake has eaten the food
function checkFood() {
const tolerance = gridSize / 0.5;
if (
snakeX + tolerance >= foodX &&
snakeX - tolerance <= foodX &&
snakeY + tolerance >= foodY &&
snakeY - tolerance <= foodY
) {
generateFood();
score++;
let newSegmentX = snakeBody[snakeBody.length - 1].x;
let newSegmentY = snakeBody[snakeBody.length - 1].y;
snakeBody.push({x: newSegmentX, y: newSegmentY});
}
}

// Update the snake position
function updateSnake() {
for (let i = snakeBody.length - 1; i > 0; i--) {
snakeBody[i].x = snakeBody[i-1].x;
snakeBody[i].y = snakeBody[i-1].y;
}
snakeX = snakeBody[0].x;
snakeY = snakeBody[0].y;
switch (direction) {
case "up":
snakeY -= gridSize;
break;
case "down":
snakeY += gridSize;
break;
case "left":
snakeX -= gridSize;
break;
case "right":
snakeX += gridSize;
break;
}
snakeBody[0].x = snakeX;
snakeBody[0].y = snakeY;
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Update the game
function updateGame() {
  clearCanvas();
  drawSnake();
  drawFood();
  checkCollision();
  checkFood();
  updateSnake();
}

// Set up the game
function setUpGame() {
  generateFood();
  drawFood();
  drawSnake();
}



// Start the game
let gameInterval;
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function () {
  
  gameInterval = setInterval(updateGame, 100);
  setUpGame()
});

const upButton = document.getElementById("up-button");
upButton.addEventListener("click", function () {
  direction = "up";
});

const downButton = document.getElementById("down-button");
downButton.addEventListener("click", function () {
  direction = "down";
});

const leftButton = document.getElementById("left-button");
leftButton.addEventListener("click", function () {
  direction = "left";
});

const rightButton = document.getElementById("right-button");
rightButton.addEventListener("click", function () {
  direction = "right";
});

// Add event listeners for the arrow keys
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp") {
    direction = "up";
  } else if (event.code === "ArrowDown") {
    direction = "down";
  } else if (event.code === "ArrowLeft") {
    direction = "left";
  } else if (event.code === "ArrowRight") {
    direction = "right";
  }
});
