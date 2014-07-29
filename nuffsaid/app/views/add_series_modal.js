var Collection = require('collection');
var Modal = require('modal');
var $ = require('jquery');

var ListView = require('./list_view');

function AddSeriesModal() {
  var ComicVine = require('comicvine');
  var modal = Modal.show('series');

  var AddPublisherFromComicVineTask = require('../tasks/add_publisher_from_comicvine'),
      AddSeriesFromComicVineTask = require('../tasks/add_series_from_comicvine');

  modal.overlay.find('.modal').find('form').on('submit', function(e) {
    e.preventDefault();
  });

  modal.overlay.find('.modal').find('input').on('keyup', function(e) {
    var input = $(e.target);
    if (e.which === 13) {
      input.attr('disabled', 'disabled');

      ComicVine.Volume.search(input.val()).then(function(series) {
        series = series.map(function(seriesItem) {
          var seriesModel = App.Models.Series.fromComicVine(seriesItem),
              publisherModel = App.Models.Publisher.fromComicVine(seriesItem.publisher);

          seriesModel.publisher = publisherModel;

          return seriesModel;
        });

        var library = new ListView({
          el: '#results_wrapper',
          collection: new Collection(series),
          onItemDoubleClick: function() {
            var publisherAttributes = this.props.model.publisher;
            var seriesAttributes = this.props.model;

            var publisherService = new AddPublisherFromComicVineTask(publisherAttributes);
            
            publisherService.on('done', function(publisher) {
              var seriesService = new AddSeriesFromComicVineTask(seriesAttributes, publisher);

              seriesService.on('done', function(series) {
                UI.libraryView.collection.add(series);
              });
            });
          }
        });

        library.render();

        input.removeAttr('disabled');
      }).catch(function() {
        console.log(arguments);
        input.removeAttr('disabled');
      });
    }
  });

  window.currentModal = modal;
}

module.exports = AddSeriesModal;