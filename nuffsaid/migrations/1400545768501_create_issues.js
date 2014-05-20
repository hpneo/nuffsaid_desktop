module.exports = {
  up: function(migration) {
    migration.createTable('issues', {
      name: 'string',
      issueNumber: 'string',
      description: 'string',
      cover: 'string',
      series: 'reference'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('issues');
  }
};