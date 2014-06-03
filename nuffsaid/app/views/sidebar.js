var Sidebar = Backbone.View.extend({
  el: '#sidebar',
  initialize: function(options) {
    options = options || {};

    this.series = options.series;
    this.storyArcs = options.storyArcs;
    this.publishers = options.publishers;

    this.$seriesSidebar = this.$el.find('#series_sidebar');
    this.$storyArcsSidebar = this.$el.find('#story_arcs_sidebar');
    this.$publishersSidebar = this.$el.find('#publishers_sidebar');

    this.$allSeries = this.$seriesSidebar.find('#all_series');
    this.$allStoryArcs = this.$storyArcsSidebar.find('#all_story_arcs');
    this.$allPublishers = this.$publishersSidebar.find('#all_publishers');
  },
  render: function() {
    var self = this;

    this.series.then(function(series) {
      series.forEach(self.renderSeries.bind(self));
    });

    this.storyArcs.then(function(storyArcs) {
      storyArcs.forEach(self.renderStoryArc.bind(self));
    });

    this.publishers.then(function(publishers) {
      publishers.forEach(self.renderPublisher.bind(self));
    });
  },
  renderSeries: function(series) {
    this.$seriesSidebar.find('ul').append('<li data-series="' + series.id + '"><a href="#">' + series.name + '</a></li>');
  },
  renderStoryArc: function(storyArc) {
    this.$storyArcsSidebar.find('ul').append('<li data-publisher="' + storyArc.id + '"><a href="#">' + storyArc.name + '</a></li>');
  },
  renderPublisher: function(publisher) {
    this.$publishersSidebar.find('ul').append('<li data-publisher="' + publisher.id + '"><a href="#">' + publisher.name + '</a></li>');
  }
});