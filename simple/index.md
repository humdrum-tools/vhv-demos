---
layout: default
title:  single in-browser generated image
github: https://github.com/humdrum-tools/vhv-demos/blob/gh-pages/simple/demo.html
---

This example shows the simplest method for displaying Humdrum
files as musical notation generated within the web browser.
Only a single image is generated on the page from a single
Humdrum file embedded within the webpage.

<iframe width="350" height="250" src="demo.html"></iframe>
* <a href="demo.html">view stand-alone demo page</a>
* <a href="https://github.com/humdrum-tools/vhv-demos/blob/gh-pages/simple/demo.html">view source code on Github</a>


Of course, this is not a very efficient implementation, since the
verovio toolkit at about 1 MB in transfer size has to be first
downloaded to the webpage before the notation can be generation.
To implement this example, copy and paste the following text into
an HTML file, and then view the page in a web browser.


```html
<html>
<head>
<title>SimpleViewer</title>
<script src="http://verovio-script.humdrum.org/scripts/verovio-toolkit.js"></script>
</head>
<body>

Here is a short musical example:

<script id="input" type="text/humdrum"> 
**kern	**kern
*clefF4	*clefG2
*k[f#]	*k[f#]
*M4/4	*M4/4
=-	=-
8GL	8ddL
8AJ	8ccJ
16BLL	2.b;
16A	.
16G	.
16F#JJ	.
2G;	.
==	==
*-	*-
</script>

<div id="output"></div>

<script>
	var vrvToolkit = new verovio.toolkit();
	var Input = document.querySelector("#input");
	var Output = document.querySelector("#output");
	document.addEventListener("DOMContentLoaded", displayNotation);

	function displayNotation() {
		var data = Input.textContent.replace(/^\s+/, "");
		var options = {
			inputFormat: "auto",
			adjustPageHeight: 1,
			pageHeight: 1000,
			pageWidth:  1000,
			scale:  40,
			font: "Leipzig"
		};

		var svg = vrvToolkit.renderData(data, JSON.stringify(options));
		Output.innerHTML = svg;
	}
</script>

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

Next, on line 30 the verovio toolkit interface is initialized and stored in 
the `vrvToolkit` variable:

```javascript
   var vrvToolkit = new verovio.toolkit();
```

<div style="height:30px;"></div>

#### Humdrum data

The Humdrum file is stored on lines 10&ndash;25 in a script element
having the ID `input`:

```javascript
<script id="input" type="text/humdrum"> 
**kern	**kern
*clefF4	*clefG2
*k[f#]	*k[f#]
*M4/4	*M4/4
=-	=-
8GL	8ddL
8AJ	8ccJ
16BLL	2.b;
16A	.
16G	.
16F#JJ	.
2G;	.
==	==
*-	*-
</script>
```

The ID for the script could be any text, as long as the ID
matches the ID on line 31:

```javascript
	var Input = document.querySelector("#input");
```

In this case the Humdurm data is hidden since it is stored
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

The `adjustPageHeight` can be used to keep all music in a single 
image by setting the `pageHeight` to a very large value.  If 
`adjustPageHeight` is enabled, verovio will shrink the SVG image to
remove blank space at the bottom of the page.  Set `adjustPageHeight`
to `0` or do not explicitly set the option if you want to have a 
fixed-height page.

The [verovio](http://www.verovio.org) typesetting engine contains 
three possible fonts to choose from: `Leipzig`, `Bravura` and `Granville`.

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





