var EventEmitter = require('events').EventEmitter,
    ComicVine = require('comicvine');

var AddSeriesTask = function(seriesAttributes, publisher) {
  var self = this;

  App.Models.Series.where({
    api_id: seriesAttributes.api_id
  }).load().then(function(results) {
    var series;

    if (results.length === 0) {
      series = new App.Models.Series(seriesAttributes);
    }
    else {
      series = results[0];
    }

    series.publisher = publisher;

    return series.save();
  }).then(function(series) {
    self.emit('done', series);
  }, function(error) {
    self.emit('error', error);
  });
};

AddSeriesTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddSeriesTask;