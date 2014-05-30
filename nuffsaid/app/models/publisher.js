var Coffre = require('coffre');

var Publisher = Coffre.defineModel('Publisher', function() {
  this.hasMany('series');
});

module.exports = Publisher;