const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        // resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
        }
    });
    win.loadFile('index.html');
    ipcMain.handle('minimizeWindow', () => win.minimize());
}
app.on('window-all-closed', () => {
    if(process.platform == 'darwin') app.quit();
})
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length == 0)
            createWindow();
    });
    ipcMain.handle('closeApplication', () => app.quit());
});