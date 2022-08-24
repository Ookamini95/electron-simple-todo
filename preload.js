const { contextBridge, ipcRenderer: ipcr } = require('electron')

contextBridge.exposeInMainWorld('todoDB', {
    saveDBtoFile: (html) => ipcr.send('set-html', html),
    // datafromDB: () => ipcr.on('data', data)
})


ipcr.on('db-data', (event, data) => {

    const todoContainer = document.querySelector('.todo-container')
    todoContainer.innerHTML = data
})

// ipcr.on('qutting-app', (event, data) => {
//     window.todoDB.saveDBtoFile(data)
// })