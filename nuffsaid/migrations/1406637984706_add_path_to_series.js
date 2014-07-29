module.exports = {
  up: function(migration) {
    migration.addColumn('series', 'path', 'string');
  },
  down: function(migration) {
    migration.dropColumn('series', 'path');
  }
};