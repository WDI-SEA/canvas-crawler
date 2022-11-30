const movementDisplay = document.querySelector('#movement')
const statusDisplay = document.querySelector('#status')
const canvas = document.querySelector('canvas')
// set the canvas's resolution to be the same as the window
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// console.log(movementDisplay, statusDisplay, canvas)

// get rendering context from the canvas
const ctx = canvas.getContext('2d')
// console.log(ctx)

// // drawing is a 2 step process
// // step 1 -- set rendering context properties
// ctx.fillStyle = 'green' // any valid css color will work 
// // step 2 -- invoke rendering context methods
// // ctx.fillRect(x, y, width, height) *in pixels
// ctx.fillRect(0, 0, 100, 100)
// ctx.fillStyle = 'blue'
// ctx.fillRect(50, 50, 100, 300)

// // make a function to draw a box
// function drawBox(x, y, width, height, color) {
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, width, height)
// }

// drawBox(200, 150, 45, 75, 'purple')

// canvas.addEventListener('click', e => {
//     console.log(e.offsetX, e.offsetY)
//     drawBox(e.offsetX, e.offsetY, 30, 30, 'hotpink')
// })

// define a class to represent on screen game objects
class Crawler {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color

    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// game varaibles area
const gameLoopInterval = setInterval(gameLoop, 60)
const hero = new Crawler(5, 5, 25, 25, 'hotpink')
const ogre = new Crawler(400, 150, 50, 75, 'green')

// const testCrawler = new Crawler(50, 50, 45, 45, 'white')
// testCrawler.render()

// const newCrawler = new Crawler(10)
// const newCrawler = {
//     x: 10,
//     y: 10,
//     width: 50,
//     height: 50,
//     color: 'purple'
// }

// define a way to handle user input to move our hero around
function handleMovement(e) {
    console.log(e.key)
    const speed = 5
    switch (e.key) {
        case('w'):
            // move the hero up
            // console.log('move the hero up')
            hero.y -= speed
            break
        case('s'):
            // console.log('move the hero down')
            hero.y += speed
            break
        case('a'):
            // console.log('move the hero to the left')
            hero.x -= speed
            break
        case('d'):
            // console.log('move the hero to the right')
            hero.x += speed
            break
        default:
            // console.log('that key doesn\'t move the hero')
    }
    movementDisplay.innerText = `x: ${hero.x} y: ${hero.y}`
}
document.addEventListener('keydown', handleMovement)

// define a gameloop
function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // do buisiness logic of the game
    // render all of the game objects
    hero.render()
    ogre.render()
}
// define a collision detection algorithm