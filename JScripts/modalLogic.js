// Get the elements we need to be able to manipulate/interact with.
// Get the Modal element
var modal = document.getElementById('myModal');
// Get the <span> element that closes the Modal (The "X" in the corner)
var span = document.getElementsByClassName("close")[0];
// Get the header, body, footer, and image element
var modal_header = document.getElementById('modal_header');
var modal_body = document.getElementById('modal_body');
var modal_footer = document.getElementById('modal_footer');
var modal_img = document.getElementById('modal_image');
// Create array for all relevent images - Needs to be global so up here.
var imgArray = [];
var curImg;
var curBox;

// Functions
function openModal(boxPressed) {
	// Display the Modal
	modal.style.display = "block";
	curBox = boxPressed;

	// Set the dir to look for images
	var folder = "../img/" + boxPressed + "/";
	var i = 0;
	curImg = 0;
	// Clear the array on each Modal load

	// Gather all the images in the dir
	getImgArray(folder, function (imgArrayCallback) {
		imgArray = imgArrayCallback;
		// Change the image
		modal_img.src = imgArray[curImg];
	});

	// Call the updateModal Function
	updateModal(boxPressed);
}

function modalImageChange(whichWay) {
	// Set the dir to look for images
	var folder = "../img/" + curBox + "/";
	// Get the array from callback function
	getImgArray(folder, function (imgArrayCallback) {
		if (whichWay == 0) {
				imgArray = imgArrayCallback;
				// Move backwards in the array - if curImg goes below 0 rollback to last image in array
				curImg--;
				if (curImg < 0) {curImg = imgArray.length - 1;}
				// Change the image
				modal_img.src = imgArray[curImg];
		} else if (whichWay == 1) {

				imgArray = imgArrayCallback;
				// Move forwards in the array - if curImg goes above array length rollback to first image in array
				curImg++;
				if (curImg > imgArray.length - 1) {curImg = 0;}
				// Change the image
				// TODO: Animate it
				modal_img.src = imgArray[curImg];

		} else {
			alert("Error 01 - No direction given.");
		}
	});
}

function updateModal(boxPressed) {
	xmlParserFunc(0, function (xml) {
		var $modal_header = $(xml).find('BOX[id="' + boxPressed + '"]').find("TITLE").text() + " - " + $(xml).find('BOX[id="' + boxPressed + '"]').find("HEADER").text();
		var $modal_body = $(xml).find('BOX[id="' + boxPressed + '"]').find("BODYTXT").text();
		var $modal_footer = $(xml).find('BOX[id="' + boxPressed + '"]').find("FOOTER").text();

		// Change the content of the Modal
		modal_header.innerHTML = $modal_header;
		modal_body.innerHTML = $modal_body;
		modal_footer.innerHTML = $modal_footer;
	});

}

function getImgArray(folder, callback) {
	$.ajax({
		url: folder,
		success: function (data) {
			var tempImgArray = [];
			$(data).find("a").attr("href", function (i, val) {
				if (val.match(/\.(jpe?g|png|gif)$/)) {
					// Add each img full dir to the array
					tempImgArray[i] = val;
					i++;
				}
			});
			// Remove undefined values from the array
			tempImgArray = tempImgArray.filter(function (element) {
				return element !== undefined;
			});
			callback(tempImgArray);
		}
	});
}

function closeModal() {
	// Close the Modal
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the Modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		closeModal();
	}
}

// When the user clicks on the "X" close the Modal
span.onclick = function () {
	closeModal();
}
