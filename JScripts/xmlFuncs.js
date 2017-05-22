function xmlToHTML() {
	// Parse the xml file
	xmlParserFunc(0, function (xml) {
		// Loop through each <SECTION> in XML file
		$(xml).find("SECTION").each(function () {
			// Create an empty string to hold all information that needs to be appended as to stop jquery from closing tags prematurely
			var txt = '';
			// Add initial outer tags & <SECTIONTITLE>
			txt += '<section id="Erhvers">\
					<h1>' + $(this).find("SECTIONTITLE").text() + '</h1><div class="container">';

			// Loop through each <BOX> within the Section
			$(this).find("BOX").each(function (i, e) {
				// Add each <BOX>'s image dir & <TITLE>
				txt += '<div class="box">\
						<img onclick="openModal( \'' + $(this).find("ID").text() + '\' );" src="img/' + $(this).find("ID").text() + '/logo_' + $(this).find("ID").text() + '.png">\
						<h3>' + $(this).find("TITLE").text() + '</h3></div>';
			});

			// Add closing outer tags
			txt += '</div></section>';

			// Append to the page
			$("#insertHere").append(txt);
			$("#Erhvers").fadeIn(2000);

		});
	});
}

function xmlParserFunc(xmlUrl, callback) {
	// If xmlUrl is Undefined or Null set it to default value
	if (!xmlUrl) {
		xmlUrl = "information.xml";
	// If xmlUrl is equal to 0 set it to default value
	} else if (xmlUrl === 0) {
		xmlUrl = "information.xml";
	}

	// Parse the xml file
	$.ajax({
		type: "GET",
		url: xmlUrl,
		dataType: "xml",
		success: function (xml) {
			// calback the parsed xml object
			callback(xml);
		}
	});
}
