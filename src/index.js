const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const appConfig = require("./config.json");

let mainWindow;
let splashWindow;

function createWindow() {

    if (appConfig.splashWindow !== undefined) {
        splashWindow = new BrowserWindow({
            title: "LAN Bucket",
            width: appConfig.splashWindow.width,
            height: appConfig.splashWindow.height,
            frame: false,
            show: false
        });
        splashWindow.on("ready-to-show", function () {
            splashWindow.show();
            splashWindow.focus();
        });

        splashWindow.loadURL(url.format({
            pathname: path.join(__dirname, appConfig.splashWindow.renderFilePath),
            protocol: "file:",
            slashes: true
        }));
        splashWindow.on("closed", function () {
            splashWindow = null
        });
    }
    mainWindow = new BrowserWindow({
        title: "LAN Bucket",
        //icon: __dirname + "/src/assets/icons/icon.icns",????
        width: appConfig.mainWindow.width,
        height: appConfig.mainWindow.height,
        frame: appConfig.mainWindow.frame,
        show: false
    });
    if (appConfig.mainWindow !== undefined) {
        mainWindow.on("ready-to-show", function () {
            if (typeof splashWindow.close === "function") {
                splashWindow.close();//Close Splash
            }
            mainWindow.show();
            mainWindow.focus();
        });
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, appConfig.mainWindow.renderFilePath),
            protocol: "file:",
            slashes: true
        }));

        if (appConfig.mainWindow.openDevTools === true) {
            mainWindow.webContents.openDevTools();
        }
        mainWindow.on("closed", function () {
            mainWindow = null
        });

    }
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (appConfig.ApplicationQuitOnAllWindowClosed !== undefined) {
        if (process.platform === "darwin" ||
            process.platform === "linux" ||
            process.platform === "win32") {
            if (appConfig.ApplicationQuitOnAllWindowClosed[process.platform] !== undefined) {
                if (appConfig.ApplicationQuitOnAllWindowClosed[process.platform] === true) {
                    //Config defined and following config
                    app.quit();
                }
            } else {
                //Quit as config not found
                app.quit();
            }
        } else {
            //Quit as unknown platform
            app.quit();
        }
    } else {
        //Quit as config not found
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow()
    }
});