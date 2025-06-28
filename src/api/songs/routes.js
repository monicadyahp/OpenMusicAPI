const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler, // Menggunakan handler untuk POST lagu
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler, // Menggunakan handler untuk GET semua lagu
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler, // Menggunakan handler untuk GET lagu berdasarkan ID
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler, // Menggunakan handler untuk PUT (edit) lagu berdasarkan ID
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler, // Menggunakan handler untuk DELETE lagu berdasarkan ID
  },
];

module.exports = routes; // Mengekspor definisi routes