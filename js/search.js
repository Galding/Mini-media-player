
function init(){
    gapi.client.setApiKey("AIzaSyA4doBzIwbcqZLK8y54cB9mjV8gPafDiXQ");
    gapi.client.load("youtube", "v3", function(){
        console.log("ready");
        
    });
}

function research(){
    
    var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent(document.getElementById("bar").value).replace(/%20/g, "+"),
        maxResults: 10,
        order: "viewCount"
    });
    request.execute(function(response){
        var results = response;
        console.log(results);
    })
}