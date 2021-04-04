
/**
 * Api Key.
 */
var key = openFile("file:///" + __dirname + "/TOKEN.txt");

var nextPageToken;

/**
 * Execute user's request.
 * @returns The results of the research.
 */
function research(pageToken) {
    var xhr = new XMLHttpRequest();
    var text = document.getElementById("bar").value;
    var query;
    if(pageToken == null){
        query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&key=" + key + "&q=" + text.replace(/%20/g, "+");
    } else {
        query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&pageToken="+ nextPageToken +"&key=" + key + "&q=" + text.replace(/%20/g, "+");
    }
    xhr.open("GET", query, false);
    xhr.send(null);
    var res = JSON.parse(xhr.responseText);
    nextPageToken = res.nextPageToken;
    console.log(nextPageToken);
    return res;
}


/**
 * Open a file by an AJAX request. 
 * @param {string} file the path of the file.
 * @returns the content of the file.
 */
function openFile(file) {
    var rawFile = new XMLHttpRequest();
    var text;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState == 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                text = rawFile.responseText;

            }
        }
    }
    rawFile.send(null);
    return text;
}
