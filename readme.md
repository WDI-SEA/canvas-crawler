# Canvas Crawler

Let's learn a bit about HTML5's canvas by making a super basic dungeon crawler!

There's a bit of starter code, so you can jump right into it.

## Getting Started

The provided template contains all the files, images, and text content needed to create the page.

***IF YOU HAVE NODE INSTALLED ALREADY and would like to use browsersync***

* Run `npm install` to install dependencies
* Run `npm start` to start the BrowserSync server

***OTHERWISE***

Ignore that mumbo jumbo and just dive in! The only files you'll need to worry about are: `index.html`, `img` folder, `css` folder.

## Goals

* Use HTML5 Canvas to make an "ogre" (this can just be a box) and a "hero" (this can also just be a box)
* Be able to move the Hero using key bindings (either WASD or the arrow keys) and display current coordinates
* Detect a collision between the hero and the ogre
* When the hero collides with the ogre, remove the ogre from the screen
* Use a single external CSS stylesheet to style your game in the browser

## Instructions

### Look at what you have

Take a look at the code that exists in this repository. What is the css doing? How is it doing it? How would you change the coloring?
Look at the images in the `/img` folder. How could you use those to spruce up your game?
Check that everything is linked up in the `index.html`. Is there anything else in there that is non-standard?

### Get Started

Look at the `index.html` again. What elements will we need to access?
> HINT: Why do we use `id` in HTML over `class`?

In your `js/main.js` put a `console.log` and run your index.html in your browser to check that everything is linked up correctly. Once you've tested that, make a reference to a couple of things in the HTML that we'll need to access consistently.
* `<h2 id="movement">`: This will display the x and y coordinates of our hero so we can see what's going on.
```javascript
let movementDisplay = document.getElementById('movement')
```
* `<canvas id="game">`: This is the main piece of our game; it's where we will be rendering our game an what we will be updating.
```javascript
let game = document.getElementById('game')
```

### To give you some context...

In order to make the canvas do things, you have to give **context**. We do this by assigning getting the context from the canvas element and assigning it to a variable. The syntax is `canvasElement.getContext('2d')`. There is no 3d context yet, but what the 2d context does is return a bunch of neat functionality that we can do to our canvas.
> "`getContext('2d') returns an object that provides methods and properties for drawing and manipulating images and graphics on a canvas element in a document. A context object includes information about colors, line widths, fonts, and other graphic parameters that can be drawn on a canvas."

## Let's start drawing!

In order to test if our canvas is working, let's draw a rectangle. 
```javascript
// Set your Context!
var ctx = game.getContext('2d')

// Fill Color
ctx.fillStyle = 'white';
// Line Color
ctx.strokeStyle = 'red';
// Line width
ctx.lineWidth = 5;


ctx.fillRect(10, 10, 100, 100);
ctx.strokeRect(10, 10, 100, 100);
```
When you refresh your page you should see a rectangle. 
But WOAH! Why is the rectangle so big?! That's not 100px big! Canvas auto sets its dimensions to 180px by 300px unless otherwise specified. If the container that it is in is larger than that, it'll stretch like a small image forced into a larger space. So how do we fix this? We can either hard-code the width and height into the HTML or we can do it programatically. Either way, we want it reflected in the HTML, so **we can't just assign those variables in css and have it work the way we want**.

You'll notice the CSS dimensions for the game container are not in `px`, but our canvas is going to want to be. We can get around this discrepency by using `getComputedStyle(element)` which returns an object of all the potential styles and attributes of a specific element. We want to also use `element.setAttribute([attribute: string], [value: string])` to set the `height` and `width` attributes to the return value of `getComputedStyle`.

<details><summary>Stuck?</summary>
<p>

```javascript
game.setAttribute("height", getComputedStyle(game)["height"])
game.setAttribute("width", getComputedStyle(game)["width"])
```

</p>
</details>

### Time to modularize!

To make our code more readable and more reuseable, we're going to put the rectangle drawing into a function. We could put ALL the mutable variables into our parameters, but for right now, we'll just pass in the `x` and `y` coordinates.

