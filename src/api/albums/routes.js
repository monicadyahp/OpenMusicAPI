const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler, // Menggunakan handler untuk POST album
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbumsHandler, // Menggunakan handler untuk GET semua album
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler, // Menggunakan handler untuk GET album berdasarkan ID
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler, // Menggunakan handler untuk PUT (edit) album berdasarkan ID
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler, // Menggunakan handler untuk DELETE album berdasarkan ID
  },
];

module.exports = routes; // Mengekspor definisi routes