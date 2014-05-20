var Coffre = require('coffre');
var App = {
  Models: {}
};

Coffre.init().then(function(version) {
  console.log('current version', version);

  App.Models.User = require('./app/models/user');
  App.Models.Series = require('./app/models/series');
  App.Models.StoryArc = require('./app/models/story_arc');
  App.Models.Issue = require('./app/models/issue');
});