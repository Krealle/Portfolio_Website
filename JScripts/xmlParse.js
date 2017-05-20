function xmlParser() {
	// Parse the xml file
	$.ajax({
		type: "GET",
		url: "information.xml",
		dataType: "xml",
		success: function (xml) {
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
							<img onclick="openModal( \'' + $(this).find("TITLE").text() + '\' );" src="img/logo_' + $(this).find("TITLE").text() + '.png">\
							<h3>' + $(this).find("TITLE").text() + '</h3></div>';
				});

				// Add closing outer tags
				txt += '</div></section>';

				// Append to the page
				$("#insertHere").append(txt);
				$("#Erhvers").fadeIn(2000);

			});
		}
	});
}
