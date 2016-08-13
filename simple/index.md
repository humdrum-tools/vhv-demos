---
layout: default
title: single static image
---

This example is the simplest setup for displaying Humdrum
files: a single static images created dynamically from a Humdrum
file embedded inside of the webpage.

<iframe width="350" height="250" src="demo.html"></iframe>
* <a href="demo.html">view stand-alone demo page</a>
* <a href="https://github.com/humdrum-tools/vhv-demos/blob/gh-pages/simple/demo.html">view source code on Github</a>

To implement this example, copy and paste the following HTML text into 
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

The Humdrum file is stored in a script element having the ID `input`. The ID
could be any text, as long as the ID matches the following line:

```javascript
example line
```


This content is extracted from the page with the line:

```javascript
   var data = Input.textContent.replace(/^\s+/, "");
```

In this case the `replace()` function filters out any spaces (and
particularly newlines) at the start of the data.  This is needed
since the linebreak after the opening element is included in the
text content.  Alternatively the first line of the Humdrum file
content could be placed on the same line as the opening tag of the
script element.   The initial the newline will be ignored, but
included harmlessly in the Humdrum content if you set the option
`inputFormat: "humdrum"`.

#### Options

Options for the verovio toolkit can be found on the page
http://www.verovio.org/command-line.xhtml.  These options are for
the command line, so when using in JSON data for the JavaScript
version of the verovio toolkit, change spaces into capitalization.
For example `--page-height` becomes `pageHeight`.






