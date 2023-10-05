// console.log("hello canvas!")
/* ----- DOM SELECTORS ------ */
const movement = document.querySelector("#movement");
const status = document.querySelector("#status");
const canvas = document.querySelector("canvas");

// console.log(movement, status, canvas)

/* ----- CANVAS SETUP ------- */
// get the canvas context
const ctx = canvas.getContext("2d");
console.log(ctx);
// set the canvas's resolution to be the same as the windows (weird but okay)
// set the canvas to be the render size it appears on the page
// (how you make a responsive canves)
canvas.setAttribute("height", getComputedStyle(canvas).height);
canvas.setAttribute("width", getComputedStyle(canvas).width);

// // set context properties
// ctx.fillStyle = "purple";
// // invoke methods to use those properties
// // fillRect(x, y, width, height)
// ctx.fillRect(10, 20, 40, 40);

// ctx.fillRect(75, 90, 40, 20);

// ctx.fillStyle = "blue";
// ctx.fillRect(100, 100, 45, 75);

// ctx.strokeStyle = "red";
// ctx.strokeRect(30, 30, 45, 75);

/* ----- CLASSES ------------ */

/* ----- FUNCTIONS ---------- */
function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// drawBox(50, 100, 35, 75);

/* ----- EVENT LISTENERS ---- */
canvas.addEventListener('click', e => {
    movement.innerText = `x: ${e.offsetX}, y: ${e.offsetY}`;
    drawBox(e.offsetX, e.offsetY, 30, 30, "#C724B1")
});
