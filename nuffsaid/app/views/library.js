var Library = React.createClass({
  render: function() {
    var items = this.props.children.map(function(item) {
      console.log(item instanceof App.Models.Series);
      if (item instanceof App.Models.Series) {
        return SeriesItem({ model: item.toJSON() });
      }
      if (item instanceof App.Models.Issue) {
        return IssueItem({ model: item.toJSON() });
      }
    }.bind(this));

    return React.DOM.div({
      id: 'library'
    }, items);
  }
});

var LibraryView = Backbone.View.extend({
  el: '#library_wrapper',
  initialize: function(options) {
    this.items = options.items;
  },
  render: function() {
    React.renderComponent(Library({
      children: this.items
    }), this.el);
  }
});