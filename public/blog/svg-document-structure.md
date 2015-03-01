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

Let's now take a look at how SVG does *grouping* and how elements can be instantiated for reuse. We'll start with the `<g>` element.

### Grouping With The `<g>` Element

The `<g>` element acts as a container element that allows you to, well, *group* related elements. If you have any experience with graphical software packages like Adobe Illustrator, Omnigraffle, Keynote, etc., you've like used similar functionality to group like-elements that you want to be able to manipulate, or move, together in one broad sweep. Conceptually, the goal is the same: to group graphical elements that make more sense to be manipulated together.

#### Accessibility and Groups

The [specification](http://www.w3.org/TR/SVG/struct.html#Groups) provides that the `<g>` grouping element used in conjunction with the *description* element `<desc>`, and the *title* element `<title>`:

>provide information about document structure and semantics.
>Documents that are rich in structure may be rendered graphically, as speech, or as braille, and thus promote accessibility

So, in addition to convenience, you should keep this in mind, as you logically and semantically structure your SVG documents.

Group elements can be nested and given an `id` attribute (providing an `id` is useful if you wish to later animate that group, or, if you wish to reference it later).

### Reuse and Definition Elements

The `<def>` is used for defining reusable *definitions* for later referencing. They are not in the render tree, and, conceptually act as if you've defined `<g style="display: none">`. They too, can provide semantic meaning to the document, providing that the &ldquo;intent&rdquo; is to reuse the definition at a later point in the document. Definitions can be wrapped around groups if so desired.

### Symbols

The `<symbol>` element is interesting in that it behaves as though you've defined `<def><g>...</g></def>` (in a way), but are not at all a part of the render tree, have their own `viewBox` (a topic we're not intending to discuss here), and serve as *reusable templates* for later use.

Again, the specification likely says it best when trying to understand the differences between the *symbol* and *group* elements:

>The key distinctions between a ‘symbol’ and a ‘g’ are:
>
>A ‘symbol’ element itself is not rendered. Only instances of a ‘symbol’ element (i.e., a reference to a ‘symbol’ by a ‘use’ element) are rendered.
>A ‘symbol’ element has attributes ‘viewBox’ and ‘preserveAspectRatio’ which allow a ‘symbol’ to scale-to-fit within a rectangular viewport defined by the referencing ‘use’ element.

## Referencing Elements

Reusable definitions defined with either: `<def><g>`, or, `<symbol>...` can later be referenced via:

* the useful `<use>` element, designed just for such referencing
* via the `url` CSS property (for example to reference a *raster filter effect*, such as a *drop shadow*, *gradient*, etc.)

### Using `<use>`

Using the `<use>` element is quite simple:

1. Give your definition element an `id` attribute
2. Simple reference that `id`

If the definition being referenced is defined on the page or within the same SVG document, you can do something like:

```svg
<use xlink:href="#dog" />
```

But you can also reference externally defined definitions (ex. an SVG file) like:

```svg
<use xlink:href=“path/to#dog" />
```

However, the later technique does require an IE shim. Read about that in my guest post on css-tricks [5 Gotchas You’re Gonna Face Getting Inline SVG Into Production](https://css-tricks.com/gotchas-on-getting-svg-into-production/).

Let's next take a look at how this all works from both sides (the definition and the reference)…

## Putting It All Together


Let's start with an example of referencing an SVG `linearGradient` effect via CSS:

```svg
<svg>
	<defs>
		<linearGradient id=“my_gradient"> ... </linearGradient>
	</defs>
	<circle style=“fill:url(#my_gradient) ... />
	<rect style=“fill:url(#my_gradient) ... />
</svg>
```

In the above code snippet, we've defined a linear gradient in a `<def>`, provided an `id` of `my_gradient`, and then simply referenced that `id` from within the `fill:url` style rule.

The other way we can reference a reusable definition–via the `use xlink:href` mechanism might look as follows:

```svg
<svg>
	<symbol id="my_symbol"> ... </symbol> 
	<g><use xlink:href="#my_symbol" ... /></g>
</svg>
```

It should be fairly straight-forward, but we're simply defining a symbol, giving it an `id`, and the referencing that `id` from the &ldquo;using&rdquo; `<use>` element. *Note, that, although we've demonstrated using a `<symbol>` definition here, we may have also elected to use something like `<def><g id="my_group" ...` should we have preferred to do so.*

## Conclusion

Hopefully, you found this article on SVG's Document Structure concepts approachable and helpful. If not, please do leave a comment and I'll do my best to provide clarification. Otherwise, best of luck in your SVG adventures!

