var game = document.getElementById('game')
var position = document.getElementById('movement')
var ctx = game.getContext('2d')

var player;
var ogre;

function Crawler(x, y, color, height, width) {
  this.x = x
  this.y = y
  this.color = color
  this.height = height
  this.width = width
  this.alive = true
  this.render = function() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}

document.addEventListener('DOMContentLoaded', function() {
  player = new Crawler(10, 10, 'blue', 16, 16)
  ogre = new Crawler(200, 50, 'lightgreen', 32, 48)

  document.addEventListener('keydown', movementHandler)

  setInterval(gameLoop, 60)
})

function gameLoop() {
  if (ogre.alive) {
    detectHit()
  }
  ctx.clearRect(0, 0, game.width, game.height)
  position.textContent = player.x + " " + player.y
  player.render()
  if (ogre.alive) {
    ogre.render()
  }
}

function detectHit() {
  if (player.x < ogre.x + ogre.width
    && player.x + player.width > ogre.x
    && player.y < ogre.y + ogre.height
    && player.y + player.height > ogre.y) {
      ogre.alive = false
      // end game function
      document.getElementById('status').textContent = "You Win!"
    }
}

function movementHandler(e) {
  // w=> y-=1; a => x-=1; s=> y+=1; d => x+=1
  // w = 87, a=65, s=83, d=68
  switch (e.keyCode) {
    case (87):
      player.y -= 10
      break
    case (65):
      player.x -= 10
      break
    case (83):
      player.y += 10
      break
    case (68):
      player.x +=10
      break
  } 
}