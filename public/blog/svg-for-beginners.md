## SVG Basics

SVG–short for Scalable Vector Graphics–is an XML vector graphics format which provides excellent scalability and 2D animation capabilities.

Creating an SVG by hand turns out to be pretty simple. Start with the `<svg>` element and the required namespace attribute (you'll need this if you want to view the SVG &ldquo;standalone&rdquo;), and simply stick a shape in there. Here's a circle:

```html
<svg xmlns="http://www.w3.org/2000/svg" height="64" width="64">
<circle cx="32" cy="32" r="32" fill="#2ecc71"/>
</svg>
```

The `cx` attribute defines the x-coordinate from the center of the circle, the `cy` defines the y-coordinate from the center of the circle, and the `r` defines the radius for the circle:

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" height="64" width="64">
  <circle cx="32" cy="32" r="32" fill="#2ecc71"/>
  </svg>
  <figcaption>A basic SVG Circle</figcaption>
</figure>

We can also lose the fill and replace that with strokes. Let's have some fun and nest two &ldquo;stroked circles&rdquo;:

```html
<svg height="64" width="64">
  <circle cx="32" cy="32" r="28" stroke="#2ecc71" stroke-width="4" fill="none"></circle>
  <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
</svg>
```
<figure>
  <svg height="64" width="64">
    <circle cx="32" cy="32" r="28" stroke="#2ecc71" stroke-width="4" fill="none"></circle>
    <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
  </svg>
  <figcaption>A Stroked SVG Circle</figcaption>
</figure>

As you can see, creating an outlined shape is simply a matter of setting the `fill` to `none`, and applying the appropriate stroke attributes. Why stop there? Let's make an outlined square:

```html
<svg height="64" width="64">
  <rect x="2" y="2" height="60" width="60" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
 </svg>
```
<figure>
  <svg  height="64" width="64">
    <rect x="2" y="2" height="60" width="60" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
   </svg>
  <figcaption>Rendering of above square</figcaption>
</figure>

Now let's make a rectangle with a fill and a stroke:

```html
<svg height="80" width="80">
  <rect x="5" y="20" height="40" width="70" fill="#f1c40f" stroke="#16a085" stroke-width="5px" />
</svg>
```
<figure>
  <svg height="80" width="80">
    <rect x="5" y="20" height="40" width="70" fill="#f1c40f" stroke="#16a085" stroke-width="5px" />
  </svg>
  <figcaption>Rendering of Stroked Rectangle</figcaption>
</figure>

Ok, we shown some basic shapes but we've left off the details on the root `<svg>` element itself. Let's digress for a bit to tackle that next.

### SVG Viewport

The *viewport* is the rectangular region of the SVG canvas your document uses as the viewing area the user will see.
The size of the SVG viewport can be explicitly set by providing the `width` and `height` attributes which will define the area of the coordinate system used.
This coordinate system starts at the top-left corner (defined as `0,0`). Increasing the *x-coordinate* will result in moving rightwards, while increasing the *y-coordinate* will result in moving downards.
When specifying the `width` or `height`, the available length unit identifiers are: `px`, `em`, `pt`, `ex`, `mm`, `cm`, `pc`, `in`, and `%`. Units provided with no specifier will result in pixels by default.

If `width` and `height` are not provided, the value used will be as though '100%' was provided.

### SVG Viewbox

We simplified the description of the initial coordinate system the SVG user agent creates. There are actually two initial coordinate systems at play:

1. The *viewport coordinate system* (as described above)
2. The *user coordinate system*

The two coordinates systems are, initially, identically placed, such that the viewport and user coordinate origins both start at the very top/left corner, or, `0,0`). You might visualize these as two superimposed rectangles with the same dimensions.

The SVG attribute `viewBox` is, essentially, a means of establishing a new &ldquo;current&rdquo; *user coordinate system*, as it allows you to displace or stretch your viewable region in interesting ways. The `viewBox` attribute takes a list of four numbers: `min-x`, `min-y`, `width` and `height`, each separated by whitespace or comma.


### Viewbox Displacement Example

An example should hopefully make it easier to &ldquo;grok&rdquo; the basics of how viewBox displacement works. Let's start with a simple rectangle that starts at `10,10`:

```html
<svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 100 100">
  <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
</svg>
```
<figure>
  <svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 100 100">
    <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
  </svg>
  <figcaption>Simple rectangle 10 pixels from top and left</figcaption>
</figure>


