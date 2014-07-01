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

            App.Models.Publisher.where({ api_id: publisherAttributes.api_id }).load().then(function(results) {
              var publisher;

              if (results.length === 0) {
                publisher = new App.Models.Publisher(publisherAttributes);
              }
              else {
                publisher = results[0];
              }

              return publisher.save();
            }).then(function(publisher) {
              ComicVine.Publisher.find(publisher.api_id).then(function(publisherFromComicVine) {
                publisher.description = publisherFromComicVine.description;

                if (publisherFromComicVine.image) {
                  publisher.image = (publisherFromComicVine.image.super_url || publisherFromComicVine.image.medium_url);
                }

                publisher.save();
              });

              var seriesPromise = App.Models.Series.where({ api_id: seriesAttributes.api_id }).load().then(function(results) {
                var series;

                if (results.length === 0) {
                  series = new App.Models.Series(seriesAttributes);
                }
                else {
                  series = results[0];
                }

                series.publisher = publisher;

                return series.save();
              });

              return seriesPromise;
            }).then(function(series) {
              UI.libraryView.collection.add(series);
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