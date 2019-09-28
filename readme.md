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
* Be able to move the Hero using key bindings (either WASD or the arrow keys)
* Detect a collision between the hero and the ogre
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

### Let's start drawing!

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

#### Time to modularize!

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

<details><summary>Stuck?</summary>
<p>

```javascript
game.addEventListener("click", function(e) {
  drawBox(e.offsetX, e.offsetY, 50, 'green');
});
```

</p>
</details>

### Time to Make Some Characters!

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
    ctx.fillRect(this.x, this.y, this.height, this.width)
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
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}
```

That can get a bit mouthy so we're going to create a `Crawler` object constructor which will have everything we need to render our Ogre and Hero and can be called using javascript's `new`. If we wanted to make more than one enemy, having this `Crawler` will make our code MUCH cleaner.

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
    ctx.fillRect(this.x, this.y, this.height, this.width)
  }
}
```

To create a new `Crawler`, simply type 
```javascript
var hero = new Crawler(200, 200, '#blue', 40, 40)
```

Create your `Crawler` constructor object and make a new crawler called `hero`. _(You can copy the two code examples above)_ 

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

### Hloopsh!

Click events are nice, but it's not how we want to move our hero by keypress. We'll use "w", "a", "s", and "d". While we could keep the `render()` functionality in the actual click event, we want to eventually have things moving even if we don't press any keys. We can achieve this through a game loop (a rendering function called at a certain interval). By rendering everything on a loop, we are freed up to use our event listeners to affect the x and y coordinates of our hero rather than waiting for a click event. It also means that we can clear the board on every loop giving us that smooth gameplay.

#### What do we want to do 

## Additional Resources

* [Free Sprite images (Remember to credit your sources!)](https://opengameart.org/)

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.