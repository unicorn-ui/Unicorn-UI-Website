## SVG Basics

Let's start by going over some of the very basics of SVG…

Creating an SVG by hand is actually pretty simple. Start with the `<svg>` element and the required namespace attribute, and simply stick a shape in there. Here's a circle:

```html
<svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 64 64">
<circle cx="32" cy="32" r="32" fill="#2ecc71"/>
</svg>
```

In our circle shape, the `cx` attribute defines the x-coordinate from the center of the circle, the `cy` defines the y-coordinate from the center of the circle, and the `r` defines the radius for the circle. The above renders:

<figure>
  <svg xmlns="http://www.w3.org/2000/svg" height="64" width="64" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="#2ecc71"/>
  </svg>
  <figcaption>A basic SVG Circle</figcaption>
</figure>

We can also lose the fill and replace that with strokes. Let's have some fun and nest two &ldquo;stroked circles&rdquo;:

```html
<svg height="64" width="64" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="28" stroke="#2ecc71" stroke-width="4" fill="none"></circle>
  <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
</svg>
```
<figure>
  <svg height="64" width="64" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="28" stroke="#2ecc71" stroke-width="4" fill="none"></circle>
    <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
  </svg>
  <figcaption>A Stroked SVG Circle</figcaption>
</figure>

As you can see, creating an outlined shape is simply a matter of setting the `fill` to `none`, and applying the appropriate stroke attributes. Why stop there?

Let's make an outlined square:

```html
<svg height="64" width="64" viewBox="0 0 64 64">
  <rect x="2" y="2" height="60" width="60" fill="none" stroke="red" stroke-width="4"></rect>
 </svg>
```
<figure>
  <svg  height="64" width="64" viewBox="0 0 64 64">
    <rect x="2" y="2" height="60" width="60" fill="none" stroke="red" stroke-width="4"></rect>
   </svg>
  <figcaption>And here that is rendered</figcaption>
</figure>

Now let's make a rectangle with a fill and a stroke:

```html
<svg xmlns="http://www.w3.org/2000/svg">
<rect x="5" y="20" height="40" width="70" fill="#f1c40f" stroke="#16a085" stroke-width="5px" />
</svg>
```
<figure>
  <svg height="40" width="70" viewBox="0 0 40 70" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="20" height="40" width="70" fill="#f1c40f" stroke="#16a085" stroke-width="5px" />
  </svg>
  <figcaption>And here that is rendered</figcaption>
</figure>

Ok, we shown some basic shapes but we've left off the details on the root `<svg>` element itself. Let's digress for a bit to tackle that next.

### The SVG Root Element

TBD .. but discuss the viewport and viewbox and namespace attributes...

### More Shapes

We can also draw lines. Let's draw a line, 5 pixels from the top-left-most corner, down and to the right a bit shy of 200 pixels (we've started at 5 so it's 195 pixels in distance):

```html
<svg>
  <line x1="5" y1="5" x2="200" y2="200" stroke="#34495e" stroke-width="10" /></line>
</svg>
```
<figure>
  <svg>
    <line x1="5" y1="5" x2="200" y2="300" stroke="#34495e" stroke-width="10" /></line>
  </svg>
  <figcaption>And here that is rendered</figcaption>
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
  <figcaption>And here that is rendered</figcaption>
</figure>

Besides applying path coordinates to a pre-built shape type like polygon, we can use the more generic but powerful `<path>` tag to bend paths at our will.

The path information is specified within the `d` attribute which contains all our *path data* (think of the `d` as standing for data). Within that attribute we insert our *path data commands*. Let's start with a simple example that creates a similar, albeit larger, triangle a bit more &ldquo;manually&rdquo;:

```html
<svg>
  <path d="M150 5 L75 200 L225 200 Z"  fill="#1abc9c" stroke="#95a5a6" stroke-width="5" />
</svg>
```

<figure>
  <svg>
    <path d="M150 5 L75 200 L225 200 Z"  fill="#1abc9c" stroke="#95a5a6" stroke-width="5" />
  </svg>
  <figcaption>And here that is rendered</figcaption>
</figure>

As we explain the above *path data*, try to imagine a virtual pen going from point to point:

* M: translates to &ldquo;move to&rdquo;–here we move to the coordinate 150,0 (and, using our pen analogy, touch the pen to paper on this first point of our path)
* L:  translates to &ldquo;line to&rdquo;, and here, we draw a line from the current point to the &ldquo;absolute position&rdquo; of 75,200. Since the path command uses an *upper-case letter*, the coordinate is absolute. If we had used a lower-case `l`, the coordinates would be interpreted as the relative offset from our last point. In any event, this `L` command that's the line from the top of the triangle down to the bottom left point. Than we draw another line across the bottom of the triangle to 225,200. Note that we could have left off the `L` on the second line as SVG path syntax allows for being painfully succinct yet efficient.
* Z:  translates to &ldquo;close path&rdquo;–this will close our triangle path turning our *open path* to a *closed path* by drawing the line back up to our first point.

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

Whew, we now have a rudimentary understanding of SVG. Let's now look at animating individual parts of our SVG, and how to prepare an SVG for such animating…

## Illustrator SVG Preparation Process

In order to animate our SVG with Snap.svg, we will need to have hooks in to the particular shapes we want to animate. This requires having some understanding of how the SVG itself is composed.

ALEX: I'M GOING TO REWORK THIS WHOLE SECTION SO IT'S OUT OF CONTEXT... just thought some content with images might be helpful

### Step 4: Make Animation Destination SVG

Now we need to create the SVG that depicts the *to* destination for the animation. In our case, we simply want the trash can lid to look as though it's been lifted.

*You have saved to first version haven't you? If not, do that first!*

Since we released the compound path in the previous step, selecting the trash can lid should now result in a shape selection that looks something like:

<figure>
![Selecting the Trash Can Lid](/images/blog/select-lid.png "Selecting the Trash Can Lid")
</figure>

You'll notice that the *origin* point is currently at dead center. But we want our lid to rotate from the bottom left corner of the lid, so we need to change this. First select the *rotate tool*:

<figure>
![Illustrator's Rotate Tool](/images/blog/rotate-tool.png "Illustrator's Rotate Tool")
<figcaption>....more junk...</figcaption>
</figure>


Now it's just a matter of saving the copy and naming it something different:

<figure>
![Saving a Copy](/images/blog/save-a-copy.png "Save a Copy")
</figure>

And then name the file:

