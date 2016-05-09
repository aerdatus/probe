var Bancroft = require('bancroft'),
  exec = require('child_process').exec;

var locations = 0;

var bancroft = new Bancroft();
bancroft.on('location', function(loc) {
  if (loc) {
    locations++;

    if (locations == 3) {
      console.log(loc);

      exec('date -s @' + parseInt(loc.timestamp / 1000), function(error, stdout, stderr) {
        console.log(stderr);
        console.log(stdout);
        exec('/bin/bash /home/pi/boot', function(error, stdout, stderr) {
          console.log(stderr);
          console.log(stdout);
          //process.exit(0);
        });
      });
    }
  }
});

setTimeout(function() {
  exec('/sbin/reboot', function(error, stdout, stderr) {
    console.log(stderr);
    console.log(stdout);
    process.exit(0);
  });
}, 30 * 60 * 1000);
