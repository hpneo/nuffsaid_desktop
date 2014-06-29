var Collection = require('collection');
var Modal = require('modal');
var $ = require('jquery');

var ListView = require('./list_view');

function AddSeriesModal() {
  var ComicVine = require('comicvine');
  var modal = Modal.show('series');

  modal.overlay.find('.modal').find('form').on('submit', function(e) {
    e.preventDefault();
  });

  modal.overlay.find('.modal').find('input').on('keyup', function(e) {
    var input = $(e.target);
    if (e.which === 13) {
      input.attr('disabled', 'disabled');

      ComicVine.Volume.search(input.val()).then(function(series) {
        series = series.map(function(seriesItem) {
          var seriesModel = new App.Models.Series({
            name: seriesItem.name,
            image: (seriesItem.image.super_url || seriesItem.image.medium_url),
            description: seriesItem.description,
            startYear: seriesItem.start_year,
            api_id: seriesItem.id
          });

          var publisherModel = new App.Models.Publisher({
            name: seriesItem.publisher.name,
            api_id: seriesItem.publisher.id
          });

          seriesModel.publisher = publisherModel;

          return seriesModel;
        });

        var library = new ListView({
          el: '#results_wrapper',
          collection: new Collection(series),
          onItemClick: function() {
            var publisher = new App.Models.Publisher(this.props.model.publisher);
            var series = new App.Models.Series(this.props.model);

            series.publisher = publisher;

            ComicVine.Publisher.find(publisher.api_id).then(function(publisherFromComicVine) {
              publisher.description = publisherFromComicVine.description;
              publisher.image = (publisherFromComicVine.image.super_url || publisherFromComicVine.image.medium_url);
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