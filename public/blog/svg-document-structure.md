## SVG Document Structure

For most web developers, SVG (or Scalable Vector Graphics), should bring some familiarity in terms of syntax. This is due to the fact, that SVG is a dialect of XML and quite similar to HTML. However, many &ldquo;SVG noobs&rdquo; hit a stumbling block with a couple of concepts that are unique to SVG. My advice to folks new to SVG, is to push through these challenges, since the ROI that SVG brings is well worth the effort. With that said, I hope that this article clarifies one of these few challenging areas…SVGs Document Structure.

Delving in to this area of SVG will lead us to examine the following broad topics:

* SVG's Root Element
* Grouping Elements
* Referencing Elements

## SVGs Root Element

SVG's root element can be a beast of an element to tame for noobs, and attempting to address certain available attributes (like `viewBox` and `preserveAspectRatio` for example), will take you you directly in to some of the most difficult to grok areas of SVG. As such, we'll purposely avoid these, and, only looking at the &ldquo;easy-peasy&rdquo; attributes that concern us here (we'll tackle the harder stuff in future articles!)

With the disclaimer, that we're not going to worry about scaling or *responsive web design* (for the time being), the simplest use of the root element might look as follows:

```svg
<svg width="100" height="100" xmlns:svg="http://www.w3.org/2000/svg">
	...
</svg>
```

Let's take these attributes one at a time and also point out some relevant take aways:

* `width`: specifies the width of the SVG viewport (think of viewport as the visiable *canvas* that SVG will be drawn to)
* `height`: specifies the height of the SVG viewport
* since no *unit specifier* was provided, `px` is used here (pixels) so we have an area of 100 pixels by 100 pixels
* if you code CSS, familiar *length unit specifiers* like: `em, ex, px, in, cm, mm, pt, pc, %` can be used
* `xmlns:svg`: this attribute represents the [XML Namespace](http://www.w3.org/TR/2006/REC-xml-names-20060816/) we wish to use. *Note that this isn't required, at this point, for inline embedded SVG documents in an HTML5 document served as `text/html` (generally the normal case). However, if you serve the page as `image/svg+xml`, or, as `application/xhtml+xml` (or really any mime type that causes the browsers to XML parse your document, then the `xmlns` attribute IS required. Also, if you want to be able to open up an SVG file *standalone*, you will, of course, need to include the `xmlns`.*
* this particular SVG is a *fixed width* SVG, since we've, essentially, hard coded the pixel dimensions

So there you have it, about the easiest explanation I could think of for how SVG's root element works. We'll get in to the &ldquo;other half of the story&rdquo; when we look at SVG Coordinate Systems in a future article. Also, if you're on the lates RWD kick, please don't fret over the fact that we have a fixed dimension SVG bother you (for the time-being)–we're trying to keep things simple and approachable, so please trust me; we'll get in to how to implement responsive SVGs in a couple articles from now &#x263a;

## Grouping Elements

TBD .. groups <g>, defs, and symbols....

## Referencing Elements

TBD .. use xlink...linear gradient Referencing by ID etc. etc.


## Putting It All Together

TBD .. code snippets

