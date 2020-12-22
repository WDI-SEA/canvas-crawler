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
// determines the fill color
ctx.fillStyle = 'white'
ctx.fillRect(10, 10, 100, 100)

// Draw a line box
// Establishing line looks
ctx.strokeStyle = 'red'
ctx.lineWidth = 10;
ctx.strokeRect(10, 10, 100, 100)