const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createLoginWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/login.html'));
  mainWindow.on('closed', () => (mainWindow = null));
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createLoginWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createLoginWindow();
});

const { ipcMain } = require('electron');
const auth = require('./auth');

ipcMain.on('login-attempt', (event, password) => {
  if (auth.validatePassword(password)) {
    mainWindow.close();
    createMainWindow();
  } else {
    event.reply('login-failed', 'Incorrect password');
  }
});