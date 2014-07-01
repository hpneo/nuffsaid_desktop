var Coffre = require('coffre');

var Series = Coffre.defineModel('Series', function() {
  this.hasMany('issues');
  this.belongsTo('publisher');
});

Series.fromComicVine = function(seriesInfo) {
  var series = new App.Models.Series({
    name: seriesInfo.name,
    image: (seriesInfo.image.super_url || seriesInfo.image.medium_url),
    description: seriesInfo.description,
    startYear: seriesInfo.start_year,
    api_id: seriesInfo.id.toString()
  });

  return series;
};

module.exports = Series;