var Coffre = require('coffre');

Coffre.init().then(function(version) {
  console.log('current version', version);
});