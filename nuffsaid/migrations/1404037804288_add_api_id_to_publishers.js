module.exports = {
  up: function(migration) {
    migration.addColumn('publishers', 'api_id', 'string');
  },
  down: function(migration) {
    migration.dropColumn('publishers', 'api_id');
  }
};