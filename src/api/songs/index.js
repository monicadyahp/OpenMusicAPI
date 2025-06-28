const SongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',

  register: async (server, { service, validator, songQueryValidator }) => { 

    const songHandler = new SongHandler(service, validator, songQueryValidator); 
    server.route(routes(songHandler));
  },
};