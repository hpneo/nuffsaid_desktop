var Backbone = require('backbone');
var $ = require('jquery');

Backbone.$ = $;

var MainNav = Backbone.View.extend({
  el: '#main_nav',
  events: {
    'change #library_sections': 'updateNavItems'
    //'click .nav_item': 'handleNavItem'
  },
  initialize: function(options) {
    this.libraryView = options.libraryView;
    
    var librarySection = this.$el.find('#library_sections');
    
    librarySection.chosen({
      disable_search_threshold: 5
    });

    this.updateNavItems({
      target: librarySection
    });
  },
  updateNavItems: function(e) {
    var librarySection = $(e.target).val(),
        allNavItems = this.$el.find('.nav_item'),
        navItems = allNavItems.filter('.for_' + librarySection);

    allNavItems.hide();
    navItems.show();
  },
  handleNavItem: function(e) {
    e.preventDefault();

    var navItemId = $(e.target).attr('id');

    switch(navItemId) {
      case 'add_series':
        window.currentModal = Modal.show('series');
      break;
    }
  }
});

module.exports = MainNav;