Our function is going to draw a green box on the screen. We're going to pass in the `x`, `y`, `size`, and `color` of the box. _(Because it is a box, the width and height will be the same value)_

```javascript
function drawBox(x, y, size, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}
```

This will make a box at the size, color, and location of our choosing! This is particularly useful if drawing more complex shapes where the drawing starts to get verbose.

Add an event listener to the game that, on click, draws a green box at the offsetX and offsetY of the click. 

<details><summary>Check your work</summary>
<p>

```javascript
game.addEventListener("click", function(e) {
  drawBox(e.offsetX, e.offsetY, 50, 'green');
});
```

</p>
</details>

### Make Some Characters!

It's time to make our game! So our goal is to have an Ogre (which will be stationary) and our Hero (who will take user input to move). They're both going to be boxes with similar functionality and attributes. 

We want to have an Ogre object and a Hero object. They should look like this:
```javascript
var ogre = {
  x = 10,
  y = 10,
  color = "#BADA55",
  width = 40,
  height = 80,
  alive = true
  render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

var hero = {
  x = 0,
  y = 0,
  color = "hotpink",
  width = 20,
  height = 20,
  alive = true
  render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
```

That can get a bit mouthy so we're going to create a `Crawler` object constructor which will have everything we need to render our Ogre and Hero. Read more about constructor funtions [at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor). 
We use this function by calling it using javascript's `new`. If we wanted to make more than one enemy, having this `Crawler` will make our code MUCH cleaner.

```javascript
function Crawler(x, y, color, width, height) {
  this.x = x
  this.y = y
  this.color = color
  this.width = width
  this.height = height
  this.alive = true
  this.render = function () {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
```

To create a new `Crawler`, simply type something like:
```javascript
var rando = new Crawler(5, 5, '#blue', 40, 140)
```

Now that you know what we're doing to DRY up our code, create your `Crawler` constructor object and make two new crawlers called `hero` and `ogre`. They should have the same parameters as the `hero` and `ogre` objects above. Make sure to delete the old `hero` and `ogre` objects so you aren't doubling up.

In your event listener, clear out the `drawBox()` and add `hero.render()`. Now, on click, you should see your blue hero box! 

Since `hero` is an object, it has variables that we can set. At the top of your event listener, set `hero.x` to be the offsetX of the click and the `hero.y` to be the offsetY of the click. Under those assignments should be where you call `hero.render()`. Now, wherever you click, your hero should appear!

As you can see, every time we click, a hero is drawn on the canvas, but the other images stay as well. If we want to have only on hero per click, we need to clear the canvas board before we render the hero. We do this by clearing out everything that was created in a certain rectagular area. We use the function `clearRect` provided by the canvas context. It takes four parameters: `x`, `y`, `width`, and `height`. Add in the `clearRect` at the top of your click event and put in variables that will clear the entire game board.

<details><summary>Stuck?</summary>
<p>

```javascript
game.addEventListener("click", function(e) {
  ctx.clearRect(0, 0, game.width, game.height)
  hero.x = e.offsetX
  hero.y = e.offsetY
  hero.render()
});
```

</p>
</details>

## Hloopsh!

Click events are nice, but it's not how we want to move our hero by keypress. We'll use "w", "a", "s", and "d". While we could keep the `render()` functionality in the actual click event, we want to eventually have things moving even if we don't press any keys. We can achieve this through a game loop (a rendering function called at a certain interval). By rendering everything on a loop, we are freed up to use our event listeners to affect the x and y coordinates of our hero rather than waiting for a click event. It also means that we can clear the board on every loop giving us that smooth gameplay.

Before we start writing, we need to clean some things up. 
* Delete your event listener that drew the hero on click.
* Write an event listener for `DOMContentLoaded` 
* Declare `hero` and `ogre` with no value at the top of your page, by your context declartion. Then, within `DOMContentLoaded`, assign `hero` and `ogre` to be new crawlers

<details><summary>Confused?</summary>

```javascript
var ctx = game.getContext('2d')
var hero;
var ogre;

function Crawler(x, y, color, height, width) {
  ...
}

document.addEventListener('DOMContentLoaded', function() {
  hero = new Crawler(100, 200, 'hotpink', 40, 40);
  ogre = new Crawler(500, 150, '#BADA55', 100, 150);
})
```
</details>


