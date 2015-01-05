## SVG Basics

SVG–short for Scalable Vector Graphics–is an XML vector graphics format which provides excellent scalability and 2D animation capabilities.

<blockquote>
  Creating an SVG by hand turns out to be pretty simple. Start with the `<svg>` element and the required namespace attribute (you'll need this if you want to view the SVG &ldquo;standalone&rdquo;), and simply stick a shape in there. Here's a circle:
</blockquote>


```html
<svg xmlns="http://www.w3.org/2000/svg" height="64" width="64">
<circle cx="32" cy="32" r="32" fill="#2ecc71"/>
</svg>
```

The `cx` attribute defines the x-coordinate from the center of the circle, the `cy` defines the y-coordinate from the center of the circle, and the `r` defines the radius for the circle:
