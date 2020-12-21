// references to DOM Elements I will use.
// Hot off the press, new way of doing things (let movementDisplay = movement;)
let movementDisplay = document.getElementById('movement')
let game = document.getElementById('game')

game.setAttribute('width', '800px')
game.height = 400;

// Get some Context
let ctx = game.getContext('2d')

// draw a filled box
let drawBox = (x, y, size, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

// create some characters
let ogre = {
  x: 10,
  y: 10,
  color: '#bada55',
  width: 40,
  height: 80,
  alive: true,
  render: function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height )
  }
}

let hero = {
  x: 50,
  y: 50,
  color: 'hotpink',
  width: 60,
  height: 60,
  alive: true,
  render: function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height )
  }
}

ogre.x = 100
ogre.render()