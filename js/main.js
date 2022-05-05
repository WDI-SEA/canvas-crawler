/* DOM SELECTORS */
// canvas element
const canvas = document.querySelector('#canvas')
// HUD for the player
const movementDisplay = document.querySelector('#movement')

/* CANVAS SETUP / GAME STATE */
// set the rendering context of the canvas
const ctx = canvas.getContext('2d')

// set the canvas width and height to be the same as the page's
// hardcode it in pixel values OR do this:
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

// gameloop interval
const gameLoopInterval = setInterval(gameLoop, 60) // every 60ms update the game logic and render

// just tinkering with canvas for the first time

// set rendering props
// this works with rgb, rgba, color hexes, named colors
// ctx.fillStyle = 'green' // set color prop to green
// // invoke rending methods
// // ctx.fillRect(x, y, width, height)
// ctx.fillRect(20, 20, 40, 40)

// // set props
// ctx.strokeStyle = "pink"
// ctx.lineWidth = 7 // 7px
// // invoke render methods
// ctx.strokeRect(200, 200, 50, 80)

// console.log(ctx)

/* CLASSES */

class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
  }

  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// // tester crawler

// // render yourself
// myCrawler.render()

// GAME OBJECTS

// hero of our game
const hero = new Crawler(5, 5, 'hotpink', 30, 30)
// monster of our game
// random ogre spawning
const randX = Math.floor(Math.random() * canvas.width)
const randY = Math.floor(Math.random() * canvas.height)
const ogre = new Crawler(randX, randY, 'green', 75, 105)

/* GAME FUNCTIONS */

function drawBox(x, y, w, h, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}

// handles keyboard input
function movementHandler(e) {
  // console.log(e.key)
  const speed = 10
  switch(e.key) {
    // case('ArrowUp'):
    case('w'):
      hero.y = hero.y - speed
      break
    case('s'):
      hero.y = hero.y + speed
      break
    case('a'):
      hero.x = hero.x - speed
      break
    case('d'):
      hero.x = hero.x + speed
      break
  }
  movementDisplay.innerText = `x: ${hero.x} y: ${hero.y}`
}

function detectHit() {
  // Axis Aligned Bounding box collision detection algorithm
  // AABB collision detection
  // const ogreLeft = hero.x + hero.width >= ogre.x
  // // console.log('ogreLeft:', ogreLeft)
  // const ogreRight = hero.x <= ogre.x + ogre.width
  // // console.log('ogreRight:', ogreRight)
  
  // const ogreTop = hero.y + hero.height >= ogre.y
  // // console.log('ogreTop:', ogreTop)

  // const ogreBottom = hero.y <= ogre.y + ogre.height
  // console.log(ogreBottom)

  if (
    // left
    hero.x + hero.width >= ogre.x &&
    // right
    hero.x <= ogre.x + ogre.width &&
    // top
    hero.y + hero.height >= ogre.y &&
    // bottom
    hero.y <= ogre.y + ogre.height
  ) {
    // we know a hit happened
    // console.log('hit')
    //die shrek!
    ogre.alive = false
    movementDisplay.innerText = `you killed shrek! Who is the monster now? `
    // stop gameplay
    clearInterval(gameLoopInterval)
  }
}

// all of the main game logic is executed every frame
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // do all the game logic
  detectHit()
  // render the game objects
  if (ogre.alive) {
    ogre.render()
  }
  hero.render()
}

/* EVENT LISTENERS */
// draw a box whenever you click on the canvas
canvas.addEventListener('click', e => {
  console.log(`x: ${e.offsetX} y: ${e.offsetY}`)
  // const red = Math.floor(Math.random() * 256)
  // const blue = Math.floor(Math.random() * 256)
  // const green = Math.floor(Math.random() * 256)
  // const rgb = `rgba(${red},${green},${blue},${Math.random()})`
  // drawBox(e.offsetX, e.offsetY, 30, 30, rgb)
})

document.addEventListener('keydown', movementHandler)