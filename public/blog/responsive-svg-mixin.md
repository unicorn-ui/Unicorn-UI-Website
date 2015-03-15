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
$svg-container-namespace: '.svg-container';

//Give 'em' 1:1 responsive container by default
#{$svg-container-namespace} {
  display: inline-block;
  position: relative;
  height: 0;
  width: 100%;
  padding: 0;
  //Default for 1:1 aspect ratio
  padding-bottom: 100%;
  vertical-align: middle;
  overflow: hidden;
}

//Pass in width / height without any length unit specifier (so we don't have to do sill strip unit wackiness!), and
//this will determine appropraite ratio for padding hack and deliver the conainter code.
//Ex. if you had W100 and H200 you'll get a `padding-bottom:200%`
//Preferably, put something like `viewBox="0 0 N N" preserveAspectRatio="xMinYMin meet"` on your SVG root element
@mixin svg-responsive ($width: 1, $height: 1, $suffix:"") {
  $padding-bottom: percentage($height/$width);
  #{$svg-container-namespace}-#{$suffix} {
    padding-bottom: $padding-bottom;
  }
}

@include svg-responsive (1, 2, "2x-height");

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
<div class="svg-container">
  <svg class="svg" viewBox="0 0 64 64" preserveAspectRatio="xMinYMin meet">
    <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
  </svg>
</div>
```
<figure>
  <div class="svg-container">
    <svg class="svg" viewBox="0 0 64 64" preserveAspectRatio="xMinYMin meet">
      <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
    </svg>
  </div>
  <figcaption>A Stroked SVG Circle</figcaption>
</figure>


And here's an example for 1:2 width vs. height, and the class was created with:

```scss
@include svg-responsive (1, 2, '2x-height');
```

But you needn't simplify, in many case it would be easiest to just supply the width and height like:

```scss
@include svg-responsive (64, 128, '2x-height');
```

Output:

```html
<div class="svg-container svg-container-2x-height">
  <svg class="svg" viewBox="0 0 64 128" preserveAspectRatio="xMinYMin meet">
    <circle cx="32" cy="32" r="20" stroke="#08BCD0" stroke-width="4" fill="none" />
  </svg>
</div>
```
<figure>
  <div class="svg-container svg-container-2x-height">
    <svg class="svg" viewBox="0 0 64 128" preserveAspectRatio="xMinYMin meet">
      <rect x=10 y=10 width=50 height=100 style="fill: hotpink; stroke: none;" />
    </svg>
  </div>
  <figcaption>Rect with height is twice that of width</figcaption>
</figure>


*Note that this attempts to use[SMACSS](https://smacss.com/) CSS conventions on the container class names. Amongst other things, this allows us to keep all the boiler-plate container code in the base module which defaults to `.svg-container`.*.


Sort of &ldquo;thinking out loud&rdquo;, but, if you could manage to keep your SVGs using the golden ratio you could likely do something like this:
```scss
@include svg-responsive (1, 1.61803398875, 'golden');
```

*Since under the hood, it's just dividing the arguments you pass for `width` and `height` to determine the `padding-bottom` ratio.*

I created a Gist for this if you wanna go grab it and put it on your stuff. It should be easy to convert to Less or Stylus if that's your thing. Here's the code (yet again) in Gist wonder:

<script src="https://gist.github.com/roblevintennis/865de775fb988bfad9a1.js"></script>

*So a big fat disclaimer that I did this somewhat impulsively, and haven't tested it thoroughly yet (besides this very article), and, so, there may still need to be some tweaks (although I can't imagine it's not right wink wink!).*

Update: I'm a bit surprised by the reaction, but I guess it makes sense since Responsive SVG is not exactly intuitive for those that haven't yet tackled [SVG's Coordinate System](http://www.w3.org/TR/SVG/coords.html). Should I make this a Unicorn-UI module? It'd be like 20 lines of code, but I suppose we could supply a half-dozen common aspect ratios and let you opt-in (like we do in Buttons by using Sass Lists). Love to hear if this is worthwhile to folks in the comments. If so, we could probably have it coded up pretty quickly.
