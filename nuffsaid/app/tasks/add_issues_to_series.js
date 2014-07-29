var fs = require('fs'),
    EventEmitter = require('events').EventEmitter;

var AddIssuesToSeriesTask = function(series) {
  var self = this;

  if (series === null) {
    self.emit('error', new Error('No series passed'));
  }

  fs.readdir(series.path, function(error, entries) {
    if (error) {
      self.emit('error', error);
    }
    else {}
  });
};

AddIssuesToSeriesTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddIssuesToSeriesTask;