var Coffre = require('coffre');

var Issue = Coffre.defineModel('Issue', function() {
  this.belongsTo('series');
});

module.exports = Issue;