## Intermediate SVG

### Intro

After reading the [beginner article](svg-for-beginners.html) in this series, you're now armed with a basic working knowledge of SVG and you can draw some basic shapes to the viewport...I know, still not too exciting! But that rudimentary understanding is going to help you as you transition in to one of the cooler areas of using SVG…animation.

Since our SVG Playground utilizes [Snap.svg](http://snapsvg.io/), it's time for us to go over how that works, and how to animate SVG via Snap.svg. This library–which simplifies interacting with SVGs somewhat verbose DOM based API–is great for exploiting SVG's dynamic nature via a convenient JavaScript interface. If you'd prefer to start off looking directly at the lower level API, I'd recommend having a look at [Jakob Jenkov's SVG Scripting page](http://tutorials.jenkov.com/svg/scripting.html), or grabbing the [SVG Essentials 2nd Edition](http://shop.oreilly.com/product/0636920032335.do) book which has an entire chapter devoted to this topic (this is a super useful SVG reference to have handy, and I'm absolutely NOT an affiliate at this time…just a fan of the book!)

### Basic Snap SVG

There are a few main ways I see most folks use Snap.svg:
1. Draw SVGs from scratch ex. draw a circle or rectangle
1. Load an external SVG, and then inject that in to an &ldquo;SVG shell&rdquo; created using Snap
1. Use Snap to `select` an inline SVG that's already on the page, and then work with that directly

Using Snap to draw SVGs is a great place to start out learning with, and we'll start there, but the more exciting stuff (to my mind) is when we start animating.

## Drawing with Snap

From our list above, this is the first way one will likely come to grips with using Snap.svg. You can click the big "Edit on Codepen" below to go straight to the code, but I'll explain things here first.

<p data-height="268" data-theme-id="0" data-slug-hash="OPBQmd" data-default-tab="result" data-user="roblevin" class='codepen'>See the Pen <a href='http://codepen.io/roblevin/pen/OPBQmd/'>Simple Snap.svg Drawing Example</a> by Rob Levin (<a href='http://codepen.io/roblevin'>@roblevin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

In the markup, simply create an SVG *root-element* like so:
```html
<svg id="svg" class="svg"></svg>
```
Now, set up the CSS so the SVG stays &ldquo;contained&rdquo; by the our `body` element:

```css
body {
  display: block;
  width: 200px;
  height: 200px;
  margin: 50px auto;
}

.svg {
  width: 100%;
  height: 100%;
}
```

*Note that I'm only using `body` in the CSS above, because this was done on a Codepen; I'd usually create some sort of `svg-wrap` in a &ldquo;real&rdquo; page's layout. But, getting in to those details would take us in to RWD when using SVG, and I'm going to save that for another article. Ok, back to Snap…*

With our CSS and SVG inlined, we're ready to make about the simplest Snap.svg code possible:

```javascript
var surface = Snap("#svg");
var circ = surface.circle(100, 100, 50);
circ.attr({
    fill: "#addedd",
    strokeWidth: 10,
    stroke: "#beeeef"
});
```


Taking that line by line:

```javascript
var surface = Snap("#svg");
```

Snap uses the concept of a *surface* to draw the SVG to, and this code does just that, but, since we've already defined our SVG root element `#svg`, we go ahead and point Snap to that. There's a complete different technique which involves creating the SVG completely from scratch and then injecting in to a container DOM element, but that's described in Snap's [API Docs](http://snapsvg.io/docs/), and we'll just go with the convenience of using the skeleton SVG we placed in the HTML document earlier.

```javascript
var circ = surface.circle(100, 100, 50);
```

Once you have a Snap.svg *surface*, you can use it to draw any of your SVG *basic shapes*, in this case, a circle. If you've went through the [first article](svg-for-beginners.html), you should be comfortable with the idea of creating shapes in &ldquo;raw SVG&rdquo;. Snap tries to keep it's interface reasonably close to that of SVGs, so, the `.circle` method, predictably, takes `x`, `y`, `r` arguments.

Let's add some color next…

```javascript
circ.attr({
    fill: "#addedd",
    strokeWidth: 10,
    stroke: "#beeeef"
});
```

Finally, this last chunk of code, simply uses the `.attr` method to alter the fill and stroke of the circle (the default is black). Pretty straight-forward stuff, and I'm sure you're not (yet) excited. So let's get right in to some simple animating!

## Animating Inline SVGs With Snap

So we've done the obligatory shape drawing with Snap.svg. But what you're likely really interested in is animating with it...no!?

For that, we'll be using the last technique from the list above, (we'll use an inline SVG already placed on the page), as it's a bit more exciting then drawing simple shapes, but it's also a bit simpler for an up &amp; running article than loading an external file. *The [SVG Playground Demo](demo/svg.html) uses the technique of loading external files. Once you've went through this tutorial, feel free to dig in to that demo–I think you'll find it's is working should be much easier to understand.

Here's our super simple animation:

<p data-height="268" data-theme-id="0" data-slug-hash="KwGvjj" data-default-tab="result" data-user="roblevin" class='codepen'>See the Pen <a href='http://codepen.io/roblevin/pen/KwGvjj/'>Simple Snap.svg Example</a> by Rob Levin (<a href='http://codepen.io/roblevin'>@roblevin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js">
</script>

*Note you may have to click the Rerun button on the lower right*

Before we look at the code, let's talk about the SVG. This time, we've inlined an SVG of the rocket ship which has IDs for:

* `#rocket-ship`–the whole SVG
* `#ship`–just the ship itself
* `#exhaust`–well, the exhaust

For brevity's sake, we'll remove some of the *path data* of the SVG itself and replace those sections with ellipses `...`. We're more concerned here with the structure, and how Snap.svg will hook in to this SVG. Here's the markup:

```html
<div class="container">
  <svg id="rocket-ship" ...>
    <g>
      <path id="exhaust" fill="#FFFFFF" d="..."/>
      <path id="ship" fill="#FFFFFF" d="..."/>
    </g>
  </svg>
</div>
```

Here's the JavaScript code that select the components of the space ship and delivers our animation:

```javascript
var rocketShip = Snap.select('#rocket-ship');
var exhaust = rocketShip.select('#exhaust');
var ship = rocketShip.select('#ship');
rocketShip.stop().animate({ opacity: .7}, 200, mina.easeout, function() {
  exhaust.stop().animate({opacity: 0, transform: 't-20,34 s4'}, 2500, mina.easeout);
  ship.stop().animate({transform: 't60,-100'}, 5000, mina.easeout);
});
```

Breaking that up we have:

```javascript
var rocketShip = Snap.select('#rocket-ship');
var exhaust = rocketShip.select('#exhaust');
var ship = rocketShip.select('#ship');
```

Here we're just grabbing references to the elements we're interested in; think of Snap's `select` as the analog to selecting elements with jQuery using CSS selector syntax.


```javascript
rocketShip.stop().animate({ opacity: .7}, 200, mina.easeout, function() {
```

This is where things get interesting. Above, we're taking our `rocketShip` reference and:
* Stopping any previously running animations via `.stop()`
* Chaining that to `.animate`–Snap's animatino &ldquo;work-horse&rdquo; animation method
* Passing in a JavaScript object literal indicating what we want `.animate` to do (in this case just lower the `opacity` a bit)
* Passing in `200` which is the duration of the animation
* Passing in `mina.easeout`–the easing function to use (we'll go over that in a bit; for now just think "it animates in a linear fashion, but the slows down at the end a bit")
* Finally, we have a callback function which, of course, will get called once the animation has complete

So, just to be crystal clear, once our first callback gets called, the opacity has essentialy dimmed the rocket ship a bit. Now we move on to the next *step* of our animation where we:

* create the effect of the exhaust sort of smoking out and then vanishing in air
* create the effect of, well, the ship blasting up and to the right (as rocket ships do no!?)

Let's go over the tech side of how that happens:
```javascript
  exhaust.stop().animate({opacity: 0, transform: 't-20,34 s4'}, 2500, mina.easeout);
  ship.stop().animate({transform: 't60,-100'}, 5000, mina.easeout);
```
These two lines are similar to the first one in many ways. We stop any animations, call `.animate`, pass the JavaScript literal with instructions for the animation transformations we require, the animation duration, easing function, but, wait…there's no callback! That's right folks, the callback function is entirely optional, and, since these last two animations complete our overal effect, we don't need a callback.

If not already self evident, the exhaust animation is animating the `opacity` down to `0` so it, eventually, completely fades away. The `t-20,34` piece is Snap.svg specific syntax for achieving a *translation* (wanna know a secret? A translation is just a big word for *move*!). The `-20,34` are, of course, x,y coordinates. Let's refresh your brain with the fact that SVG is &ldquo;top down&rdquo; coordinate system. So 0,0 would be the top left. So, `-20,34` is saying "move to the left 20 pixels, and move down 34 pixels".

Next, we have a space and then the `s4` which, essentially, says "scale me by 4". Bringing this back to the effect, we see that this makes our exhaust spread out, much like smoke from a fire that spreads and then vanishes in to thin air.

The ship animation uses similar syntax, this time moving from it's original location up and to the right. Again, think of `t60,-100` reading as: "move 60 pixels to the right, and also 100 pixels up". Purely from *fudging around* (that's a new SVG technical term for manually trying out different settings wink wink!), I've opted to make the ship take twice as long as the exhaust spread/dissipate effect. Honestly, with Snap.svg, I sometimes just have to try out different values until the effect looks the way I want.

That concludes the animation. I've left it a bit rough, but that shows off how easy it is to do simple icon animations with SVG. But we did gloss over *easing functions* a bit, so let's discuss those next.

### Easing Functions

First a disclaimer: we'll be purposely brief on easings since we're only using pre-baked Snap.svg easings like *easein*, *easeout*, etc. If you've used CSS3 animations and are familiar with the concept, feel free to skip this section. Alternatively, if you'd like to go a bit deeper, I highly recommend [Kirupa's article on CSS3 easing functions](http://www.kirupa.com/html5/easing_functions_css3.htm).

The boiler-plate easing (or timing) functions available can be generally described as:

* a **linear** easing will not speed up or slow down as the animation happens over time, but instead, the speed remains constant through the entire duration of the animation.
* an **ease-in** easing will start off slow slow, but then gradually speed up as the animation happens over time
* an **ease-out** easing will slow down at the end
* an **ease-in-out** easing will start slow, speed up, and then, again, slow down at the end
* a **cubic-bezier** easing allows you to control the speed in more interesting ways by allowing you to create the easing function with the help of [bezier curves](http://en.wikipedia.org/wiki/B%C3%A9zier_curve)

For most animations that just require a more natural, or authentic motion, `ease-out` is a [recommendation](http://www.google.com/design/spec/animation/authentic-motion.html#). Of course, sometimes you want your animation to have some &ldquo;bounce&rdquo; to it, so I guess which easing you use just depends on what exactly you're after &#9786;

Here's a slowed down and modified version of Bennett Feely's pen to include the common &ldquo;out-of-the-box&rdquo; easings, and one sort of pre-bounce custom easing I did using cubic-bezier. *Please note that this pen requires a CSS3 friendly browser.* Although it's infinitely animating all of the &ldquo;timeline lanes&rdquo;, go ahead and click an individual lane to just focus on that particular easing animation:

<p data-height="464" data-theme-id="0" data-slug-hash="OPBBzq" data-default-tab="result" data-user="roblevin" class='codepen'>See the Pen <a href='http://codepen.io/roblevin/pen/OPBBzq/'>Cubic Bezier examples</a> by Rob Levin (<a href='http://codepen.io/roblevin'>@roblevin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### Snap.svg Easings

Along with the common easings, Snap.svg library does provide some additionally [interesting easings](http://snapsvg.io/docs/#mina.linear) like `backin`, `backout`, and `bounce`, but I really missed the ease (no pun intended) at which I can use custom cubic-bezier values in CSS3 transitions. It appears possible if you can find or create a reliable cubic-bezier function, to take your value list and pre-setup a &ldquo;timing function callback&rdquo;, but it's a bit involved (maybe an idea for a plugin?). Here's a [StackOverflow post](http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg), that seems to cover this if you need it. But I sort of feel like this should be available from Snap.svg core. If I'm making a mistake or there's a better way to achieve this, please leave a comment.

### Summary

Now that we've went over the basics of animating with Snap.svg, and breezed through easing functions, I would recommend having a look at the [SVG Playground](demo/svg.html) demo I've put together, or grab the [code from github](https://github.com/unicorn-ui/demo-svg).

Have you already been working with Snap.svg and have something interesting to add to the conversation? Also, have you had a chance to compare it to Greensock's [gsap](http://greensock.com/gsap) libraries? If yes to either questions, do leave a comment.
