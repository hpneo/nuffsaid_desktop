module.exports = {
  up: function(migration) {
    migration.addColumn('issues', 'path', 'string');
  },
  down: function(migration) {
    migration.dropColumn('issues', 'path');
  }
};