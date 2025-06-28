// src/api/albums/handler.js

const autoBind = require('auto-bind');

class AlbumHandler {
  // Constructor ini hanya menerima 'service' (AlbumService instance) dan 'validator'
  constructor(service, validator) {
    this._service = service; // Cukup simpan instance service yang sudah diinisialisasi
    this._validator = validator;

    autoBind(this);
  }

  // Kriteria 2: POST /albums
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  // Kriteria 2: GET /albums
  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  // Kriteria 2: GET /albums/{id}
  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    // Panggil getAlbumById dari service. Service ini yang akan memanggil SongService.
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  // Kriteria 2: PUT /albums/{id}
  async putAlbumByIdHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  // Kriteria 2: DELETE /albums/{id}
  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumHandler;