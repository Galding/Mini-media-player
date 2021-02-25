const {app, BrowserWindow} = require("electron")
function createWindow(){
    const win = new BrowserWindow({
        width: 1400,
        height:  1200,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            javascript: true,
            images: true,
            icon: __dirname + "/img/AppIcon.png"
        }
    });
    win.loadFile("index.html")
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow)
app.on("window-all-closed", () =>{
    if(process.platform != 'darwin'){
        app.quit();
    }
})

app.on("activate", () =>  {
    if(BrowserWindow.getAllWindows.length === 0){
        createWindow()
    }
})

