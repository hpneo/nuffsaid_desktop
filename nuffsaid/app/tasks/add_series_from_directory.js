var EventEmitter = require('events').EventEmitter;

var AddSeriesFromDirectoryTask = function(path) {
  var series,
      self = this;

  App.Models.Series.fromFileSystem(path).then(function(results) {
    if (results.length > 0) {
      series = App.Models.Series.fromComicVine(results[0]);
      series.path = path;

      self.emit('done', series);
      
      // series.save().then(function() {
      //   self.emit('done');
      // });
    }
    else {
      self.emit('error', 'No series passed');
    }
  });
};

AddSeriesFromDirectoryTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddSeriesFromDirectoryTask;