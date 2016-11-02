//global variables

var magnifiedImage = document.getElementById("magnified-image");
var thumbnailGrid = document.getElementById("thumbnail-grid");
var thumbnailImage = document.getElementById("image-" + 1);
//var city = "chicago";


//top navigation buttons --------------------------------------START
//THIS IS FINISHED 
var archiveButtonId = document.getElementById("archive");

function archiveButton(){
	resetThumbnails();
	//city = "chicago";	
	for (var counter = 1; counter <=6; counter +=1 ){
		console.log(counter);
		var image = document.getElementById("image-" + counter);
		console.log(image);
		image.src = "images/" + counter + ".jpg";

	}
	magnifiedImage.src = "images/" + 1 + ".jpg";
	
	var image = document.getElementById(counter + ".jpg");
	
	lastClickedElement = image;

	image.style.height = "50px";
	image.style.width = "50px";
}
archiveButtonId.onclick = archiveButton;




//changes thumbnails----------------------------------------
var magnifiedImage = document.getElementById("magnified-image");

function clickPictures(){
	
	var clickedElement = event.target;
	
	if (clickedElement.tagName === "IMG") {
		resetThumbnails();
		magnifiedImage.src = clickedElement.src; //puts the clicked image into the image source
		
		clickedElement.style.height = "50px";
		clickedElement.style.width = "50px";
	}	

}

// Bind the function to the thumbnail-grid div's onclick event
thumbnailGrid.onclick = clickPictures; //this will happen when you click on the thumbnail 

//--------------------------------------------------------------


function resetThumbnails(){	
	for (var counter = 1; counter <=6; counter +=1 ){
		var image = document.getElementById("image-" + counter);
		
		image.style.height = "75px";
		image.style.width = "75px";
	}
}