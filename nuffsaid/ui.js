var UI = {};
var Collection = require('collection');
var MainNav = require('./app/views/main_nav');
var SeriesItem = require('./app/views/series_item');
var IssueItem = require('./app/views/issue_item');
var LibraryView = require('./app/views/library_view');

UI.listenWindowEvents = function() {
  var gui = require('nw.gui'),
      mainWindow = gui.Window.get();

  mainWindow.on('blur', function() {
    document.body.classList.add('focus_out');
  });

  mainWindow.on('focus', function() {
    document.body.classList.remove('focus_out');
  });

  // mainWindow.on('load', function() {
  //   mainWindow.show();
  // });
};

UI.initAppMenus = function() {
  var AddSeriesModal = require('./app/views/add_series_modal');
  
  var gui = require('nw.gui'),
      win = gui.Window.get(),
      menubar = new gui.Menu({ type: 'menubar' }),
      file = new gui.Menu(),
      help = new gui.Menu();

  file.append(new gui.MenuItem({
    label: 'Add series...',
    click: function() {
      new AddSeriesModal();
    }
  }));

  file.append(new gui.MenuItem({
    label: 'Add publisher...'
  }));
  
  file.append(new gui.MenuItem({
    label: 'Add story arc...'
  }));

  win.menu = menubar;
  win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file}), 1);
  win.menu.append(new gui.MenuItem({ label: 'Help', submenu: help}));
};

UI.init = function() {
  this.mainNav = new MainNav({
    libraryView: new LibraryView({
      collection: new Collection([])
    })
  });

  this.libraryView = this.mainNav.libraryView;
  this.collection = this.libraryView.collection;
  this.mainNav.render();
  this.libraryView.render();

  UI.load();
};

UI.load = function() {
  App.Models.Series.all().then(function(series) {
    var promises = series.map(function(record) {
      return record.publisher.load();
    });

    Promise.all(promises).then(function() {
      UI.libraryView.collection.add(series);
    });
  });
};

UI.initFooterStats = function() {
  var seriesCountPromise = App.Models.Series.count();
  var issuesCountPromise = App.Models.Issue.count();

  Promise.all([seriesCountPromise, issuesCountPromise]).then(function(stats) {
    var seriesCount = stats[0];
    var issuesCount = stats[1];
    
    console.log(seriesCount, 'series', ',', issuesCount, 'issues');
  });
};

global.UI = UI;