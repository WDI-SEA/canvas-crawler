// Establish Dom References
// Explicitly defining for my own sanity
let movementDisplay = document.getElementById('movement')
let game = document.getElementById('game')
let statusDisplay = document.getElementById('status')

// Getting context for drawing on canvas
let ctx = game.getContext('2d')
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

// Draw a filled box
let drawBox = (x, y, size, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

game.addEventListener('click', (e) => {
  drawBox(e.offsetX, e.offsetY, 100, 'hotpink')
})