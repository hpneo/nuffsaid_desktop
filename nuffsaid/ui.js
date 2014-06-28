var UI = {};
var Collection = require('collection');
var MainNav = require('./app/views/main_nav');
var SeriesItem = require('./app/views/series_item');
var IssueItem = require('./app/views/issue_item');
var LibraryView = require('./app/views/library_view');
var AddSeries = require('./app/views/add_series');

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
  var gui = require('nw.gui');
  var win = gui.Window.get();
  var menubar = new gui.Menu({ type: 'menubar' });
  var file = new gui.Menu();
  var help = new gui.Menu();

  file.append(new gui.MenuItem({
    label: 'Add series...',
    click: function() {
      new AddSeries();
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
  var marvel = new App.Models.Publisher({
    name: 'Marvel'
  });

  var civilWar = new App.Models.Series({
    name: 'Civil War',
    image: 'http://static.comicvine.com/uploads/scale_large/0/443/82656-18023-105525-1-civil-war.jpg'
  });

  civilWar.publisher = marvel;

  var siege = new App.Models.Series({
    name: 'Siege',
    image: 'http://static.comicvine.com/uploads/scale_large/5/52045/1084030-siege001_dc11_0001.jpg'
  });

  siege.publisher = marvel;

  var items = [civilWar, siege];

  [
    "http://static.comicvine.com/uploads/scale_large/0/443/82656-18023-105525-1-civil-war.jpg",
    "http://static.comicvine.com/uploads/scale_large/0/443/83333-18023-105570-1-civil-war.jpg",
    "http://static.comicvine.com/uploads/scale_large/5/56044/1832470-civil_war__2006_marvel__3a.jpeg",
    "http://static.comicvine.com/uploads/scale_large/0/443/84167-18023-105682-1-civil-war.jpg",
    "http://static.comicvine.com/uploads/scale_large/11/110017/2945051-www.jpg",
    "http://static.comicvine.com/uploads/scale_large/1/11307/440508-civil_war_6_00.jpg",
    "http://static.comicvine.com/uploads/scale_large/11/110017/2779408-www.jpg"
  ].forEach(function(url, index) {
    var issue = new App.Models.Issue({
      name: 'Civil War',
      issueNumber: index + 1,
      image: url
    });

    issue.series = civilWar;
    items.push(issue);
  });

  [
    "http://static.comicvine.com/uploads/scale_large/5/52045/1084030-siege001_dc11_0001.jpg",
    "http://static.comicvine.com/uploads/scale_large/5/52045/1114301-siege002_dc11_lr_0001_02.jpg",
    "http://static.comicvine.com/uploads/scale_large/5/52045/1156489-siege003_dc11_lr_0001.jpg"
  ].forEach(function(url, index) {
    var issue = new App.Models.Issue({
      name: 'Siege',
      issueNumber: index + 1,
      image: url
    });

    issue.series = siege;
    items.push(issue);
  });
  
  this.mainNav = new MainNav({
    libraryView: new LibraryView({
      collection: new Collection([])
    })
  });
  this.collection = this.mainNav.libraryView.collection;
  this.mainNav.render();
  this.mainNav.libraryView.render();
};