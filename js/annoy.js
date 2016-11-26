var TIME_COUNT = 0;
var onetimePromptTime = 5;
var outboundPromptTime = 20;
var randomClickTime = 30;
var scrollInterval = 13;
var refreshInterval = 60;
var colourTime = 0;
var hingeTime = 10;

var colourChance = 10;
var hingeChance = 2;

var alertFlag = false;

var images = [];


function doUpdate() {
	// One-time prompt at 10s
	if (TIME_COUNT === 1000 * onetimePromptTime) {
		alert("You should probably stop procrastinating :^)");
	}
	
	// scroll to the top of the page every 45s
	if ((TIME_COUNT / 1000) % scrollInterval === 0) {
		window.scrollTo(0, 0);
	}
	
	// completely refresh the page after 60s
	if (TIME_COUNT >= 1000 * refreshInterval) {
		alert("Time's up, let's do this!");
		location.reload();
	}
	
	if ((TIME_COUNT / 1000) % 3 === 0) {
		var randnum = Math.floor(Math.random() * images.size);
		
	}
}

function randomHexColour() {
	var letters = '0123456789ABCDEF';
	var colour = '#';
	for (i = 0; i < 6; i++) {
		colour += letters[Math.floor(Math.random() * 16)];
	}
	
	return colour;
}

function randomLinkClick() {
   var links = $('a');
   var randomNum = Math.floor(Math.random()*links.length)  
   links.get(randomNum).click();
} 

function performHinge(elem, chance) {
	if (TIME_COUNT < 1000 * hingeTime) return false;
	
	var result = false;
	var rand = Math.floor(Math.random() * 100);
	if (rand >= chance) {
		return false;
	} else {
		$(elem).addClass("animated hinge");
	}
	
	
	return false;
}

$(document).ready(function(event) {
	// load images
	images = document.images;
    document.body.style.fontFamily = "ComicSansMS,cursive,sans-serif";
});

$("a").mouseover(function() {
	performHinge(this, hingeChance);
	
	if (TIME_COUNT >= 1000 * colourTime) {
		$(this).css("color", randomHexColour());
	}
	
});

$("a").click(function () {	
	if (TIME_COUNT >= outboundPromptTime * 1000 && !alertFlag) {
		alertFlag = !alertFlag;
		var response = confirm("Press Cancel");
		if (response) {
			performHinge(this, 100);
			return false;
		} else {
			if (TIME_COUNT >= randomClickTime * 1000) {
				performHinge(this, 100);
				randomLinkClick();
				return false;
			}
		}
	} else {
		alertFlag = !alertFlag;
	}
}); 

$("p").mouseover(function() {
	performHinge(this, hingeChance);
});

$("img").mouseover(function () {
	performHinge(this, hingeChance);
});


$("img").click(function () {
	if (TIME_COUNT >= outboundPromptTime * 1000) {
		var response = confirm("Press Cancel");
		if (response) {
			return false;
		} else {
			
		}
	}
});

function debugOut() {

}


// 1 second timer
setInterval( function () {
	TIME_COUNT += 1000;
	doUpdate();
	debugOut();
		
}, 1000);


