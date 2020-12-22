// references to DOM Elements I will use.
// Hot off the press, new way of doing things (let movementDisplay = movement;)
let movementDisplay = document.getElementById('movement')
let game = document.getElementById('game')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// game.width = getComputedStyle(game)['width']
// game.height = getComputedStyle(game)['height']

// Get some Context
let ctx = game.getContext('2d')

// Constructor function (JS version of OOP)
// This is a blueprint for a Crawler
function Crawler(x, y, color, width, height) {
  this.x = x
  this.y = y
  this.color = color
  this.width = width
  this.height = height
  this.alive = true
  this.render = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// individual crawler
let hero = new Crawler(20, 20, 'hotpink', 20, 20)
let ogre = new Crawler(400, 150, '#bada55', 60, 120)

let gameLoop = () => {
  // clear the canvas
  ctx.clearRect(0, 0, game.width, game.height)
  // Display relevant Game State Info (display the x, y coordinates of our hero)
  movementDisplay.innerText = `X: ${hero.x}\nY: ${hero.y}`
  // check if the ogre is alive
  if (ogre.alive) {
    // render Ogre
    ogre.render()
    // check for collision
    // TODO: Write detectHit()
  }
  // render hero
  hero.render()
}

let movementHandler = e => {
  switch(e.key) {
    case 'w':
      // move up
      hero.y -= 10
      break
    case 'a':
      // move left
      hero.x -= 10
      break
    case 's':
      // move down
      hero.y += 10
      break
    case 'd':
      // move right
      hero.x += 10
  }
}

document.addEventListener('keypress', movementHandler)

let gameInterval = setInterval(gameLoop, 30);