#### The function

When thinking about what should go into the gameLoop function, we need to think about what needs to happen at every frame. Thinking about this will help us Pseudocode out our `gameLoop` function and increase efficiency when we write.
1. Clear the canvas
2. Display the X and Y coordinates of our hero
3. Check if the ogre is alive.
    3a. render ogre
    3b. check for collision
4. Render the hero

(1) We want to clear the canvas first, since we don't want the ghost of hero locations past to muddle up our dungeon. 
(2) The next thing we want to do is display any game state info (in our case, the x, y coordinates of our hero)
(3) There needs to be some conditional in regards to the ogre. We don't want to render the ogre if it's dead, so check if the ogre is alive.
(3a) If the ogre is alive, we want to show it!
(3b) If the ogre is alive, we need to check if the hero has collided with it. What happens if that is true is the juristiction of our `detectHit` functionality. 
We have the ability to do all of those things except check for collision right now, so let's write the function and leave a TODO comment in place of the collision detection. Try it yourself!
(4) The only thing missing is our protagonist!

Now that we know what we want to do, write a function `gameLoop`, put your pseudocode in as comments, and write the functionality.
> We don't have a `detectHit` function yet, so just leave the comment and write `TODO` before it so we know to get to it.

<details><summary>Check your work</summary>
<p>

```javascript
function gameLoop() {
    // Clear the Cavas
    ctx.clearRect(0, 0, game.width, game.height)
    //Display the X and Y coordinates of our hero
    movementDisplay.textContent = `X: ${hero.x} Y: ${hero.y}`
    // Check of the ogre is alive
    if (ogre.alive) {
        ogre.render()
        // TODO: detectHit
    }
    hero.render()
}
```
</p>
</details>

#### Set the Interval

The interval that we set our loop to will depend on how many frames we want per second. We want to strike a balance between optimisation _(every milisecond is unnecessarily taxing, especially as our game logic gets bigger)_ and how quickly a human can perceive changes _(a one second refresh rate is very noticable)_. We're going to put our interval every 60 miliseconds which is about 16 frames per second.

In your `DOMContentLoaded` event listener, set `gameLoop()` to run every 60 miliseconds. 
> Make sure to set it to a variable (I used `runGame`) so we can clear it later.

<details><summary>Check your work</summary>
<p>

```javascript
document.addEventListener('DOMContentLoaded', function() {
  hero = new Crawler(100, 200, 'hotpink', 40, 40);
  ogre = new Crawler(500, 150, '#BADA55', 100, 150);
  
  var runGame = setInterval(gameLoop, 60);
})

```
</p>
</details>

>
Right now, when we load the page, nothing is happening, so put a `console.log()` at the beginning of your `gameLoop` function to make sure it's working. You should see your console lighting up. Once you've confirmed it's working, delete it and move onto the movement.

## Moving and Shakin'
As exciting as stationary pictures and console logs are, we want our hero to **move**. Since we want the movement to be driven by user input, we'll want to put the movement on an event listener rather than in the loop function.
> If you wanted passive movement, you would write a function and call it in the `gameLoop`

While we could put the movement functionality in an anonymous function on the event listener, we want to keep our code DRY and easy to understand. So we're going to do the same thing we did with our `gameLoop` and write a function `movementHandler` that will be called by our `eventListener`.

### Where are we going?

Computers are dumb, so when we think about how to tell it to do something, we start problem-solving with pseudocode and a clear idea of our goal. Our goal is to have movement based on a keypress which informs our pseudocode. "When I press the a certain key, my hero should move in the corrosponding direction" is a good start, but we need to modularise it more, dumb it down in more computer speech. "If I press 'w', the hero should move up, if I press the 'd', my hero should move right..." is much better. Since all our directions follow the same structure, we'll solve for one direction and then repeat the process. Let's focus on moving up.

