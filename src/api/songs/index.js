// src/api/songs/index.js

const SongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  // Tambahkan songQueryValidator di parameter options register
  register: async (server, { service, validator, songQueryValidator }) => { // << TAMBAHKAN songQueryValidator
    // Teruskan songQueryValidator ke constructor SongHandler
    const songHandler = new SongHandler(service, validator, songQueryValidator); // << TAMBAHKAN songQueryValidator
    server.route(routes(songHandler));
  },
};