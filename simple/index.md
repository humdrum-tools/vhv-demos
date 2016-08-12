---
layout: default
title: VHV demo&colon; single static image
---

# Single static image

This is the simplest configuration for displaying Humdrum files: a
single static images created from a single Humdrum file embedded
inside of the webpage.


<iframe width="400" height="300" src="demo.html"></iframe>


To implement this page, copy and paste the following text into an HTML file,
and then vew the page in a web browser.


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
        var Page = 1;
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






