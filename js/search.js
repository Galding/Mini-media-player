
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


function research2(){
    var xhr = new XMLHttpRequest();
    var text = document.getElementById("bar").value;
    var query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&key=AIzaSyA4doBzIwbcqZLK8y54cB9mjV8gPafDiXQ&q="+text.replace(/%20/g, "+");
    xhr.open("GET", query, false);
    xhr.send(null);
    var res = JSON.parse(xhr.responseText);
    console.log(res);
    return res;
}
function main(){
    var results = research2();
    console.log(results.items);
    var div = document.getElementById("results");
    for(item of results.items){
        var p = document.createElement("p");
        var text = document.createTextNode(item.snippet.title);
        p.setAttribute("id", item.id.videoId);
        p.appendChild(text);
        div.appendChild(p);
    }
}