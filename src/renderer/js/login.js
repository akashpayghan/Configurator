const { ipcRenderer } = require('electron');

function submitPassword() {
  const password = document.getElementById('password').value;
  ipcRenderer.send('login-attempt', password);
}

ipcRenderer.on('login-failed', (event, message) => {
  document.getElementById('error').textContent = message;
});