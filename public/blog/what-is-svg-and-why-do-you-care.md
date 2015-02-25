##What Is SVG and Why Do You Care?

If you've been keeping an eye on the &ldquo;pulse of the web&rdquo; these days, you've undoubtedly notice that SVG–spelled out: Scalable Vector Graphics–is experiencing an amazing resurgence on the web. Let's examine what exactly this SVG thing is, and why you need to start learning more about it now.

### SVG Benefits

Perhaps you've already played around a bit with SVG–or, perhaps not–but, either way, it's useful to know exactly what benefits a technology brings to understand exactly how much time is appropriate to invest in it to get maximum ROI. Here are some of the more compelling ones you may be interested in:

* Resolution Independence and Scalability–unlike their *Raster* counterparts, *Vector* images don't have to resort to *anti-aliasing* and the edges remain crisp as you zoom in and out
* Dynamic–SVGs are interactive and can be manipulated at run-time via scripting or CSS
* Backed by a proper DOM-based API (this relates to the last benefit, but explains why SVG is so amenable to scripting)
* SVG supports the inclusion of *text* and *raster images* within a given *SVG document* so you get &ldquo;the best of both worlds&rdquo; if you need it
* Availability of client-side raster filter effects such as drop shadows, gradients, etc.
* Inline SVG is styleable via CSS (excluding some pesky browsers edge cases of course!)
* W3C Open Standard with excellent import/export capabilities ex. you can export an Adobe Illustrator file; import it in to Sketch or Inkspace, tweak some more, and then render it in a web browser
* Designer Friendly–designers can use tools they love like AI and simply export graphics to SVG
* SEO and Accessibility wins since the graphic image is semantically described by an underlying XML text-based structure
* Text–searchable, selectable, and translatable
* Reusability–a single `<def>` or `<symbol>` element can be *instantantiated* multiple times

These are just some of the benefits, but let's get in to explaining exactly what *IS* SVG next…

### Raster vs. Vector

To understand the *Scalable Vector* part of SVG, we need to understand what *vector* is, and contrast it to *raster* (the more common image counterpart in use).

#### Raster

A simple definition of a raster image is: *a rectangular series of pixels, where each pixel defines an RGB color value*. This is a simplified (if not dumbed down) definition, but will suffice for our purposes.

The series of pixels described above, is also known as a *bitmap*. Bitmaps are generally compressed for storage, and then decompressed by a viewing program as needed.

Some popular raster image formats are: JPG (or JPEG), PNG, and GIF. These image formats are prolific and, thus, support for raster images is ubiquitous. This wide-spread usage explains the excellent back support for raster images, and supporting legacy browsers/systems is pretty much a non-issue. However, raster images have some disadvantages:

