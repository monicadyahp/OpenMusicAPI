// src/server.js

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');

const AlbumService = require('./services/postgres/albums/AlbumService');
const SongService = require('./services/postgres/songs/SongService');

const AlbumValidator = require('./validator/albums');
const SongValidator = require('./validator/songs');
const SongQueryValidator = require('./validator/songs/query'); // Import SongQueryValidator

const ClientError = require('./exceptions/ClientError');

const init = async () => {
  // Inisialisasi SongService terlebih dahulu karena AlbumService bergantung padanya
  const songService = new SongService();
  // Inisialisasi AlbumService dengan instance SongService
  const albumService = new AlbumService(songService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Daftarkan plugin albums
  await server.register({
    plugin: albums,
    options: {
      service: albumService,
      validator: AlbumValidator,
    },
  });

  // Daftarkan plugin songs
  await server.register({
    plugin: songs,
    options: {
      service: songService,
      validator: SongValidator,
      songQueryValidator: SongQueryValidator, // Teruskan SongQueryValidator di sini
    },
  });

  // Bagian onPreResponse tetap sama
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    if (response instanceof Error) {
      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      newResponse.code(500);
      console.error(response);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();