module.exports = {
  up: function(migration) {
    migration.addColumn('issues', 'api_id', 'string');
  },
  down: function(migration) {
    migration.dropColumn('issues', 'api_id');
  }
};