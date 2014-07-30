var AddPublisherFromComicVineTask = require('./add_publisher_from_comicvine'),
    AddSeriesTask = require('./add_series'),
    EventEmitter = require('events').EventEmitter;

var AddSeriesFromDirectoryTask = function(path) {
  var series,
      self = this;

  App.Models.Series.fromFileSystem(path).then(function(results) {
    if (results.length > 0) {
      var seriesAttributes = App.Models.Series.fromComicVine(results[0]),
          publisherAttributes = App.Models.Publisher.fromComicVine(results[0].publisher),
          publisherService = new AddPublisherFromComicVineTask(publisherAttributes);

      publisherService.on('done', function(publisher) {
        var seriesService = new AddSeriesTask(seriesAttributes, publisher);

        seriesService.on('done', function(series) {
          series.publisher = publisher;
          series.path = path;

          series.save().then(function(series) {
            self.emit('done', series);
          });
        });
      });
    }
    else {
      self.emit('error', 'No series passed');
    }
  });
};

AddSeriesFromDirectoryTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddSeriesFromDirectoryTask;