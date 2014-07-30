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
    label: 'Add series from folder...',
    click: function() {
      document.getElementById('select_directory').click();
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

  UI.listenWindowEvents();
  UI.initFilesListeners();
  UI.initAppMenus();
  UI.initFooter();
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

UI.initFilesListeners = function() {
  var AddSeriesFromDirectoryTask = require('./app/tasks/add_series_from_directory'),
      AddIssuesToSeriesTask = require('./app/tasks/add_issues_to_series');

  var selectDirectory = document.getElementById('select_directory'),
      selectFiles = document.getElementById('select_files');

  selectDirectory.addEventListener('change', function() {
    // add background spinner or loader
    var seriesTask = new AddSeriesFromDirectoryTask(this.value);

    seriesTask.on('done', function(series) {
      UI.libraryView.collection.add(series);

      var issuesTask = new AddIssuesToSeriesTask(series);

      issuesTask.on('done', function(issues) {
        console.log(issues);
      });

      issuesTask.on('error', function(error) {
        console.log(error);
      })
    });
  });

  selectFiles.addEventListener('change', function(e) {
    console.dir(this.files);
  });
};

UI.initFooter = function() {
  UI.initFooterStats();
  UI.initFooterListeners();
};

UI.initFooterStats = function() {
  var seriesCountPromise = App.Models.Series.count();
  var issuesCountPromise = App.Models.Issue.count();

  Promise.all([seriesCountPromise, issuesCountPromise]).then(function(stats) {
    var seriesCount = stats[0],
        issuesCount = stats[1];

    document.getElementById('stats').textContent = seriesCount + ' series' + ', ' + issuesCount + ' issues';
  });
};

UI.initFooterListeners = function() {
  var gui = require('nw.gui'),
      mainWindow = gui.Window.get(),
      add = document.getElementById('add');

  add.addEventListener('click', function(e) {
    e.preventDefault();

    var clientRect = add.getBoundingClientRect(),
        x = clientRect.right,
        y = clientRect.top;

    mainWindow.menu.items[0].submenu.popup(x, y)
  });
};

global.UI = UI;