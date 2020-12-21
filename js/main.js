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
let ogre = new Crawler(10, 10, '#bada55', 40, 80)

// move the hero
game.addEventListener('click', e => {
  // want to draw the hero at offsetX and offsetY
  ctx.clearRect(0, 0, game.width, game.height)
  hero.x = e.offsetX
  hero.y = e.offsetY
  hero.render()
})
