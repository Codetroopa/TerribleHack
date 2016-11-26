var TIME_COUNT = 0
var onetimePrompt = 10;
var outboundPrompt = 15;

function doUpdate() {
	
	// One-time prompt at 15s
	if (TIME_COUNT === 1000 * onetimePrompt) {
		alert("You should probably stop procrastinating :^)");
	}
}

$("a").click(function () {
	if (TIME_COUNT >= outboundPrompt * 1000) {
		var response = confirm("Press Cancel");
		if (response) {
			return false;
		}
	}
}); 


$("img").click(function () {
	if (TIME_COUNT >= outboundPrompt * 1000) {
		var response = confirm("Press Cancel");
		if (response) {
			return false;
		} 
	}
});


// 1 second timer
setInterval( function () {
	TIME_COUNT += 1000;
	doUpdate();
		
}, 1000);


