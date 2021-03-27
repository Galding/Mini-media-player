/**
 * The user's research results.  
 * Null by default.
 */
var results = null;

/**
 * The main function to display the results of user's research.  
 * This function is call when the user make a research.
 */
function main() {
    var div = document.getElementById("results");
    if (div.innerHTML != null) div.innerHTML = null;
    results = research();
    for (item of results.items) {
        var p = document.createElement("p");
        p.setAttribute("id", item.id.videoId);
        p.setAttribute("class", "resultsClass");

        var thumbnails = document.createElement("img");
        thumbnails.setAttribute("class", "thumbnails");
        thumbnails.setAttribute("src", item.snippet.thumbnails.default.url);
        p.appendChild(thumbnails);

        var text = document.createTextNode(item.snippet.title);
        var p2 = document.createElement("p");
        p2.appendChild(text);
        p.appendChild(p2);

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

/**
 * User's play list.
 */
var cueList = [];

/**
 * The Youtube player.
 */
var player;

/**
 * The index of the current video in the cueList.
 */
var cueListIndex = 0;

/**
 * The current time elapsed since the video starts.
 */
var currentVideoTime = 0;

/**
 * Async function who initialise the Youtube player.
 */
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

/**
 * Add a video to the cueList.  
 * This function is call when the users click on the plus button.
 * @param {*} selected the button the user clicks.
 */
function add(selected) {
    var theVideoId = selected.parentNode.id;
    cueList.push(theVideoId);
    addToDisplay(selected, cueList.length - 1);
}

/**
 * Display the thumbnail and the title on the side play list.  
 * This function is called in the the add function.  
 * @param {*} selected the button the user clicks.
 * @param {int} videoIndex the index of the video in the cueList. 
 */
function addToDisplay(selected, videoIndex) {
    console.log(selected.parentNode);
    var list = document.getElementById("videos");
    var element = document.createElement("div");
    var child = selected.parentNode.firstChild.cloneNode(true);
    child.removeAttribute("class");
    child.setAttribute("width", "60%");
    child.setAttribute("height", "30%");

    var titleElement = document.createElement("p");
    var videoTitle = selected.parentNode.firstChild.nextSibling.cloneNode(true);
    titleElement.appendChild(videoTitle);
    titleElement.setAttribute("class", "textSmall");

    var hiddenId = document.createElement("input");
    hiddenId.setAttribute("type", "hidden");
    hiddenId.setAttribute("value", selected.parentNode.id);

    element.setAttribute("onclick", "javascript:goToVideo(" + videoIndex + ")");

    element.appendChild(child);
    element.appendChild(titleElement);
    element.appendChild(hiddenId);
    list.appendChild(element);

}

/**
 * Change the current played video to the gived one.
 * @param {int} videoIndex the index wanted.
 */
function goToVideo(videoIndex) {
    cueListIndex = videoIndex;
    currentVideoTime = 0;
    toggleAudio();
}

/**
 * The id of the timer interval.
 */
var timeUpdater = null;

/**
 * The time bar.
 */
var bar = null;

/**
 * The percent of the video time. 
 */
var percent = 0;
/**
 * Event function : when the Youtube player is ready it calls this function.
 * @param {*} event 
 */
function onPlayerReady(event) {
    event.target.setPlaybackQuality("small");
    event.target.setVolume(100);
    toggleaddButton(player.getPlayerState() !== 5);

    function updateTime() {
        var oldTime = currentVideoTime;
        if (player && player.getCurrentTime()) {
            currentVideoTime = player.getCurrentTime()
        }
        if (currentVideoTime !== oldTime) {
            onProgress(currentVideoTime);
        }
    }
    timeUpdater = setInterval(updateTime, 100);
}

/**
 * Display the progression of the video.
 * @param {int} currentTime the time elapsed since the video starts.
 */
function onProgress(currentTime) {
    bar = document.querySelector('#progress-bar div');
    percent = Math.floor((100 / player.getDuration()) * currentTime);
    bar.style.width = percent + "%";
}

/**
 * Event function : when the Youtube player change it calls this function.
 * @param {*} event 
 */
function onPlayerStateChange(event) {
    if (event.data === 0) {
        toggleaddButton(false);
    }
}

/**
 * If the player is ready it launchs the audio.
 */
function toggleAudio() {

    if (cueList.length != 0) {
        if (player.getPlayerState() == 1 || player.getPlayerState() == 3) {
            player.pauseVideo();
            cueListIndex = player.getPlaylistIndex();
            currentVideoTime = player.getCurrentTime();
            toggleaddButton(false);
        } else {
            player.loadPlaylist({
                playlist: cueList,
                index: cueListIndex,
                startSeconds: currentVideoTime,
                suggestedQuality: "small"
            });
            player.playVideo();
            toggleaddButton(true);
            

        }
        setCurrentVideoPlayedOnTheDisplay();
    }
}

/**
 * Change the icon of the play button : true is play and false is pause.
 * @param {boolean} play the state of the play button.
 */
function toggleaddButton(play) {
    document.getElementById("playButton").src = play ? "img/pauseButton.png" : "img/playButton.png";
}

/**
 * Display a border of the current video in the play list on the side.
 */
function setCurrentVideoPlayedOnTheDisplay() {
    var videoId = cueList[cueListIndex];
    var videoDivNodes = document.getElementById("videos").childNodes;
    for (let i = 1; i < videoDivNodes.length; i++) {
        if (videoId == videoDivNodes[i].lastChild.value) {
            videoDivNodes[i].style.border = "1px solid yellow";
        } else {
            videoDivNodes[i].style.border = "none";
        }
    }
}

/**
 * Empty the current play list and the display.
 */
function emptyCue() {
    if (cueList != []) {
        cueList = [];
        cueListIndex = 0;
        currentVideoTime = 0;
        console.log("cue is now empty");
        if(player.getPlayerState() != 1 ||player.getPlayerState() != 3) cueList.push(getCurrentVideoPlayed());
        document.getElementById("videos").innerHTML = null;
        toggleaddButton(false);
    }
}

/**
 * Allow to get the current video id.
 * @returns the id of the current video played.
 */
function getCurrentVideoPlayed() {
    var video = player.getVideoUrl();
    if(video.match(/.$/) != "="){
        var videoId = video.match(/([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/);
        if(videoId == null) videoId = video.match(/^.*[a-zA-Z]+-[a-zA-Z]+$/);
        return videoId[0];
    }else return null;
}

/**
 * Toggle the audio when the user press space.
 */
addEventListener("keydown", function (event) {
    if (event.key == " ") {
        toggleAudio();
    }
});