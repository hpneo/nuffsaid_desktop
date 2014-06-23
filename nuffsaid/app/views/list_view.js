var ListView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    React.renderComponent(Library({
      id: 'results',
      children: this.collection.items
    }), this.el, function() {
      $(this.getDOMNode()).width(this.props.children.length * 248);
    });
  }
});