We know we're going to be putting our `movementHandler` function onto an event listener, which means we'll be passed an`event`. This event has lots of information. Earlier we were looking for the x, y of the mouse, now we are looking for the key. Use [this website](https://keycode.info/) to easily identify which key we'll be looking for. Then we put that in our conditional. In our case, the keyCode for the 'w' is 87.

```javascript
function movementHandler(e) {
  // If I press the up arrow...
  if (e.keyCode === 87) {
    // ...my hero should move up
  }
}
```

The next thing to identify is "How do I tell a computer to 'move up' the hero?" If we want to move the location of our hero "up", we decrease the y coordinates of the hero. 

```javascript
function movementHandler(e) {
  // If I press the up arrow...
  if (e.keyCode === 87) {
    // ...my hero should move up
    hero.y += 1
  }
}
```
Great! Now we can write the conditionals for all the other keys and their corrosponding directions. Since our if statements are checking the same thing (e.keyCode), a switch statement is the best, and DRYest conditional to use.

Take some time to write the rest of the movement handler. If you need, write a comment at the top that has all your directions with their corrosponding keycodes and coordinate changes.

<details><summary>Check your work</summary>

```javascript
function movementHandler(e) {
  // up (w:87): y-=1; left (a:65): x-=1; down (s:83): y+=1; right (d:68): x+=1
  switch (e.keyCode) {
    case (87):
      hero.y -= 10
      break
    case (65):
      hero.x -= 10
      break
    case (83):
      hero.y += 10
      break
    case (68):
      hero.x +=10
  } 
}
```
</details>

### In Motion

Now that we have our movement handler function, we simply have to make the computer listen for it. Add an event lister before you set your `gameLoop` interval; run the `movementHandler` function on `keydown` events.

<details>
<summary>Check your work</summary>

```javascript
document.addEventListener('DOMContentLoaded', function() {
  
  hero = new Crawler(100, 200, 'hotpink', 40, 40)
  ogre = new Crawler(500, 150, '#BADA55', 100, 150)

  document.addEventListener('keydown', movementHandler);

  var runGame = setInterval(gameLoop, 60)
})
```

</details>

## When Worlds Collide

Collision detection can get pretty complicated. Since we're using boxes, it is much more manageable. As humans, we use our eyes a lot, so we can see collision, the key is translating it to something a computer can understand. Computers function on numbers, so we need to translate our problem into numbers. Thankfully, we have a graph to solve our problem. 

### What is a box compared to rocks and mountains?

When we make our Crawler boxes, we assign a couple of key values, namely `x`, `y`, `width`, and `height`, all represented by a numeric value. I'm sure you've all gathered that the canvas is just a defined graph, with `x=0` and `y=0` as the top left corner. That's why, when we want our Crawler to move up, we decrease the value of y, because it brings the Crawler closer to that top corner.

![](https://i.imgur.com/3UH5tv8.png)

A box is merely the area between four points which is defined on the graph by the initial x, y coordinates, and an amount to be added to the x axis (width) and the y axis (height). As far as HTML5 canvas is concerned, a box is any point that falls between `x, y`, `x + width, y`, `x, y + height`, and `x + width, y + height`.

![](https://i.imgur.com/57nAl6U.png)

When talking collision, we want to test against the larger box. We have 4 points we want to check against _(ordered visually)_
1. The left-most x value of the ogre —`ogre.x`
2. The right-most x value of the ogre —`ogre.x+width`
3. The top-most y value of the ogre —`ogre.y`
4. The bottom-most y value of the ogre —`ogre.y+height`


## BONUSES

* **Put some bounding on movement.** How would you prevent our daring hero from simply running off the map?
* **Make the ogre move.** Hitting a static box is fun and all, but movement adds another level! Should the ogre be pacing or moving randomly?
* **Make the ogre and hero spawn in random locations to start.** How do you make sure that they don't accidentally spawn on top of each other? That they don't spawn off the board or, more likely, half off the board?
* **Make it pretty!** There are some art assets in the `img` folder, put them to use or get some free sprites and make your hero and ogre look like more than boxes.
* **Make a reset button that restarts the game.** Replayability is the name of the game, keep 'em coming back for more!


## Additional Resources

* [Free Sprite images (Remember to credit your sources!)](https://opengameart.org/)

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.