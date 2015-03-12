## Intermediate SVG

### Intro

After reading the [beginner article](svg-for-beginners.html) in this series, you're now armed with a basic working knowledge of SVG and you can draw some basic shapes to the viewport...I know, still not too exciting! But that rudimentary understanding is going to help you as you transition in to one of the cooler areas of using SVG you're probably anxious to tackle-animation.

Since our SVG Playground utilizes [Snap.svg](http://snapsvg.io/), it's time for us to go over how that works, and how to animate SVG via Snap.svg. This library–which simplifies interacting with SVGs somewhat verbose DOM based API–is great for exploiting SVG's dynamic nature via a convenient JavaScript interface. If you'd prefer to start off looking directly at the lower level API, I'd recommend having a look at [Jakob Jenkov's SVG Scripting page](http://tutorials.jenkov.com/svg/scripting.html), or grabbing the [SVG Essentials 2nd Edition](http://shop.oreilly.com/product/0636920032335.do) book which has an entire chapters devoted to this topic (this is a super useful SVG reference to have handy, and I'm absolutely NOT an affiliate at this time…just a fan of the book!)

Specifically, this article will tease apart getting Snap.svg set up and initialized, pulling in your SVG data via Snap's `load` method, using its `select` method to get your SVG container element referenced, and finally how to then inject your SVG back in to the DOM and transform it over time…animation. Excited yet!?


### Basic Snap SVG

There are a few main ways I generally will use Snap.svg:
1. Draw SVGs from scratch ex. draw a circle or rectangle
1. Load and external SVG and then inject that in to an &ldquo;SVG shell&rdquo; created using Snap
1. Use Snap to `select` an inline SVG and then work with that directly

## Drawing with Snap


<p data-height="268" data-theme-id="0" data-slug-hash="OPBQmd" data-default-tab="result" data-user="roblevin" class='codepen'>See the Pen <a href='http://codepen.io/roblevin/pen/OPBQmd/'>Simple Snap.svg Drawing Example</a> by Rob Levin (<a href='http://codepen.io/roblevin'>@roblevin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

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