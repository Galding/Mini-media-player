
var results = null;
function main() {
    
    var div = document.getElementById("results");
    if(div.innerHTML != null) div.innerHTML = null;
    results = research();
    console.log(results);
    for (item of results.items) {
        var p = document.createElement("p");
        p.setAttribute("id", item.id.videoId);

        var thumbnails = document.createElement("img");
        thumbnails.setAttribute("class", "thumbnails");
        thumbnails.setAttribute("src", item.snippet.thumbnails.default.url);
        p.appendChild(thumbnails);

        var text = document.createTextNode(item.snippet.title);
        p.appendChild(text);

        var addButton = document.createElement("input");
        addButton.setAttribute("type", "image");
        addButton.setAttribute("src", "img/plusButton.png");
        addButton.setAttribute("alt", "play");
        addButton.setAttribute("class", "button");
        addButton.setAttribute("id", "pause");
        addButton.setAttribute("onclick", "javascript:add(this)");
        p.appendChild(addButton);
        div.appendChild(p);
    }
}
var cueList = [];
var player;
var cueListIndex = 0;
var currentVideoTime = 0;


function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        height: '0',
        width: '0',
        videoId: null,
        playerVars: {
            autoplay: 1,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function add(selected){
    var theVideoId = selected.parentNode.id;
    cueList.push(theVideoId);
    //if(player.getPlayerState() != 1) toggleAudio();
}

var timeUpdater = null;
var bar = null;
var percent = 0;
function onPlayerReady(event) {
    event.target.setPlaybackQuality("small");
    event.target.setVolume(100);
    toggleaddButton(player.getPlayerState() !== 5);

    function updateTime(){
        var oldTime = currentVideoTime;
        if(player && player.getCurrentTime()){
            currentVideoTime = player.getCurrentTime()
        }
        if(currentVideoTime !== oldTime){
            onProgress(currentVideoTime);
        }
    }
    timeUpdater = setInterval(updateTime, 100);
}

function onPlayerStateChange(event) {
    if (event.data === 0) {
        toggleaddButton(false); 
    }
}

function toggleAudio(){

    if(cueList.length != 0){
        if(player.getPlayerState() == 1 ||player.getPlayerState() == 3){
        player.pauseVideo();
        cueListIndex = player.getPlaylistIndex();
        currentVideoTime = player.getCurrentTime();
        toggleaddButton(false);
        }
        else {
            player.loadPlaylist({ playlist : cueList, index : cueListIndex, startSeconds : currentVideoTime, suggestedQuality : "small"});
            player.playVideo();
            toggleaddButton(true);
        }
    }
}

function onProgress(currentTime){
    bar = document.querySelector('#progress-bar div');
    percent = Math.floor((100/ player.getDuration()) * currentTime);
    bar.style.width = percent + "%";    
}


function toggleaddButton(play){
    document.getElementById("playButton").src = play ? "img/pauseButton.png" : "img/playButton.png";
}

function emptyCue(){
    if (cueList != []){
        cueList = [];
        cueListIndex = 0;
        currentVideoTime = 0;
        console.log("cue is now empty");
        cueList.push(getCurrentVideoPlayed());
    }
}

function getCurrentVideoPlayed(){
    var video = player.getVideoUrl();
    var videoId = video.match(/([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/);
    return videoId[0];
}