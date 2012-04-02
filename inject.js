/*

This is the content script. 

*/

console.log("injection completed");

// inject listen.js into current webpage
var s = document.createElement('script');
s.src = chrome.extension.getURL("listen.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

// retrieve current video information from this page
var currentVideo = document.getElementById('movie_player');
var currentTitle = document.getElementById('eow-title').getAttribute('title');
var currentDate = document.getElementById('eow-date').innerHTML;
var currentUrl = window.location.href;



// Send request for currentTitle, current Url and CurrentDate
chrome.extension.sendRequest({
  "greeting": "hello",
  "currentTitle": currentTitle,
  "currentUrl": currentUrl,
  "currentDate": currentDate
});


// Go check listen.js and listen to what ever youtube is telling
document.addEventListener('build', function(e){  
  var status = e.target.value; 
  chrome.extension.sendRequest({"afgelopen": "afgelopen","status":status});
}, false);

// Listen for video controls to be pushed.
chrome.extension.onRequest.addListener(function(hi, sender, sendResponse) {
  if(hi.action == "play"){        // if counter is 1, play current video
    currentVideo.playVideo();
  }
  else if(hi.action == "pause"){   // if counter is 2, pause current video
	 currentVideo.pauseVideo();
  }    
  else
    sendResponse({});         // close request
});





  

