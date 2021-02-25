/*function init(){
    gapi.client.setApiKey("AIzaSyA4doBzIwbcqZLK8y54cB9mjV8gPafDiXQ");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
}

function research(){
    var text = document.getElementById("bar").value;
    return gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: text.replace(/%20/g, "+"),
        maxResults: 10,
        order: "viewCount"
    }).then(function(response){
        var results = response;
        console.log(results);
    });
}*/ 
var key = openFile("file:///"+__dirname + "/TOKEN.txt");
function research() {
    var xhr = new XMLHttpRequest();
    var text = document.getElementById("bar").value;
    var query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&key=" + key +"&q=" + text.replace(/%20/g, "+");
    xhr.open("GET", query, false);
    xhr.send(null);
    var res = JSON.parse(xhr.responseText);
    return res;
}

function main() {
    
    var div = document.getElementById("results");
    if(div.innerHTML != null) div.innerHTML = null;
    var results = research();
    for (item of results.items) {
        var p = document.createElement("p");
        var text = document.createTextNode(item.snippet.title);
        p.setAttribute("id", item.id.videoId);
        p.appendChild(text);
        var playButton = document.createElement("input");
        playButton.setAttribute("type", "image");
        playButton.setAttribute("src", "img/plusButton.png");
        playButton.setAttribute("alt", "play");
        playButton.setAttribute("class", "button");
        playButton.setAttribute("id", "pause");
        playButton.setAttribute("onclick", "javascript:add(this)");
        p.appendChild(playButton);
        div.appendChild(p);
    }
}
var cuePlayList = [];
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        height: '400',
        width: '300',
        videoId: null,
        playerVars: {
            autoplay: 0,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

/*function play(selected) {
    var allButtons = selected.parentNode.parentNode.childNodes;
    for (let i = 1; i < allButtons.length; i++) {
        var currentButton = allButtons[i].firstElementChild;
        if (currentButton.id == "play") {
            pause(currentButton);
            videoTime = 0;
        }
    }
    selected.setAttribute("src", "img/pauseButton.png");
    selected.setAttribute("onclick", "javascript:pause(this)");
    selected.setAttribute("alt", "pause");
    selected.setAttribute("id", "play");
    var theVideoId = selected.parentNode.id;
    //player.src = "https://www.youtube.com/embed/"+ theVideoId + "?autoplay=1&loop=1&enablejsapi=1&widgetid=1";
    var dom = player.getIframe();
    dom.src = "https://www.youtube.com/embed/"+ theVideoId + "?autoplay=1&loop=1&enablejsapi=1&widgetid=1";
    player.setVolume(100);
    if(player.getPlayerState() == 1 ||player.getPlayerState() == 3){
        player.playVideo();
    } else pause(selected);
    //player.seekTo(videoTime, false);
    
}*/


/*
function pause(selected) {
    selected.setAttribute("src", "img/playButton.png");
    selected.setAttribute("onclick", "javascript:play(this)");
    selected.setAttribute("alt", "play");
    selected.setAttribute("id", "pause");
    videoTime = player.getCurrentTime();
    
    player.pauseVideo();
    
}*/

function add(selected){
    var theVideoId = selected.parentNode.id;
    var i = 0;
    while(cuePlayList[i] != null) i++;
    cuePlayList[i] = theVideoId
    player.cuePlaylist({ playlist : cuePlayList});
    console.log(cuePlayList);
    if(player.getPlayerState() != 1) toggleAudio();
}

function onPlayerReady(event) {
    event.target.setPlaybackQuality("small");
    event.target.setVolume(100);
    togglePlayButton(player.getPlayerState() !== 5);
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        togglePlayButton(false); 
    }
}

function toggleAudio(){
    if(player.getPlayerState() == 1 ||player.getPlayerState() == 3){
     player.pauseVideo();
     togglePlayButton(false);
    }
    else {
        player.playVideo();
        togglePlayButton(true);
    }
}

function togglePlayButton(play){
    document.getElementById("playButton").src = play ? "img/pauseButton.png" : "img/playButton.png";
}

function emptyCue(){
    if (cuePlayList != []){
        cuePlayList = [];
        console.log("cue is now empty");
    }
    
}


function openFile(file){
    var rawFile = new XMLHttpRequest();
    var text;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState == 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                text =  rawFile.responseText;
                
            }
        }
    }
    rawFile.send(null);
    return text;
}