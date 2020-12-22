// Establish Dom References
// Explicitly defining for my own sanity
let movementDisplay = document.getElementById('movement')
let game = document.getElementById('game')
let statusDisplay = document.getElementById('status')

// Getting context for drawing on canvas
let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

// Ogre
let ogre = {
  x: 400,
  y: 150,
  color: '#bada55', 
  width: 60,
  height: 120,
  alive: true,
  render: function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

game.addEventListener('click', (e) => {
  // clear whole board
  ctx.clearRect(0, 0, game.width, game.height)
  // change ogre position
  ogre.x = e.offsetX
  ogre.y = e.offsetY
  // draw ya boi
  ogre.render()
}, { option: true })