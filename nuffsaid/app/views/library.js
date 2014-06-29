var Backbone = require('backbone');
Backbone.$ = $ = require('jquery');

var React = require('react');
var SeriesItem = require('./series_item');
var IssueItem = require('./issue_item');

var Library = React.createClass({
  render: function() {
    var libraryId = this.props.id || 'library',
        onItemClick = this.props.onItemClick,
        onItemDoubleClick = this.props.onItemDoubleClick;
    
    var items = this.props.children.map(function(item) {
      var itemOptions = {
        model: item.toJSON(),
        onClick: onItemClick,
        onDoubleClick: onItemDoubleClick
      };
      
      if (item instanceof App.Models.Series) {
        return SeriesItem(itemOptions);
      }

      if (item instanceof App.Models.Issue) {
        return IssueItem(itemOptions);
      }

      if (item instanceof App.Models.StoryArc) {}
    }.bind(this));

    if (items.length === 0) {
      items = React.DOM.h3({
        className: 'empty'
      }, 'No items');
    }

    return React.DOM.div({
      id: libraryId,
      className: 'list_view'
    }, items);
  }
});

module.exports = Library;