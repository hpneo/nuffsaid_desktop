var Coffre = require('coffre');

var Series = Coffre.defineModel('Series', function() {
  this.hasMany('issues');
  this.belongsTo('publisher');
});

var SPLITTERS = {
  camelCase: /(?=[A-Z])/,
  titleAndStartYear: /(.*)\s\((\d{4})\)$/
};

var REGEXERS = {
  titleAndStartYear: /(.*)\s\((\d{4})\)$/
}

Series.fromFileSystem = function(directoryPath) {
  var ComicVine = require('comicvine');

  var directoryName = directoryPath.split('/').pop();

  if (directoryName.indexOf(' ') === -1) {
    directoryName = directoryName.split(SPLITTERS.camelCase).join(' ');
  }

  if (directoryName.indexOf('-') > -1) {
    directoryName = directoryName.replace(/-/g, '_');
  }

  return ComicVine.Volume.search(directoryName).then(function(results) {
    if (results.length === 0) {
      if (REGEXERS.titleAndStartYear.test(directoryName)) {
        directoryName = REGEXERS.titleAndStartYear.exec(directoryName)[1];

        return ComicVine.Volume.search(directoryName);
      }
    }
    else {
      return results;
    }
  });
};

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