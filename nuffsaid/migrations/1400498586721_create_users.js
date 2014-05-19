module.exports = {
  up: function(migration) {
    migration.createTable('users', {
      username: 'string',
      email: 'string',
      password: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('users');
  }
};