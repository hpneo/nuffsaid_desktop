var Backbone = require('backbone');
Backbone.$ = require('jquery');

var Library = require('./library');
var React = require('react');

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

module.exports = LibraryView;