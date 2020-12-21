
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
}*///AIzaSyA4doBzIwbcqZLK8y54cB9mjV8gPafDiXQ


function research(){
    var xhr = new XMLHttpRequest();
    var text = document.getElementById("bar").value;
    var query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&key=AIzaSyA4doBzIwbcqZLK8y54cB9mjV8gPafDiXQ&q="+text.replace(/%20/g, "+");
    xhr.open("GET", query, false);
    xhr.send(null);
    var res = JSON.parse(xhr.responseText);
    //console.log(res);
    return res;
}
function main(){
    var results = research();
    console.log(results.items);
    var div = document.getElementById("results");
    for(item of results.items){
        var p = document.createElement("p");
        var text = document.createTextNode(item.snippet.title);
        p.setAttribute("id", item.id.videoId);
        p.appendChild(text);
        var playButton = document.createElement("input");
        playButton.setAttribute("type", "image");
        playButton.setAttribute("src", "img/playButton.png");
        playButton.setAttribute("alt", "play");
        playButton.setAttribute("class", "button");
        playButton.setAttribute("id", "pause");
        playButton.setAttribute("onclick", "javascript:play(this)");
        p.appendChild(playButton);
        div.appendChild(p);
    }
}

function play(selected){
    var allButtons = selected.parentNode.parentNode.childNodes;
    for(let i = 1; i < allButtons.length; i++){
        var currentButton = allButtons[i].firstElementChild;
        if(currentButton.id == "play"){
            pause(currentButton);
        }
    }
    selected.setAttribute("src", "img/pauseButton.png");
    selected.setAttribute("onclick", "javascript:pause(this)");
    selected.setAttribute("alt", "pause");
    selected.setAttribute("id", "play");
    var videoId = selected.id;
}

function pause(selected){
    selected.setAttribute("src", "img/playButton.png");
    selected.setAttribute("onclick", "javascript:play(this)");
    selected.setAttribute("alt", "play");
    selected.setAttribute("id", "pause");
}
/*
var pauseButton = document.createElement("input");
        pauseButton.setAttribute("type", "image");
        pauseButton.setAttribute("src", "img/pauseButton.png");
        pauseButton.setAttribute("alt", "pause");
        pauseButton.setAttribute("id", "button");
        p.appendChild(pauseButton);
        */