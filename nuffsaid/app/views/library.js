var Library = React.createClass({
  render: function() {
    var items = this.props.children.map(function(item) {
      if (item instanceof App.Models.Series) {
        return SeriesItem({ model: item.toJSON() });
      }

      if (item instanceof App.Models.Issue) {
        return IssueItem({ model: item.toJSON() });
      }

      if (item instanceof App.Models.StoryArc) {}
    }.bind(this));

    return React.DOM.div({
      id: 'library'
    }, items);
  }
});

var LibraryView = Backbone.View.extend({
  el: '#library_wrapper',
  initialize: function() {
    this.listenTo(this.collection, 'remove', function() {
      this.render();
    });
  },
  render: function() {
    React.renderComponent(Library({
      children: this.collection.items
    }), this.el);
  }
});