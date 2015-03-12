## Intermediate SVG

### Intro

After reading the [beginner article](svg-for-beginners.html) in this series, you're now armed with a basic working knowledge of SVG and you can draw some basic shapes to the viewport...I know, still not too exciting! But that rudimentary understanding is going to help you as you transition in to one of the cooler areas of using SVG you're probably anxious to tackle-animation.

Since our SVG Playground utilizes [Snap.svg](http://snapsvg.io/), it's time for us to go over how that works, and how to animate SVG via Snap.svg. This library–which simplifies interacting with SVGs somewhat verbose DOM based API–is great for exploiting SVG's dynamic nature via a convenient JavaScript interface. If you'd prefer to start off looking directly at the lower level API, I'd recommend having a look at [Jakob Jenkov's SVG Scripting page](http://tutorials.jenkov.com/svg/scripting.html), or grabbing the [SVG Essentials 2nd Edition](http://shop.oreilly.com/product/0636920032335.do) book which has an entire chapters devoted to this topic (this is a super useful SVG reference to have handy, and I'm absolutely NOT an affiliate at this time…just a fan of the book!)

Specifically, this article will tease apart getting Snap.svg set up and initialized, pulling in your SVG data via Snap's `load` method, using its `select` method to get your SVG container element referenced, and finally how to then inject your SVG back in to the DOM and transform it over time…animation. Excited yet!?


### Basic Snap SVG

There are a few main ways I generally will use Snap.svg:
1. Draw SVGs from scratch ex. draw a circle or rectangle
1. Load an external SVG, and then inject that in to an &ldquo;SVG shell&rdquo; created using Snap
1. Use Snap to `select` an inline SVG that's already on the page, and then work with that directly

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

*Note that I'm using `body` here because this was done on Codepen, but I'd usually create some sort of `svg-wrap` and set things up a bit differently in a &ldquo;real&rdquo; page layout. However, getting in to the details of that would take us in to RWD when using SVG, and I'm going to save that for another article. Ok, back to Snap…*

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

Snap uses the concept of a *surface* to draw the SVG to, and this code does just that, but, since we've already defined our SVG root element `#svg`, we go ahead and point Snap to that. There's a complete different technique which involves creating the SVG completely from scratch and then injecting in to a container DOM element, but that's described in Snap's [API Docs](http://snapsvg.io/docs/), and we'll just go with the convenience of using an SVG shell here.

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

Finally, this last chunk of code, simply uses the `.attr` method to alter the fill and stroke of the circle (the default is black). Pretty straight-forward stuff, and I'm sure you're, not yet, excited. So let's get right in to some simple animating!

## Animating Inline SVGs With Snap

So we've done the obligatory shape drawing with Snap.svg. But what you're likely really interested in is animating with it...no!?

For that, we'll be using the last technique from the list above, (we'll use an inline SVG already placed on the page), as it's a bit more exciting then drawing simple shapes, but it's also a bit simpler for an up &amp; running article than loading an external file. *Do see the [SVG Playgournd Demo](demo/svg.html) for an example of loading external files. Once you've went through this tut, how that whole demo is working should be much easier to &ldquo;grok&rdquo;*.


Here's our super simple animation:

<p data-height="268" data-theme-id="0" data-slug-hash="KwGvjj" data-default-tab="result" data-user="roblevin" class='codepen'>See the Pen <a href='http://codepen.io/roblevin/pen/KwGvjj/'>Simple Snap.svg Example</a> by Rob Levin (<a href='http://codepen.io/roblevin'>@roblevin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js">
</script>

Animating with Snap

  SETUP

  TRANSFORMS

example

Conclusions