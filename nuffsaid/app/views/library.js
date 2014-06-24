var Library = React.createClass({
  render: function() {
    var libraryId = this.props.id || 'library',
        onItemClick = this.props.onItemClick;
    
    var items = this.props.children.map(function(item) {
      if (item instanceof App.Models.Series) {
        return SeriesItem({ model: item.toJSON(), onClick: onItemClick });
      }

      if (item instanceof App.Models.Issue) {
        return IssueItem({ model: item.toJSON(), onClick: onItemClick });
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

var LibraryView = Backbone.View.extend({
  el: '#library_wrapper',
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    React.renderComponent(Library({
      children: this.collection.items
    }), this.el);
  }
});