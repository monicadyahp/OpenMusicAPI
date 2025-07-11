const autoBind = require('auto-bind');

const SongQueryValidator = require('../../validator/songs/query'); 

class SongHandler {
  
  constructor(service, validator) { 
    this._service = service;
    this._validator = validator;
    this._songQueryValidator = SongQueryValidator; 

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload); 
    const { title, year, performer, genre, duration, albumId } = request.payload;

    const songId = await this._service.addSong({ title, year, performer, genre, duration, albumId }); 

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongsHandler() {
    const songs = await this._service.getSongs(); 
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongsHandler(request, h) {
    
    this._songQueryValidator.validateSongQuery(request.query); 

    const { title, performer } = request.query; 

    const songs = await this._service.getSongs({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params; 
    const song = await this._service.getSongById(id); 
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload); 
    const { id } = request.params; 
    const { title, year, performer, genre, duration, albumId } = request.payload;

    await this._service.editSongById(id, { title, year, performer, genre, duration, albumId });

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params; 
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongHandler;