const autoBind = require('auto-bind');
// Impor SongQueryValidator
const SongQueryValidator = require('../../validator/songs/query'); // << TAMBAHKAN INI

class SongHandler {
  // Tambahkan songQueryValidator di constructor
  constructor(service, validator) { // Hapus validator jika belum ada
    this._service = service;
    this._validator = validator;
    this._songQueryValidator = SongQueryValidator; // << TAMBAHKAN INI: Inisialisasi SongQueryValidator
    // Jika Anda ingin mengoper instance, bisa seperti ini:
    // constructor(service, validator, songQueryValidator) {
    //   this._service = service;
    //   this._validator = validator;
    //   this._songQueryValidator = songQueryValidator;
    // }
    // Lalu di server.js, teruskan instance-nya.
    // Untuk kesederhanaan, kita bisa panggil langsung kelasnya.

    autoBind(this);
  }

  // Kriteria 3: POST /songs
  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload); // Validasi payload dengan Joi
    const { title, year, performer, genre, duration, albumId } = request.payload;

    const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId }); // Tambahkan lagu melalui service

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201); // Status kode 201 Created
    return response;
  }

  // Kriteria 3: GET /songs
  async getSongsHandler() {
    const songs = await this._service.getSongs(); // Ambil semua lagu dari service
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

    // Kriteria 3: GET /songs
  // Kriteria Opsional 2: Menerapkan query parameter
  async getSongsHandler(request, h) {
    // Validasi query parameters sebelum digunakan
    this._songQueryValidator.validateSongQuery(request.query); // << TAMBAHKAN INI

    const { title, performer } = request.query; // Ambil query parameters

    // Teruskan query parameters ke service
    const songs = await this._service.getSongs({ title, performer }); // << UBAH INI

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  // Kriteria 3: GET /songs/{id}
  async getSongByIdHandler(request, h) {
    const { id } = request.params; // Ambil ID dari parameter URL
    const song = await this._service.getSongById(id); // Ambil detail lagu dari service
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  // Kriteria 3: PUT /songs/{id}
  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload); // Validasi payload dengan Joi
    const { id } = request.params; // Ambil ID dari parameter URL
    const { title, year, performer, genre, duration, albumId } = request.payload;

    await this._service.editSongById(id, { title, year, performer, genre, duration, albumId }); // Edit lagu melalui service

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  // Kriteria 3: DELETE /songs/{id}
  async deleteSongByIdHandler(request, h) {
    const { id } = request.params; // Ambil ID dari parameter URL
    await this._service.deleteSongById(id); // Hapus lagu melalui service

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongHandler;