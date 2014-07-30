var Coffre = require('coffre');

var Issue = Coffre.defineModel('Issue', function() {
  this.belongsTo('series');
});

Issue.fromComicVine = function(issuesInfo) {
  console.log(issuesInfo);
  var issue = new App.Models.Issue({
    name: issuesInfo.name,
    cover: (issuesInfo.image.super_url || issuesInfo.image.medium_url),
    issueNumber: issuesInfo.issue_number,
    description: issuesInfo.description,
    api_id: issuesInfo.id.toString()
  });

  return issue;
};

module.exports = Issue;