Now, if we specify positive values for the first two numbers, say `20,20`, the `viewBox` will be displaced such that the viewBox's coordinate `20,20` (*user space*) will get overlayed over the `0,0` coordinate of the viewport's coordinate (*viewport space*):

```html
<svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="20 20 100 100">
  <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
</svg>
```
<figure>
  <svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="20 20 100 100">
    <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
  </svg>
  <figcaption>Resulting displacement when positive `min-x` and `min-y` values used</figcaption>
</figure>

Is your mind blown? Yes, it's a bit counter-intuitive that these positive values don't represent new `x1,y1` points (which would move our box the other way to the right)…but no, what's happening reads aloud as: &lsquo;go to `20,20` of my viewBox, and move <em>that</em> to the `0,0` point on the viewport&rsquo;.

If cognitive dissonance is making you yearn to see the box move down and to the right, you'll be comforted that we can do so simply, by instead using negative values:

```html
<svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="-20 -20 100 100">
  <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
</svg>
```
<figure>
  <svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="-20 -20 100 100">
    <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
  </svg>
  <figcaption>Resulting displacement when negative `min-x` and `min-y` values used</figcaption>
</figure>


### Viewbox Scaling

Now that you've seen how the `viewBox` can be used to displace our graphics, you may also be wondering what was all this talk about how we can *stretch* our viewBox region. We'll explain that now.

The `width` and `height` values of the viewBox attribute are divided in to the viewport's width and height to determine the ratio to scale each unit. This will result in the graphic being stretched or shrunk accordingly. Starting with stretching:

```html
<svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 50 50">
  <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
</svg>
```
<figure>
  <svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 50 50">
    <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
  </svg>
  <figcaption>viewBox &ldquo;stretching&rdquo;</figcaption>
</figure>

Above, we see that our, initially 50 by 50 box has doubled in size and is clipped by the viewport. This happens since `100/50 = 2`, so each unit in our rect is now, essentially, doubled. We can go the other way too:

```html
<svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 300 300">
  <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
</svg>
```
<figure>
  <svg height="100" width="100" style="border: 1px solid #16a085;" viewBox="0 0 300 300">
    <rect x="10" y="10" height="50" width="50" fill="none" stroke="#ff8a65" stroke-width="4"></rect>
  </svg>
  <figcaption>viewBox &ldquo;shrinking&rdquo;</figcaption>
</figure>

This time our units are scaled down such that it takes 3 viewBox units to equal 1 viewport unit, so our box is about a third of it's original size. If you're paying particularly close attention, you'll notice that this also results in our initial `10,10` position of `x1,y1` scaling down as well (which is not necessarily surprising, but worth being aware of).


*Obviously, we need control to prevent things like clipping and control how this scaling behaves. You'll, ahem, be happy to know that you can further alter this stretch/shrink behavior by using the ultra-flexible, albeit complex, [preserveAspectRatio](http://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute) attribute. A discussion of that topic is well beyond this article's scope, but if you'd like to &ldquo;scratch that itch&rdquo;, Sara Soueidan has an [excellent article](http://sarasoueidan.com/blog/svg-coordinate-systems/) on coordinate systems that goes in to gory details. Of course, the truth can always be found in the [coordinate spec](http://www.w3.org/TR/SVG/coords.html) itself.*



### More Shapes

Whew, all this abstract *coordinate system* nonsense…let's get back to having fun playing with shapes! Let's draw a line, 5 pixels from the top-left-most corner, down and to the right a bit shy of 200 pixels (we've started at 5 so it's 195 pixels in distance):

```html
<svg width="225" height="325">
  <line x1="5" y1="5" x2="200" y2="200" stroke="#34495e" stroke-width="10" /></line>
</svg>
```
<figure>
  <svg width="225" height="325">
    <line x1="5" y1="5" x2="200" y2="300" stroke="#34495e" stroke-width="10" /></line>
  </svg>
  <figcaption>Drawing a diagonal line</figcaption>
</figure>

The `x1` and `y1` define the starting point of the line, and the `x2` and `y2` define the destination point. If we defined `y2="5"` we would have had a completely horizontal line.

We now have a couple of shapes and attributes under our belt, let's keep moving and fill in the details as we go…

### Paths and Points

Polygons use path coordinates to define the various x and y coordinates of its points. A most basic implementation of a polygon might be a triangle like we have here, but you can certainly make more interesting shapes like a star–just define more points.

