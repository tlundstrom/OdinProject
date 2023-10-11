const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#333";
const DEFAULT_MODE = "color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const gridReset = () => {
  removeGrid();
  createGrid(currentSize);
};

const removeGrid = () => {
  gridWindow.innerHTML = "";
};

const getGridSize = () => {
  let newSize = prompt("Choose a new grid size, between 1 and 100.");
  if (newSize === null) return;
  newSize < 1 || newSize > 100 ? getGridSize() : setGridSize(newSize);
};

const setGridSize = (newSize) => {
  currentSize = newSize;
  gridReset();
};
const colorPicker = (color) => {
  currentMode = "color";
  currentColor = color;
};

const setColor = (color) => {
  currentMode = color;
};

const gridWindow = document.getElementById("window");

const createGrid = (size) => {
  gridWindow.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridWindow.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("mouseover", draw);
    cell.addEventListener("mousedown", draw);
    gridWindow.appendChild(cell);
  }
};

const genRandomRGB = () => {
  return Math.floor(Math.random() * 256);
};

const draw = (e) => {
  if (e.type === "mouseover" && !mouseDown) return;
  currentMode === "rainbow"
    ? (e.target.style.background = `rgb(${genRandomRGB()}, ${genRandomRGB()}, ${genRandomRGB()})`)
    : (e.target.style.background = currentColor);
};

window.onload = () => {
  createGrid(currentSize);
};

const input = document.getElementById("colorPicker");

input.addEventListener("focus", function () {
  setTimeout(() => {
    // toggle the type attribute to close the picker!
    input.setAttribute("type", "text");
    input.setAttribute("type", "color");
  }, 2000);
});
