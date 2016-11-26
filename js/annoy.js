var TIME_COUNT = 0;
var onetimePromptTime = 10;
var outboundPromptTime = 15;
var randomClickTime = 30;
var hingeTime = 0;


function doUpdate() {
	
	// One-time prompt at 10s
	if (TIME_COUNT === 1000 * onetimePromptTime) {
		alert("You should probably stop procrastinating :^)");
	}
}

function randomLinkClick() {
   var links = $('a');
   var randomNum = Math.floor(Math.random()*links.length)  
   links.get(randomNum).click();
} 

$("a").mouseover(function() {
	$("a").addClass("animate.animated.hinge");
});

$("a").click(function () {	
	if (TIME_COUNT >= outboundPromptTime * 1000) {
		var response = confirm("Press Cancel");
		if (response) {
			return false;
		} else {
			if (TIME_COUNT >= randomClickTime * 1000) 
				randomLinkClick();
			return false;
		}
	}
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
	if (TIME_COUNT === onetimePromptTime * 1000) {
		console.log("Alert dialogue should be prompted NOW");
	}
	if (TIME_COUNT === outboundPromptTime * 1000) {
		console.log("Yes/Cancel dialogue should be enabled NOW");
	}
	if (TIME_COUNT === randomClickTime * 1000) {
		console.log("Cancelling dialogue should redirect to random link NOW");
	}
}


// 1 second timer
setInterval( function () {
	TIME_COUNT += 1000;
	doUpdate();
	debugOut();
		
}, 1000);