```html
<svg height="64" width="64" viewBox="0 0 64 64">
  <polygon fill="none" stroke="#FF8A65" stroke-width="4" points="30,4 4,60 60,60"/><polygon>
</svg>
```
<figure>
  <svg height="64" width="64" viewBox="0 0 64 64">
    <polygon fill="none" stroke="#FF8A65" stroke-width="4" points="30,4 4,60 60,60"/><polygon>
  </svg>
  <figcaption>Polygon element used to make a triangle</figcaption>
</figure>

Besides applying path coordinates to a pre-built shape type like polygon, we can use the more generic but powerful `<path>` tag to bend paths at our will.

The path information is specified within the `d` attribute which contains all our *path data* (think of the `d` as standing for data). Within that attribute we insert our *path data commands*. Let's start with a simple example that creates a similar, albeit larger, triangle a bit more &ldquo;manually&rdquo;:

```html
<svg height="250" width="300">
  <path d="M150 5 L75 200 L225 200 Z"  fill="#1abc9c" stroke="#95a5a6" stroke-width="5" />
</svg>
```

<figure>
  <svg height="250" width="300">
    <path d="M150 5 L75 200 L225 200 Z"  fill="#1abc9c" stroke="#95a5a6" stroke-width="5" />
  </svg>
  <figcaption>Path element used to make a triangle</figcaption>
</figure>

As we explain the above *path data*, try to imagine a virtual pen going from point to point:

* M: translates to &ldquo;move to&rdquo;. Here, we move to the coordinate 150,0 (and, using our pen analogy, touch the pen to paper on this first point of our path)
* L:  translates to &ldquo;line to&rdquo;. We draw a line from the current point to the &ldquo;absolute position&rdquo; of 75,200. Since the path command uses an *upper-case letter*, the coordinate is absolute. If we had used a lower-case `l`, the coordinates would be interpreted as the relative offset from our last point. In any event, this `L` command that's the line from the top of the triangle down to the bottom left point. Than we draw another line across the bottom of the triangle to 225,200. Note that we could have left off the `L` on the second line as SVG path syntax allows for being painfully succinct yet efficient.
* Z:  translates to &ldquo;close path&rdquo;. This will close our triangle path turning our *open path* to a *closed path* by drawing the line back up to our first point.

There are more path data commands and we'll list some of them below, but try not to get too hung up on memorizing them–this is definitely a case for using a reference or cheat sheet:

* H: translated to &ldquo;horizontal line&rdquo;
* V: translated to &ldquo;vertical line&rdquo;
* C: translated to &ldquo;curve to&rdquo;
* S: translated to &ldquo;smooth curve to&rdquo;
* Q: translated to &ldquo;quadratic Bezier curve&rdquo;
* T: translated to &ldquo;smooth quadratic Bezier curve&rdquo;
* A: translated to &ldquo;elliptical arc&rdquo;

*Again, the above uppercase commands indicate absolute coordinates; just use their lowercase counter-parts to indicate a coordinate relative to the previous coordinate.*


Paths can get more interesting (and complex) with curves and arcs. I'm going to defer to [Mozilla's excellent guide on SVG Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) if you'd like to delve in. Alternatively, you might also check out [SVG Essentials, 2nd Edition](http://shop.oreilly.com/product/0636920032335.do) if you'd like to go even deeper. A &ldquo;learning hack&rdquo;, for understanding paths, is to draw super simple shapes in a vector application like Adobe Illustrator, Sketch, or Inkscape, and then look at the generated SVG that's created when you save or export to SVG).


### Grouping Paths

One practical yet simple example of combining paths in to a group might be the infamous &ldquo;hamburger icon&rdquo;. Grouping is achieved by using the `<g>` element within the SVG like so:

```html
<svg>
  <g>
    <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,10 55,0"/>
    <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,30 55,0"/>
    <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,50 55,0"/>
  </g>
</svg>
```

And here's what that looks like:

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 64 64">
    <g>
      <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,10 55,0"/>
      <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,30 55,0"/>
      <path fill="none" stroke="#1abc9c" stroke-width="10" stroke-linejoin="bevel" d="m 5,50 55,0"/>
    </g>
  </svg>
</figure>

We very easily could have replaced the above `path` elements with SVG `rect` ones, but these hamburger rectangles are coveniently simple to understand and it also shows that we can, essentially, use a path to create a stroked line.

Congrats, you now have good grounding in SVG; enough to dive in to animating individual parts of SVGs, and learning how to prepare them animation. Stay tuned for the [next article in the SVG series](/path/to/second/article).

