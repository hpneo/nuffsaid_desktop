var EventEmitter = require('events').EventEmitter,
    ComicVine = require('comicvine');

var AddPublisherFromComicVineTask = function(publisherAttributes) {
  var self = this;

  App.Models.Publisher.where({
    api_id: publisherAttributes.api_id
  }).load().then(function(results) {
    var publisher;

    if (results.length === 0) {
      publisher = new App.Models.Publisher(publisherAttributes);
    }
    else {
      publisher = results[0];
    }

    return publisher.save();
  }).then(function(publisher) {
    return ComicVine.Publisher.find(publisher.api_id).then(function(publisherFromComicVine) {
      publisher.description = publisherFromComicVine.description;

      if (publisherFromComicVine.image) {
        publisher.image = (publisherFromComicVine.image.super_url || publisherFromComicVine.image.medium_url);
      }

      return publisher.save();
    });
  }).then(function(publisher) {
    self.emit('done', publisher);
  }, function(error) {
    self.emit('error', error);
  });
};

AddPublisherFromComicVineTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddPublisherFromComicVineTask;