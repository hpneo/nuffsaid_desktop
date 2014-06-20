var UI = {};

UI.init = function() {
  /*var sidebar = new Sidebar({
    series: App.Models.Series.all(),
    storyArcs: App.Models.StoryArc.all(),
    publishers: App.Models.Publisher.all()
  });

  sidebar.render();*/

  var mainNav = new MainNav({
    libraryView: new LibraryView()
  });
  mainNav.render();
};