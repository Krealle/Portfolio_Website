// Variables

// Get the elements we need to be able to manipulate/interact with.
// Get the Modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the Modal
var span = document.getElementsByClassName("close")[0];
// Get the header, body, footer, and image
var modal_header = document.getElementById('modal_header');
var modal_body = document.getElementById('modal_body');
var modal_footer = document.getElementById('modal_footer');
var modal_img = document.getElementById('modal_image');

// Functions

function openModal(boxPressed) {
	// Display the Modal
	modal.style.display = "block";
	/* 	Pull information to display from folder with text file/image(s)
	 	File structure ../boxPressed/xxx.txt ../boxPressed/xxx.png
	 	xxx.txt structure:
		first line: header
		second line: footer
		remaning: body
	*/

	// Change the image
	modal_img.src="../img/logo_"+boxPressed+".png"
	console.log(boxPressed);
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
