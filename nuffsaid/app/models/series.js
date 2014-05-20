var Coffre = require('coffre');

var Series = Coffre.defineModel('Series', function() {
  this.hasMany('issues');
});

module.exports = Series;