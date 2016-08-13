//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Aug 13 13:46:54 CEST 2016
// Last Modified: Sat Aug 13 13:46:57 CEST 2016
// Filename:      scripts/main-common.js
// Syntax:        JavaScript 1.8.5/ECMAScript 5.1
// vim:           ts=3 hlsearch
//
// Description:   Shared functions for all pages on the VHV Demos website.
//


//////////////////////////////
//
// generateCodeSpaces --
//

function generateCodeSpaces() {
	var prec = document.querySelectorAll("pre");
	var line;
	var precx
	var newcolumn;
	for (var i=0; i<prec.length; i++) {
   	var code = prec[i].querySelector("code");

		var content = code.textContent;

		// content = content.replace(/^\s{56}/gm, "\t\t\t\t\t\t\t");
		// content = content.replace(/^\s{48}/gm, "\t\t\t\t\t\t");
		// content = content.replace(/^\s{40}/gm, "\t\t\t\t\t");
		// content = content.replace(/^\s{32}/gm, "\t\t\t\t");
		// content = content.replace(/^\s{24}/gm, "\t\t\t");
		// content = content.replace(/^\s{16}/gm, "\t\t");
		// content = content.replace(/^\s{8}/gm,  "\t");

		content = content.replace(/^\t\t\t\t\t\t\t/gm, "                     ");
		content = content.replace(/^\t\t\t\t\t\t/gm, "                  ");
		content = content.replace(/^\t\t\t\t\t/gm, "               ");
		content = content.replace(/^\t\t\t\t/gm, "            ");
		content = content.replace(/^\t\t\t/gm, "         ");
		content = content.replace(/^\t\t/gm, "      ");
		content = content.replace(/^\t/gm, "   ");

		// Have to remove the following condition because 
		// github jekyll removed the class tags from code elements.
		// if ((!code) || (!code.className) || code.className.match(/^\s*$/)) {
		//		continue;
		//	}

		code.textContent = content;

		var splitcontent = content.split(/[\r\n]/g);
		if (splitcontent.length > 20) {
			newcolumn = "";
			content = "";
			line = 1;
			for (var j=0; j<splitcontent.length - 1; j++) {
				newcolumn += '<span class="line-number-position">&#x200b;<span class="line-number">' 
								+ line++ + '</span></span><br>\n';
			}
			prectext = prec[i].outerHTML;
			console.log("PRECTEXT", prectext);
			var newtext = "<table class='code'><tr><td class='numbers'>" + newcolumn + "</td><td class='code'>" 
					+ prectext + "</td></tr></table>";
			prec[i].outerHTML = newtext;
		}
	}
}



