function Collection(items) {
  this.items = (items || []).slice(0);
};

_.extend(Collection.prototype, Backbone.Events);

Collection.prototype.add = function(item) {
  var items;

  if (item instanceof Array) {
    items = item;
  }
  else {
    items = [item];
  }

  items.forEach(function(newItem) {
    this.items.push(newItem);
    this.trigger('add', newItem);
  }.bind(this));
};

Collection.prototype.remove = function(item) {
  var items;

  if (item instanceof Array) {
    items = item;
  }
  else {
    items = [item];
  }

  items.forEach(function(removeItem) {
    this.items.splice(this.items.indexOf(removeItem), 1);
    this.trigger('remove', removeItem);
  }.bind(this));
};

Collection.prototype.reset = function() {
  this.items = [];

  this.trigger('reset');
};