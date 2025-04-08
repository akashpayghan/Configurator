const SerialPort = require('serialport');

document.addEventListener('DOMContentLoaded', () => {
  SerialPort.list().then(ports => {
    console.log('Available ports:', ports);
    // Populate device-select with ports if needed
  }).catch(err => {
    console.error('Error listing ports:', err);
  });

  // Placeholder for future functionality
  document.getElementById('detect').addEventListener('click', () => {
    alert('Detect button clicked - implement board detection logic');
  });

  document.getElementById('flash-firmware').addEventListener('click', () => {
    alert('Flash Firmware button clicked - implement flashing logic');
  });
});