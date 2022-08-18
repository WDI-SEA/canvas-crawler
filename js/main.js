const movementDisplay = document.querySelector('#movement')
const statusDisplay = document.querySelector('#status')
const canvas = document.querySelector('canvas')
// console.log(movementDisplay, statusDisplay, canvas)

// get the rendering contex from canvas
const ctx = canvas.getContext('2d')
// set the canvas's resolution to be the same as the window
// console.log(getComputedStyle(canvas).height)
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])

// // set context properties
// ctx.fillStyle = 'green'
// // invoke context methods to render things
// // ctx.fillRect(x, y, width, height) (in pixels*)
// ctx.fillRect(10, 10, 100, 100)
// // console.log(canvas.width, canvas.height)
// ctx.strokeStyle = 'blue'
// ctx.lineWidth = 20
// ctx.strokeRect(45, 100, 150, 200)
// ctx.strokeRect(300, 300, 50, 50)

// ctx.strokeStyle = 'purple'
// ctx.lineWidth = 5
// ctx.strokeRect(600, 300, 70, 90)

function drawBox(x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

// drawBox(10, 10, 100, 100, 'purple')

canvas.addEventListener('click', e => {
    console.log(e.offsetX, e.offsetY)
    drawBox(e.offsetX, e.offsetY, 50, 50, 'blue')
})

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

// const myObject = {
//     // 'object literal'
//     key: 'i am literally defined'
// }

// const myCrawler = new Crawler(20, 20, 45, 45, 'green')
// myCrawler.render()

// define game objects
const hero = new Crawler(10, 10, 35, 35, 'hotpink')
const ogre = new Crawler(600, 200, 100, 150, 'green')
const bullets = []
const shrekBullets = []

// shrek is fighting back
const ogreShootInterval = setInterval(() => {
    shrekBullets.push(new Crawler(ogre.x, ogre.y, 10, 10, 'blue'))
}, 200)

// define movement handler function
function movementHandler(e) {
    console.log(e)
    const speed = 10 // how many pixels the hero moves
    if (hero.alive) {
        switch (e.key) {
            case('w'):
                // move the hero up
                hero.y -= speed
                if (hero.y < 0) {
                    hero.y = 0
                }
                break
            case('s'):
                // move the hero down
                hero.y += speed
                if (hero.y + hero.height > canvas.height) {
                    hero.y = canvas.height - hero.height
                }
                break
            case('a'):
                // move the hero left
                hero.x -= speed
                if (hero.x < 0) {
                    hero.x = 0
                }
                break
            case('d'):
                // move the hero right
                hero.x += speed
                if (hero.x + hero.width > canvas.width) {
                    hero.x = canvas.width - hero.width
                }
                break
            case(' '):
                bullets.push(new Crawler(hero.x + hero.width, hero.y, 10, 10, 'black'))
                break
        }
    }   
}

document.addEventListener('keydown', movementHandler)

// define a collision detection algorithm
function detectHit(objectOne, objectTwo) {
    // AABB -- axis aligned bounding box collision detection
    // check for intersection on each side, one by one
    const left = objectOne.x + objectOne.width >= objectTwo.x
    // console.log(objectTwoLeft)
    const right = objectOne.x <= objectTwo.x + objectTwo.width
    // console.log(objectTwoLeft, objectTwoRight)
    const top = objectOne.y + objectOne.height >= objectTwo.y
    const bottom = objectOne.y <= objectTwo.y + objectTwo.height
    // console.log(ogreLeft, ogreRight, ogreTop, ogreBottom)
    if (left && right && top && bottom) {
        return true
    } else {
        return false
    }


}

function endGame() {
    // when a collision occurs, stop the game
    // die shrek
    ogre.alive = false
    statusDisplay.innerText = 'You Killed Shrek! Who is the monster now? The Hero, or the Ogre?'
    clearInterval(ogreShootInterval)
}

// define gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60)

function gameLoop() {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // do the buisiness logic of our game (check for collisions)
    // check for collision between defenseless ogre and the hero
    if (detectHit(hero, ogre)) {
        endGame()
    }
    // render all of the game pieces
    if (hero.alive) {
        hero.render()
    }
    // only render the ogre when they are alive
    if (ogre.alive) {
        ogre.render()
    }
    // loop over all the bullets and render them
    for (let i = 0; i < bullets.length; i++) {
        // update the bullets
        bullets[i].x += 30
        // render the bullets
        bullets[i].render()
        if (detectHit(bullets[i], ogre)) {
            endGame()
        }
    }
    // loop over the ogre's bullets
    for (let i = 0; i < shrekBullets.length; i++) {
        // move the bullet
        shrekBullets[i].x -= 30
        // update the bullet
        shrekBullets[i].render()
        if (detectHit(shrekBullets[i], hero)) {
            hero.alive = false
            statusDisplay.innerText = 'Oh No! Our hero has perished due to the ogre\'s bullet'
        }
    }

}
