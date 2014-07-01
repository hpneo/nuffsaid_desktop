var Coffre = require('coffre');

var Publisher = Coffre.defineModel('Publisher', function() {
  this.hasMany('series');
});

Publisher.fromComicVine = function(publisherInfo) {
  var publisher = new App.Models.Publisher({
    name: publisherInfo.name,
    api_id: publisherInfo.id.toString()
  });

  return publisher;
};

module.exports = Publisher;