// DOM SELECTORS
const movementDisplay = document.querySelector("#movement")
const statusDisplay = document.querySelector("#status")
const canvas = document.querySelector("canvas")
// console.log(movementDisplay, statusDisplay, canvas)

// CANVAS SETUP
const ctx = canvas.getContext("2d")
// ask the DOM what size the canvas actually is in pixels
// and set the canvas's resolution to be that size
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// // console.log(ctx)

// // set renderer properties
// ctx.fillStyle = "green"
// // invoke renderer methods
// // fillRect(x, y, width, height)
// ctx.fillRect(10, 10, 100, 100)

// //set renderer properties
// ctx.fillStyle = "purple"
// // invoke renderer methods
// ctx.fillRect(200, 100, 45, 200)

// ctx.strokeStyle = "brown"
// ctx.lineWidth = 15
// ctx.strokeRect(45, 45, 50, 125)

// // group context property setting and method calls together, as we see fit
// function drawBox(x, y, w, h, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, w, h)
// }

// drawBox(50, 50, 35, 100, "orange")

// canvas.addEventListener('click', e => {
//     console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
//     drawBox(e.offsetX, e.offsetY, 30, 30, "blue")
// })

class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// GAME OBJECTS
const hero = new Crawler(0, 0, 45, 45, "hotpink")
const ogre = new Crawler(400, 75, 100, 150, "#bada55")

const gameLoopInterval = setInterval(gameLoop, 60)

// const testCrawler = new Crawler(10, 45, 100, 50, "blue")
// testCrawler.render()

function handleKeyPressEvent(e) {
    const speed = 10
    switch(e.key) {
        case "w":
        case "ArrowUp":
            hero.y -= speed
            break
        case "s":
        case "ArrowDown":
            hero.y += speed
            break
        case "a":
        case "ArrowLeft":
            hero.x -= speed
            break
        case "d":
        case "ArrowRight":
            hero.x += speed
            break
        }
        movementDisplay.innerText = `x: ${hero.x} y: ${hero.y}`
}

document.addEventListener("keydown", handleKeyPressEvent)

function gameLoop() {
    // clear off the renderer
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // buisiness logic of our game
    // check for collision
    // check for end game conditions
    // do all of the rendering
    hero.render()
    ogre.render()
}
