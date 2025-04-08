const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const settingsPath = path.join(__dirname, '../config/settings.json');
const defaultPassword = 'parashar123';

function initializePassword() {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  if (!settings.password) {
    const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
    settings.password = hashedPassword;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  }
  return settings.password;
}

function validatePassword(inputPassword) {
  const hashedPassword = initializePassword();
  return bcrypt.compareSync(inputPassword, hashedPassword);
}

module.exports = { validatePassword };