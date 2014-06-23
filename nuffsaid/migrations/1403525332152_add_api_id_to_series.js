module.exports = {
  up: function(migration) {
    migration.addColumn('series', 'api_id', 'string');
  },
  down: function(migration) {
    migration.dropColumn('series', 'api_id');
  }
};