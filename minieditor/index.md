---
layout: default
title:  miniature Humdrum editor
github: https://github.com/humdrum-tools/vhv-demos/blob/gh-pages/miniedit/demo.html
---

This example shows how to create a very simple online editor for
Humdrum files.  As the Humdrum data is typed into the text box, the
verovio notation engine renders it as graphical notation.
Try altering the Humdrum data in the following embedded version
of the demo:

<iframe width="350" height="250" src="demo.html"></iframe>
* <a href="demo.html">view stand-alone demo page</a>
* <a href="https://github.com/humdrum-tools/vhv-demos/blob/gh-pages/simple/demo.html">view source code on Github</a>


Notice that the text box can be resized by dragging the lower
right corner of the text box.

The [Verovio Humdrum Viewer](http://verovio.humdrum.org) has more
features, but you can use this example as a starting point for
building your own editor. This basic editor is also useful for
entering simple monophonic music, which can then be saved to a file
by copying and pasting it from the text box.  To implement this
example, copy and paste the following text into an HTML file:

```html
<html>
<head>
<title>Mini-editor</title>
<script src="http://verovio-script.humdrum.org/scripts/verovio-toolkit.js"></script>
</head>
<body>

<table>
<tr>
<td>
<textarea id="input">
**kern
*clefG2
*M4/4
=1-
1c;
==
*-
</textarea>
</td>
<td>
<div id="output"></div>
</td>
</tr>
</table>

<script>
   var vrvToolkit = new verovio.toolkit();
   var Input = document.querySelector("#input");
   var Output = document.querySelector("#output");
   Input.addEventListener("keyup", displayNotation);
   document.addEventListener("DOMContentLoaded", displayNotation);

   function displayNotation() {
      var data = Input.value;
      var options = {
         inputFormat: "auto",
         adjustPageHeight: 1,
         pageHeight: 60000,
         pageWidth:  2500,
         scale:  40,    
         font: "Leipzig"
      };        

      var svg = vrvToolkit.renderData(data, JSON.stringify(options));
      Output.innerHTML = svg;
   }    
</script>

<style>
textarea { width: 100px; height: 150px; }
td { vertical-align: baseline; }
</style>

</body>
</html>
```

### Commentary


#### Loading and initializing the verovio toolkit

Line 4 loads the verovio toolkit JavaScript program:

```javascript
<script src="http://verovio-script.humdrum.org/scripts/verovio-toolkit.js"></script>
```

In this case the script is loaded from `http://verovio-script.humdrum.org`, 
where the most recent version of the humdrum-aware verovio script will be 
hosted.  Alternative you can download that copy and store on your website, 
or compile directly from the [verovio source](https://github.com/rism-ch/verovio) (currently you have to compile from the `develop-humdrum` branch).

Next, on line 28 the verovio toolkit interface is initialized and stored in 
the `vrvToolkit` variable:

```javascript
   var vrvToolkit = new verovio.toolkit();
```

<div style="height:30px;"></div>


#### Humdrum data

The Humdrum file is stored on lines 11&ndash;19 in a textarea element
having the ID `input`:

```javascript
<textarea id="input">
**kern
*clefG2
*M4/4
=1-
1c;
==
*-
</textarea>
```

Unlike the [simple](../simple) example, this one displays the Humdrum
data on the page along with the graphical notation.

The ID for the script could be any text, as long as the ID
matches the ID on line 31:

```javascript
	var Input = document.querySelector("#input");
```

In this case the Humdrum data is hidden since it is stored
in a `<script>` element, but any element, such as a `div` could
be used to store the Humdrum data visibly on the page.

The Humdrum file contents is extracted from the page on line 36:

```javascript
	var data = Input.textContent.replace(/^\s+/, "");
```

In this case the `replace()` function filters out any spaces or
newlines at the start of the data.  This is needed since the linebreak
after the opening element is included in the text content (empty
lines are technically not allowed in Humdrum file content).
Alternatively the first line of the Humdrum file content could be
placed on the same line as the opening tag of the script element.
The initial the newline can be included harmlessly in the Humdrum
content if you set the option `inputFormat: "humdrum"`.



#### Options

Options for the verovio toolkit can be found on the page
http://www.verovio.org/command-line.xhtml.  These options are for
the command line, so when using in JSON data for the JavaScript
version of the verovio toolkit, change spaces into capitalization.
For example `--page-height` becomes `pageHeight`.

The `adjustPageHeight` option can be used to keep all music in a single 
image by setting the `pageHeight` to a very large value.  If 
`adjustPageHeight` is enabled, verovio will shrink the SVG image to
remove blank space at the bottom of the page.  Set `adjustPageHeight`
to `0` or do not explicitly set the option if you want to have a 
fixed-height page.  For this example, the `adjustPageHeight` is needed
because the `pageHeight` is set to `60000`, which is about equivalent 
to 20 printed pages.  If `adjustPageHeight` were not set to `1`, then
the SVG image would be very long.  Using a large `pageHeight` like this,
and then also using `adjustPageHeight` allows for all of the musical
notation to be displayed on a single page in a single SVG image.



#### Dynamic graphical notation

Line 31 is important to allow the webpage to dynamically show the 
Humdrum data as it changes:

```javascript
   Input.addEventListener("keyup", displayNotation);
```

This line sets up the element reference in the `Input` variable to
call the `displayNotation()` function every time a character is
typed in the text box.  When a key is released, this function 
is called go regenerate a new SVG image of the graphical notation.


#### Generating the SVG image

Line 46 contains the code that converts the Humdrum data into an
SVG image:

```javascript
      var svg = vrvToolkit.renderData(data, JSON.stringify(options));
```

The `vrvToolkit.renderData()` function takes two parameters: (1)
the musical data, and (2) a JSON string containing the options, and 
then outputs an SVG image.  The image is then placed on the webpage at 
line 47:

```javascript
		Output.innerHTML = svg;
```

<div style="height:100px;"></div>


