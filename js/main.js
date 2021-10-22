// we're making a dungeon crawler game
// the point of the game is for player to kill shrek
// we will have two elements on our canvas, a player, and an ogre
// the player can move around the canvas
// once the player hits the ogre, the ogre dies, and the game ends

// we need to get our canvas, save it to a variable, so we can access it(and utilize it)
const game = document.getElementById('canvas')
// another thing we'll do here, is get the movement tracker
const moveDisplay = document.getElementById('movement')

// we're setting up height and width variables BASED ON computed style
// that means we're using setAttribute in conjunction with getComputedStyle
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
// check out the varying attributes width and height!
// console.log('current game width', game.width)
// console.log('current game height', game.height)

// now we need to get the game's context so we can add to it, draw on it, create animations etc
// we do this with the built in canvas method, getContext
const ctx = game.getContext('2d')

// we're going to follow some sorta basic Object Oriented Programming 'rules' to build an interactive game
// we'll create objects for our player and our ogre
// we'll give them their own 'draw' methods to place them on the canvas

// in javascript, there are two ways to create classes, which build objects.
// the first 'older' method, would be using a class
class OgreCrawler {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class HeroCrawler {
	constructor(x, y, color, width, height) {
		this.x = x
		this.y = y
		this.color = color
		this.width = width
		this.height = height
		this.alive = true
        this.direction = {
            up: false,
            down: false,
            right: false,
            left: false
        }
	}
    setDirection(key) {
        // console.log('the key pressed', key)
        // pressing key moves the character in direction
        if (key.toLowerCase() == 'w') this.direction.up = true
        if (key.toLowerCase() == 'a') this.direction.left = true
        if (key.toLowerCase() == 's') this.direction.down = true
        if (key.toLowerCase() == 'd') this.direction.right = true
    }
    // we also need to consider keyup events and 'unset' that direction
    unsetDirection(key) {
        if (key.toLowerCase() == 'w') this.direction.up = false
        if (key.toLowerCase() == 'a') this.direction.left = false
        if (key.toLowerCase() == 's') this.direction.down = false
        if (key.toLowerCase() == 'd') this.direction.right = false
    }
    movePlayer () {
        if (this.direction.up) this.y -= 10
            if (this.y <= 0) {
                this.y = 0
            }
        if (this.direction.left) this.x -= 10
            if (this.x <= 0) {
                this.x = 0
            }
            // move down
        if (this.direction.down) this.y += 10
            if (this.y + this.height >= game.height) {
                this.y = game.height - this.height
            }
            // move right
        if (this.direction.right) this.x += 10
            if (this.x + this.width >= game.width) {
                this.x = game.width - this.width
            }
    }
	render = function () {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

// or you can use a constructor function, with a slightly different syntax
// this is one way js handles OOP stuff
// function Crawler(x, y, color, width, height) {
//     this.x = x
//     this.y = y
//     this.color = color
//     this.width = width
//     this.height = height
//     this.alive = true
//     // then we declare the same type of render method
//     this.render = function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

const randomPlaceShrekX = (max) => {
    return Math.floor(Math.random() * max)
}

console.log('this is rando shrek x', randomPlaceShrekX(game.width))

let player = new HeroCrawler(10, 10, '#bada55', 16, 16)
let ogre = new OgreCrawler(randomPlaceShrekX(game.width), 50, 'lightgreen', 32, 48)
let ogreTwo = new OgreCrawler(randomPlaceShrekX(game.width), 45, 'red', 32, 48)
console.log('this is the player', player)
console.log('this is the ogre', ogre)

// Here we're going to set up our movement handler
// the movementhandler will be an event listener
// we'll use the WASD keys to move the player around the canvas
// we're going to use switch case here, but you can also use if...else, the two in this case are interchangeable
// the first way we're handling input, is going to be with keycodes
// const movementHandler = (e) => {
//     switch (e.keyCode) {
//         // first case, 87 which is the keycode for the W key
//         // this will move our player UP
//         case (87):
//             player.y -= 10
//             break
//         // keycode 65 for A key moves to the left
//         case (65):
//             player.x -= 10
//             break
//         // keycode 83 for S key moves player down
//         case (83):
//             player.y += 10
//             break
//         // keycode 68 for D key moves player right
//         case (68):
//             player.x += 10
//             break
//     }
// }

// the second way we can handle key events is with e.key
// if we want to restrict our player from leaving the canvas, we can include that logic in our move handler
// let movementHandler = (e) => {
//     switch(e.key.toLowerCase()) {
//         case ('w'):
//             // move up
//             player.y -= 10
//             if (player.y <= 0) {
//                 player.y = 0
//             }
//             break
//         case ('a'):
//             // moves left
//             player.x -= 10
//             if (player.x <= 0) {
//                 player.x = 0
//             }
//             break
//         case ('s'):
//             // move down
//             player.y += 10
//             if (player.y + player.height >= game.height) {
//                 player.y = game.height - player.height
//             }
//             break
//         case ('d'):
//             // move right
//             player.x += 10
//             if (player.x + player.width >= game.width) {
//                 player.x = game.width - player.width
//             }
//             break
//     }
// }

// make collision detection
// writing logic that determines if any part of our player square touches any part of our ogre
// update detect hit, to take a variable(parameter) to use it on multiple things
const detectHit = (thing) => {
    // if the player's x + width or y + height hits the ogre's x+width or y+height, kill shrek
    if (
        player.x < thing.x + thing.width &&
        player.x + player.width > thing.x &&
        player.y < thing.y + thing.height &&
        player.y + player.height > thing.y
    ) {
        // kill shrek
        thing.alive = false
        // end the game
        document.querySelector('#btm-right > h2').innerText = 'NICE!'
        // this is not quite where we want to stop our loop
        // stopGameLoop()
    }
}

// we're going to set up our game loop, to be used in our timing function
// set up gameLoop function, declaring what happens when our game is running
const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
  
    // display relevant game state(player movement) in our movement display
    moveDisplay.innerText = `X: ${player.x}\nY: ${player.y}`
    // check if the ogre is alive, if so, render the ogre
    if (ogre.alive) {
        ogre.render()
        // add in our detection to see if the hit has been made
        detectHit(ogre)
    } else if (ogreTwo.alive) {
        document.querySelector('#btm-right > h2').innerText = 'Now Kill Shrek 2!'
        ogreTwo.render()
        detectHit(ogreTwo)
    } else {
        stopGameLoop()
        document.querySelector('#btm-right > h2').innerText = 'You Win!'
    }
    // when ogre 1 dies, show ogre 2, run detect hit on ogre 2, but make the logic dependent on that ogre's alive
    // render our player
    player.render()
    player.movePlayer()
}

// we also need to declare a function that will stop our animation loop
let stopGameLoop = () => {clearInterval(gameInterval)}

// /using a different event handler for smooth movement
// we have two events now that we need to determine, we also will need to call player.move in the gameloop
document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
// this will unset direction
document.addEventListener('keyup', (e) => {
    if(['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})
// add event listener for player movement
// document.addEventListener('keydown', movementHandler)
// the timing function will determine how and when our game animates
let gameInterval = setInterval(gameLoop, 60)