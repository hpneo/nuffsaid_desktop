var fs = require('fs'),
    path = require('path'),
    ComicVine = require('comicvine'),
    EventEmitter = require('events').EventEmitter;

var AddIssuesToSeriesTask = function(series) {
  var self = this;

  if (series === null) {
    self.emit('error', new Error('No series passed'));
  }
  else {
    var issuesFromComicVine = ComicVine.Issue.searchBy({ volume: series.api_id });

    fs.readdir(series.path, function(error, entries) {
      if (error) {
        self.emit('error', error);
      }
      else {
        issuesFromComicVine.then(function(issues) {
          if (entries.length === issues.length) {
            var issuesPromises = issues.map(function(issueFromComicVine, index) {
              var issue = App.Models.Issue.fromComicVine(issueFromComicVine);
              
              issue.series = series;
              issue.path = path.join(series.path, entries[index]);

              return issue.save();
            });

            global.window.Promise.all(issuesPromises).then(function(issues) {
              self.emit('done', issues);
            });
          }
        });
      }
    });
  }
};

AddIssuesToSeriesTask.prototype = Object.create(EventEmitter.prototype);

module.exports = AddIssuesToSeriesTask;