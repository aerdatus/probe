var lineReader = require('line-reader'),
  fs = require('fs'),
  Bancroft = require('bancroft'),
  distance = require('gps-distance'),
  gpio = require('rpi-gpio'),
  async = require('async'),
  fse = require('fs-extra');

//conf
var beepEnabled = true;

//state
var started = false;
var path = '/home/pi/logs/';
var location;
var run = true;
var lastLogged;
var lastGPS;

console.log('Probe booting.');
beep(2);

var bancroft = new Bancroft();
bancroft.on('location', function(loc) {
  if (!location) {
    started = true;
    console.log('GPS locked.');
    console.log('Starting capture.');
    beep(3);

    setInterval(function() {
      var now = new Date().getTime();
      if (lastGPS && now - lastGPS >= 30000) {
        console.log('GPS signal lost.');
        console.log('Waiting for GPS.');
        beep();
        run = false;
      } else if (run === false) {
        console.log('GPS locked.');
        run = true;
      }
    }, 10000);

    fs.watch(path, function(type) {
      if (run === true) {
        processFile(path);
      }
    });
  }

  lastGPS = new Date().getTime();
  location = loc;
});

function findFile(path) {
  var files = fs.readdirSync(path);
  for (var i = files.length - 1; i >= 0; i--) {
    if (files[i].indexOf('output') >= 0 && files[i].indexOf('.csv') >= 0) {
      return path + files[i];
    }
  }
}

function processFile(path) {
  var file = findFile(path);
  var now = new Date().getTime();

  if (file && (!lastLogged || now - lastLogged >= 1000)) {
    fse.copy(file, '/media/pen/' + file.split('/')[file.split('/').length - 1].replace('.csv', '_' + now + '.pr'), function(err) {
      if (err) {
        beep();
        console.error(err);
      }
      lastLogged = now;
    });
  }
}


function beep(times, cb) {
  if (beepEnabled !== true) {
    if (cb) {
      return cb();
    } else {
      return;
    }
  }
  async.timesSeries(times || 1, function(n, callback) {
    gpio.setup(7, gpio.DIR_OUT, start);

    function start() {
      setTimeout(function() {
        gpio.destroy();
        setTimeout(function() {
          callback();
        }, 100);
      }, 150);
    }
  }, function() {
    if (cb) cb();
  });
}
