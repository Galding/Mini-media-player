var key = openFile("file:///" + __dirname + "/TOKEN.txt");

function research() {
    var xhr = new XMLHttpRequest();
    var text = document.getElementById("bar").value;
    var query = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=viewCount&key=" + key + "&q=" + text.replace(/%20/g, "+");
    xhr.open("GET", query, false);
    xhr.send(null);
    var res = JSON.parse(xhr.responseText);
    return res;
}



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