var Coffre = require('coffre');

var Series = Coffre.defineModel('Series', function() {
  this.hasMany('issues');
  this.belongsTo('publisher');
});

module.exports = Series;