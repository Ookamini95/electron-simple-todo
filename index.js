const { app, BrowserWindow, ipcMain: ipcm } = require('electron')
const path = require('path')
const fs = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        },
    })

    // data from DB

    fs.readFile(path.join(__dirname, 'db.txt'), 'utf8', function (err, data) {
        try {
            updateDB(data)
        } catch (err) {
            console.error(err)
        }
    })

    function updateDB(database) {
        win.webContents.on('did-finish-load', () => {
            win.webContents.send('db-data', database)
        })
    }


    // data to DB(savebtn)
    ipcm.on('set-html', (e, html) => { // can be outside
        saveDB(html)
    })
    // data to DB(quit)

    // app.on('window-all-closed', (e) => {
    //     e.preventDefault()
    //     console.log('////////////////////', e, '////////////////////')
    //     // do stuff
    //     console.log('Saving to db')
    //     win.webContents.send('quitting-app')
    //     // quit
    //     console.log('Qutting application')
    //     if (process.platform !== 'darwin') app.quit()
    // })

    // Load HTML
    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow()
})

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
// })



function saveDB(html) {
    console.log('saving-main')
    fs.writeFile(path.join(__dirname, 'db.txt'), html, err => {
        if (err) {
            console.error(err)
            return
        }
    })
}


