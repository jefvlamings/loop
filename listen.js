/*

This is the injected script.
You inject this script because the content script runs in an isolated environment. 
You can only listen to Youtube's player events if you inject this. 

*/ 

console.log("listener completed");

// create the event  
var evt = document.createEvent('Event');  
evt.initEvent('build', true, true);  
var d = document.createElement("textarea"); // only elements can be send, to pass variables just insert a textarea with a certain value and pass it on

// get video element of youtube
// listen for the state of the video to be changed

function onYouTubePlayerReady(playerId) {
    var currentVideo = document.getElementById("movie_player");
    currentVideo.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange() {
    currentState = document.getElementById("movie_player").getPlayerState();
    if(currentState===0){             //if video ended -> send object to content script
        console.log("ENDED");
        d.value = "ENDED";
        document.body.appendChild(d); // add textarea to the DOM of the current webpage
        d.dispatchEvent(evt);         // dispatch textarea to content script
    }
    else if(currentState===2){
        console.log("PAUSED");
        d.value = "PAUSED";
        document.body.appendChild(d); // add textarea to the DOM of the current webpage
        d.dispatchEvent(evt);         // dispatch textarea to content script

    }  
    else{
        console.log("PLAYING");
        d.value = "PLAYING";
        document.body.appendChild(d); // add textarea to the DOM of the current webpage
        d.dispatchEvent(evt);         // dispatch textarea to content script

    }   
};







