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
// define a class to use for our game objects
class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
    }

    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// instantiate some game objects
const testCrawler = new Crawler(45, 45, 65, 23, "green");
// testCrawler.render();
const hero = new Crawler(0, 0, 30, 30, "hotpink");
const ogre = new Crawler(287, 79, 50, 70, "#bada55");

/* ----- FUNCTIONS ---------- */
function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// drawBox(50, 100, 35, 75);

// handle keyboard input from the user
function movementHandler(e) {
    if (ogre.alive) {
        // console.log(e);
        const speed = 10; // how many pixels the hero moves per movement
        // one varaible that can be many values and each value has a different chunk of code to run -- use a switch case!
        switch(e.key.toLowerCase()) {
            case "w":
                hero.y -= speed;
                break;
            case "s":
                hero.y += speed;
                break;
            case "a":
                hero.x -= speed;
                break;
            case "d":
                hero.x += speed;
                break;
            default:
                // any other value will run the defualt
                console.log(`${e.key} not recognized!`);
        }
    }
}

// collision detection algorithm
function detectHit() {
    // AABB axis aligned bounding box algorithm
    // check for collisions on each side of each object
    // if each boundary is passed -- a collision is detected

    // top of the ogre
    const top = hero.y + hero.height >= ogre.y;
    // bottom of the ogre
    const bottom = hero.y <= ogre.y + ogre.height;
    // Left of ogre
    const left = hero.x + hero.width >= ogre.x;
    // Right of ogre
    const right = hero.x <= ogre.x + ogre.width;
    // console.log(`top: ${top}, bottom: ${bottom}, left: ${left}, right: ${right}`)
    if (top && bottom && left && right) {
        // console.log("hit detected!")
        return true
    }

    return false
}

// create a gameloop -- run the business logic of the game and be called by a setInterval
const gameInterval = setInterval(gameloop, 80);
function gameloop() {
    // clear the canvas to rerender
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // render all game objects
    hero.render();
    if (ogre.alive) {
        ogre.render();
    }
    // do game logic
    if (detectHit()) {
        // the game has ended
        // set ogre to be not alive
        ogre.alive = false;
        // display a message to the user
        status.innerText = "You have killed skrek 😭";
    }
}

/* ----- EVENT LISTENERS ---- */
canvas.addEventListener('click', e => {
    movement.innerText = `x: ${e.offsetX}, y: ${e.offsetY}`;
    drawBox(e.offsetX, e.offsetY, 30, 30, "#C724B1")
});

document.addEventListener('keydown', movementHandler);
 