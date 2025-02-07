const {contextBridge, ipcRenderer} = require('electron');
const path = require('path');
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    electron: () => process.versions.electron,
});
contextBridge.exposeInMainWorld('functions', {
    closeApplication: () => ipcRenderer.invoke('closeApplication'),
    minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
});
contextBridge.exposeInMainWorld('images', {
    get: (initiateImg) => `file://${path.join(__dirname, "../img/", initiateImg)}`
});