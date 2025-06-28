/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
      default: null, // Boleh null
    },
    album_id: { // Sesuaikan dengan snake_case untuk kolom database
      type: 'VARCHAR(50)',
      default: null, // Boleh null
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};