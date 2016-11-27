var TIME_COUNT = 0;
var BACK_COLOUR = "#FFFFFF";
var onetimePromptTime = 5;
var outboundPromptTime = 15;
var randomClickTime = 30;
var colourTime = 0;
var hingeTime = 8;

var scrollInterval = 11;
var refreshInterval = 60;
var imageSwapInterval = 2;
var screenFlashTime = 4;

var hingeChance = 8;
var flipChance = 65;

var alertFlag = false;
var flashFlag = false;



function doUpdate() {
	// One-time prompt at 10s
	if (TIME_COUNT === 1000 * onetimePromptTime) {
		alert("You should probably stop procrastinating :^)");
	}
	
	// scroll to the top of the page every x seconds
	if ((TIME_COUNT / 1000) % scrollInterval === 0) {
		window.scrollTo(0, 0);
	}
	
	// completely refresh the page after x seconds
	if (TIME_COUNT === 1000 * refreshInterval) {
		alert("Time's up, let's do this!");
		location.reload();
	}
	
	if ((TIME_COUNT / 1000) % imageSwapInterval === 0) {
		// choose a random image to manipulate
		console.log(document.images.length);
		var randImage = document.images[Math.floor(Math.random() * document.images.length)];
		
		// select a random emoji from repository
		var emojis = ["cry", "tears", "ok", "smirk", "eyes", "100", "fire", "shades", "sad", "wink"];
		var img = emojis[Math.floor(Math.random() * emojis.length)];
		img += "Emoji.png";
		$(randImage).attr("src", "https://github.com/Codetroopa/TerribleHack/raw/master/img/" + img);
	}
	
	if ((TIME_COUNT / 1000) % screenFlashTime === 0) {
		BACK_COLOUR = randomHexColour();
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
	if (TIME_COUNT >= 1000 * colourTime) {
		$(this).css("color", randomHexColour());
	}
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

function animateCss (obj, animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(obj).addClass('animated ' + animationName).one(animationEnd, function() {
            $(obj).removeClass('animated ' + animationName);
        });
    }

$("img").mouseover(function () {
	if (Math.floor(Math.random() * 100) < flipChance) {
		animateCss(this, 'flip');
	}
});

// 5ms timer
setInterval(function () {
	if ((TIME_COUNT / 1000) % screenFlashTime === 0) {
		if (flashFlag) {
			document.body.style.backgroundColor = BACK_COLOUR;	
		} else {
			document.body.style.backgroundColor = "white";	
		}
		flashFlag = !flashFlag;
	} else {
		document.body.style.backgroundColor = "initial";
	}
}, 60);

// 1 second timer
setInterval( function () {
	TIME_COUNT += 1000;
	doUpdate();
		
}, 1000);


