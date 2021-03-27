const {app, BrowserWindow, Menu, nativeTheme, shell} = require("electron")

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height:  600,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            javascript: true,
            images: true,
            
        },
    });
    win.loadFile("index.html")
}
nativeTheme.themeSource = "dark"; 
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

const menuTemplate = [
    {
        label: "App",
        submenu : [
            { role: "quit"}
        ]
    },
    {
        label: "Modifier",
        submenu: [
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    },
    {
        label: "Vue",
        submenu: [
            { role: "reload"},
            { role: "toggleDevTools"},
            { role: "togglefullscreen"}
        ]
    },
    {
        label: "A propos",
        submenu: [
            {
                label: "GitHub",
                clic : async () => {
                    shell.openExternal("https://github.com/Galding/Mini-media-player")
                }
            },
            { label: "App created by Galding"},
            { label: "Version 1.0"}
        ]
    }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
