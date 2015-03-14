##Responsive SVG Sass Mixin

If you've read [Sara Soueidan's article](http://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/) on making SVG responsive,
you're likely quite annoyed that you have to calculate the ratio of `height / width` to determine your `padding-bottom` percentage to make it
work in IE (I was). I was thinking that, perhaps, a Grunt plugin might work to ease this pain, but every solution I thought of felt a bit too, well,
intrusive. It occured to me that the annoyance is really only the ratio calculation, so the solution should also be small–Sass mixins to rescue!

### SVG Padding Hack

If you're too damn lazy to read [her article](http://tympanus.net/codrops/2014/08/19/making-svgs-responsive-with-css/) (you slacker!), she actually
summed it up quite well in a tweet back to me: "Collapse height to 0 apply padding so that the new height is a ratio of the width & get the aspect ratio u want"…brilliant!

Essentially, this is an &ldquo;IE thang&rdquo;, and, apparently, the [@IEDevChat](https://twitter.com/IEDevChat) team is hard at work and will hopefully get this sort of stuff worked out.

In the meantime, I don't want yet another thing to worry about when I'm trying to pump out web sites! So I made the following mixin:

```scss
//Pass in width / height without any length unit specifier (so we don't have to do sill strip unit wackiness!), and
//this will determine appropraite ratio for padding hack and deliver the conainter code.
//Defaults to, essentially, a box 1:1. Ex. if you had W100 and H200 you'll get a `padding-bottom:200%`
//Preferably, put something like `viewBox="0 0 N N" preserveAspectRatio="xMinYMin meet"` on your SVG root element
@mixin svg-responsive ($width: 1, $height: 1, $container-namespace: ".svg-container") {
  $padding-bottom: percentage($height/$width);
  #{$container-namespace} {
    display: inline-block;
    position: relative;
    height: 0;
    width: 100%;
    padding: 0;
    padding-bottom: $padding-bottom;
    vertical-align: middle;
    overflow: hidden;
  }
}

//This is a call to the mixin with no args and I'll get `.svg-container {...padding hack code...}`
//If you want another namespace and/or w/h ratio use the parameters
@include svg-responsive ();

//You have to write this once in your code...just apply this class on all your SVGs and absolutely position them top left inline block:
.svg {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
}

```

Here's an example that uses the default mixin, which will only work for 1:1 ratio (a box):

```html
<svg>
  <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
</svg>
```
<figure>
  <div class="svg-container">
    <svg class="svg" viewBox="0 0 64 64" preserveAspectRatio="xMinYMin meet">
      <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
    </svg>
  </div>
  <figcaption>A Stroked SVG Circle</figcaption>
</figure>


Here's an example for 1:2 width/height ratio:

```html
<svg>
  <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
</svg>
```
<figure>
  <div class="svg-container-2x-height">
    <svg class="svg" viewBox="0 0 64 128" preserveAspectRatio="xMinYMin meet">
      <rect x=10 y=10 width=50 height=100 style="fill: hotpink; stroke: none;" />
    </svg>
  </div>
  <figcaption>Rect with height is twice that of width</figcaption>
</figure>


I created a Gist for this if you wanna go grab it and put it on your stuff. Should be easy to convert to Less or Stylus if that's your thing. Here's the code (yet again in Gist wonder):

<script src="https://gist.github.com/roblevintennis/865de775fb988bfad9a1.js"></script>

*So a big fat disclaimer that I did this somewhat impulsively, and haven't tested it thoroughly yet (besides this very article), and, so, there may still need to be some tweaks (although I can't imagine it's not right wink wink!).*

