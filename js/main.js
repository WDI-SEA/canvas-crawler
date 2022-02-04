/* DOM SELECTORS -- EVENT LISTENERS */
const canvas = document.querySelector('#canvas')
const pressedKeys = { }
document.addEventListener('keydown', e => pressedKeys[e.key] = true)
document.addEventListener('keyup', e => pressedKeys[e.key] = false) // strech goals might be useful
const movementDisplay = document.querySelector('#movement')

/* GAME STATE/CANVAS RENDERING STUFF */
// setup the renderer
const ctx = canvas.getContext('2d')
// set canvas size to be the same as window
// after the window computes -- set canvas to be actual size of space it takes up
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])
// setup the gameloop
let gameLoopInterval = setInterval(gameLoop, 60) // game logic + rendering tied to speed loop runs  


// console.log(ctx)

/* GAME FUNCTIONS */
// console.log(canvas)

// set the color property of the context
// ctx.fillStyle = 'red' // any valid css color will 
// // set line width

// // use a context rending method
// // (x position, y position, width, height)
// ctx.fillRect(10, 10, 100, 100)

// ctx.lineWidth = 30 // always in pixels
// ctx.strokeStyle = 'green'
// // (x position, y position, width, height)
// ctx.strokeRect(300, 300, 100, 100)

// // encapsulate square drawing into a function
function drawBox(x, y, width, height, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

// drawBox(150, 150, 30, 30, 'purple')
// drawBox(200, 150, 45, 60, '#FFFFFF') //white hex

// data and functions to update the game element
// encapslate methods and data that the mothods use together -- OOP ENCAPSULATION
// const hero = { 
//   x: 10,
//   y: 10,
//   width: 20,
//   height: 20,
//   color: 'hotpink',
//   render: () => {
//     ctx.fillStyle = hero.color
//     ctx.fillRect(hero.x, hero.y, hero.width, hero.height)
//   }
// }

// const ogre = { 
//   x: 250,
//   y: 250,
//   width: 40,
//   height: 50,
//   color: 'green',
//   render: () => {
//     ctx.fillStyle = ogre.color
//     ctx.fillRect(ogre.x, ogre.y, ogre.width, ogre.height)
//   }
// }

// use the Crawler class to make canvas crawlers -- heros or ogres
// ABSTRACTION -- making a object facotry
class Crawler {
  constructor(x, y, width, height, color) {
    // define all the props
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.alive = true
  }

  render() {
    // end the game
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// instantiate an ogre and a hero
const hero = new Crawler(10, 10, 20, 20, 'hotpink')
const ogre = new Crawler(250, 250, 40, 50, 'green')

function movementHandler() {
  // console.log(e)
  const speed = 5
  console.log(pressedKeys)
//   // movementDisplay.innerText = 'X:' + hero.x + ' ' + 'Y:' + hero.y 
  if (ogre.alive) movementDisplay.innerText = `X:${hero.x} Y:${hero.y}` 
//   // conditional logic based on what key was pressed
  if (pressedKeys.a || pressedKeys.ArrowLeft) hero.x -= speed
  if (pressedKeys.d || pressedKeys.ArrowRight) hero.x += speed
  if (pressedKeys.s || pressedKeys.ArrowDown) hero.y += speed
  if (pressedKeys.w || pressedKeys.ArrowUp) hero.y -= speed
}

function detectHit() {
  // four conditional checks one for every side of both boxes
  // left side ogre right side hore
  // hero right side ogre left side
  // const ogreLeft = hero.x + hero.width >= ogre.x
  // // console.log(ogreLeft)
  // // ogre right hero left
  // const ogreRight =  hero.x <= ogre.x + ogre.width
  // // console.log(ogreRight && ogreLeft)
  // // ogre top hero bottom
  // const ogreTop = hero.y + hero.height >= ogre.y 
  // // hero top ogre bottom
  // const ogreBottom = hero.y <= ogre.y + ogre.height

  // console.log(ogreLeft && ogreRight && ogreBottom && ogreTop)
  if(
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y + hero.height >= ogre.y &&
    hero.y <= ogre.y + ogre.height
  ) {
    // hero has gotten the ogre
    // ogre.color = 'red'
    movementDisplay.innerText = "YOU KILLED SHREK!"
    ogre.alive = false
    clearInterval(gameLoopInterval)
 
  }
}

function gameLoop() {
  // clear the canvas and then render
  // clear the entire canvs from tp left to bottom right
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // update the objects before we render
  movementHandler()
  // render all gameplay elements (hero and ogre)
  hero.render()
  if (ogre.alive) {
    ogre.render()
  }
  // gameplay logic -- win conditions ???
  // collision detections ever game render
  detectHit()
}