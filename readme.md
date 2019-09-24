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
* `<canvas id="game">`: This is the main piece of our game; it's where we will be rendering our game an what we will be updating.

## Additional Resources

* [Free Sprite images (Remember to credit your sources!)](https://opengameart.org/)

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.