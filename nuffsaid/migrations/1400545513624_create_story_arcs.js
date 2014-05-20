module.exports = {
  up: function(migration) {
    migration.createTable('story_arcs', {
      name: 'string',
      description: 'string',
      publisher: 'string',
      image: 'string'
    }, {
      useTimestamps: true
    });
  },
  down: function(migration) {
    migration.dropTable('story_arcs');
  }
};