* Static–raster images are generally not *self-aware*, so you can't easily change them at run-time
* [Pixelation](http://en.wikipedia.org/wiki/Pixelation)–when zoomed, edges start to exhibit a &ldquo;stair-stepping&rdquo;, or &ldquo;jagged&rdquo; effect. This is generally circumnavigated by means of [anti-aliasing](http://en.wikipedia.org/wiki/Spatial_anti-aliasing), a process which, essentially, detects and blurs an image's edges creating the optical illusion of smooth edges. But, as you zoom in, these sorts of techniques become less and less effective, and the eye is distracted by the rather ugly visual artifacts in the zoomed raster image.

#### Vector

A vector image is: *a series of instructions that describe to a viewing program how to draw shapes comprised of lines and curves. These instructions map to a series of grid points (aka coordinates) where the lines or curves are to be drawn.*

<figure>
![Box Model](../images/blog/raster-vs-vector.png "Raster vs. Vector")
<figcaption>Raster (pixelated edges) vs. Vector (crisp edges)</figcaption>
</figure>

In the above image, we've purposely scaled up both the raster and vector versions of the same original graphic. Notice that, while the vector remains crisp, the raster image exhibits jagged edges and pixelation.

##### Rendering

Interestingly, the actual rendered vector image, is rendered as a raster image by the viewing program, since:
	[all modern displays are raster-oriented](http://www.w3.org/TR/SVG/concepts.html)

However, due to the way vector graphics are defined (as a series of commands or instructions at geometric points), the rendering engine can achieve feats such as zooming via some simple multiplication and a redraw. This fact, makes SVG wonderful when it comes to, ahem, scalability.

While vector-based graphics are not as ubiquitous as raster, they have some definite advantages:

* vector graphics are *object-based* and thus *self-aware* (so a circle &ldquo;knows&rdquo; it's a circle and, as such, can be altered or morphed at run-time)
* resolution independence and scalability (Are we repeating ourselves!? Fine, but here's another compelling example for you: a printer can utilize its full resolution resulting in a sharper printed page)

### History

SVG became an open standard in 1998, and had an early upswing in about 2001 when Adobe released the SVG Viewer 3. By 2005, SVG was becoming quite popular, but Adobe adopted Flash making SVG a lesser priority. Then, in 2008, Apple publicly denounces and blocks Flash from iOS products resulting in all &ldquo;web folk&rdquo; becoming enamored by the promise of HTML5. By 2010, we see IE9 start to support SVG, and in 2011 Retina, 2012 Android, and since then, a general up-swing in the number of form factors and resolutions that need to be supported. I believe these last points, plus decent overall cross browser support, have put SVG back on the hot list of the web's tech trends.

The following is a timeline representation of the historical data mentioned above (and created with SVG itself) by the W3C Developer Relations Lead, [Doug Schepers](http://t.co/uAVXcyIs6T) / [@shepazu](http://www.twitter.com/shepazu). I first saw this while attending Doug's [Frontend Masters SVG Workshop](https://frontendmasters.com/workshops/svg/). Doug was kind enough to let us use it here (thanks!). I did make some small alterations to the CSS to make it fit our site and be responsive, hopefully preserving Doug's original artistic and aesthetic intent!
<div class="svg-container rise-and-fall">
<svg class="svg" viewBox="0 0 1040 480" preserveAspectRatio="xMinYMin meet">
  <title>The Rise and Fall and Rise of SVG</title>
  <rect id="bg" x="-1000" y="-1000" width="3000" height="3000" fill="black"/>
  <text id="head" x="1010" y="50" class="heading" text-anchor="end" fill="gold">The Rise and Fall and Rise of SVG</text>
  <g id="content" font-size="27">
    <g class="bullet" visibility="hidden" transform="translate(10,50)" style="visibility:visible">
      <text class="number-using" x="15" y="232.5" font-size="20" pointer-events="none" text-anchor="middle" transform="rotate(-90,15,212.5)">Number of people using SVG</text>
      <text class="axis-labels" x="50" y="0" text-anchor="end"><tspan x="140" y="370" fill="white">Not Many</tspan><tspan x="140" y="70" fill="white">A lot!</tspan></text>
      <line id="line_1" x1="150" y1="360" x2="150" y2="60" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
      <line id="line_1" x1="150" y1="360" x2="1000" y2="360" stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <circle cx="200" cy="410" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="200" y="430" fill="white" text-anchor="middle" class="timepoint">1998
        <tspan x="200" dy="1.5em">SVG begins</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="200" y1="410" x2="350" y2="380" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="200" cy="410" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="350" cy="380" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="350" y="430" fill="white" text-anchor="middle" class="timepoint">2001
        <tspan x="350" dy="1.5em">Adobe SVG Viewer 3</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="350" y1="380" x2="550" y2="350" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="350" cy="380" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="550" cy="350" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="550" y="430" fill="white" text-anchor="middle" class="timepoint">2005
        <tspan x="550" dy="1.5em">Adobe adopts Flash</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="550" y1="350" x2="700" y2="400" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="550" cy="350" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="700" cy="400" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="700" y="430" fill="white" text-anchor="middle" class="timepoint">2008
        <tspan x="700" dy="1.5em">Apple blocks Flash</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="700" y1="400" x2="800" y2="380" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="700" cy="400" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="800" cy="380" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="800" y="430" fill="white" text-anchor="middle" class="timepoint">2010
        <tspan x="800" dy="1.5em">IE9</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="800" y1="380" x2="850" y2="350" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="800" cy="380" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="850" cy="350" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="850" y="430" fill="white" text-anchor="middle" class="timepoint">2011
        <tspan x="850" dy="1.5em">Retina</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="850" y1="350" x2="900" y2="270" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="850" cy="350" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="900" cy="270" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="900" y="430" fill="white" text-anchor="middle" class="timepoint">2012
        <tspan x="900" dy="1.5em">Android</tspan>
      </text>
    </g>
    <g class="bullet" visibility="hidden" style="visibility:visible">
      <line x1="900" y1="270" x2="1000" y2="110" stroke="gold" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="900" cy="270" r="5" fill="cornflowerblue" stroke="gold"/>
      <circle cx="1000" cy="110" r="5" fill="cornflowerblue" stroke="gold"/>
      <text x="1000" y="430" fill="white" text-anchor="middle" class="timepoint">2014
        <tspan x="1000" dy="1.5em">Today</tspan>
      </text>
    </g>
  </g>
</svg>
</div>

### SVG Example Usages

Some practical uses for SVG on the web are:

* Images that need to work regardless of resolution, screen-size, zoom level, and an overall variety of form factors
* Interaction Design–simple interactivity such as images or icons that change when you hover, click, or touch them are a sweet spot for SVG. See our own [SVG Playground](../demo/svg.html) for one example of this.
* Icons–SVG Icons are a known win, as iconography really benefits from crisp clear lines
* Icons that need to be styled independently. For example, a single Task icon might have several states indicated by color changes (red for overdue, green for started, etc.), This can be achieved with just one icon graphic that uses various CSS classes to kick in the appropriate coloring.
* Logos
* Applications–full blown applications, games, and user interfaces can be built in SVG
* Data Visualizations–Graphs and Charts

Two more links I'd recommend having a look at for some major inspiration are:
[this demo by Petr Tichy](https://ihatetomatoes.net/svg-christmas/), and the articles tagged [svg on the Codedrops site](http://tympanus.net/codrops/tag/svg/) which are always quite appealing.

### SVG Basics

Hopefully I've convinced you that an investment in learning the basics of SVG is worthwhile. I'll leave you with a very simplistic example of SVG, but encourage you to read my other article on [SVG Basics](./blog/svg-for-beginners) to learn more. To keep things simple, I've cheated a bit with the code snippet below excluding some things I did to make the SVG &ldquo;responsive&rdquo;, which entails a couple of techniques that would only confuse at this point. For now, just assume that the SVG dimensions have been set to 64 x 64 relative units, and that the circle's center points are located at the center of that.

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

