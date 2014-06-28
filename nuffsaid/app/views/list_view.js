var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Library = require('./library');
var React = require('react');

var ListView = Backbone.View.extend({
  initialize: function(options) {
    this.onItemClick = options.onItemClick;
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    React.renderComponent(Library({
      id: 'results',
      children: this.collection.items,
      onItemClick: this.onItemClick
    }), this.el, function() {
      $(this.getDOMNode()).width(this.props.children.length * 248);
    });
  }
});

module.exports = ListView;