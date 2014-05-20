module.exports = {
  up: function(migration) {
    migration.createTable('series', {
      name: 'string',
      description: 'string',
      publisher: 'string',
      image: 'string',
      startYear: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('series');
  }
};