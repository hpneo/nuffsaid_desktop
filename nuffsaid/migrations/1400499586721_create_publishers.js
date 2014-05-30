module.exports = {
  up: function(migration) {
    migration.createTable('publishers', {
      name: 'string',
      description: 'string',
      image: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('publishers');
  }
};