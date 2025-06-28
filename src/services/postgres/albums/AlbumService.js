const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/InvariantError');
const NotFoundError = require('../../../exceptions/NotFoundError');
// TIDAK PERLU mengimpor SongService di sini secara langsung.
// SongService akan diinjeksikan melalui constructor.

class AlbumService {
  constructor(songService) { // << TAMBAHKAN songService DI SINI
    this._pool = new Pool();
    this._songService = songService; // << SIMPAN INSTANCE SONGSERVICE
  }

  // Kriteria 2: POST /albums
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  // Kriteria 2: GET /albums
  async getAlbums() {
    const result = await this._pool.query('SELECT id, name, year FROM albums');
    return result.rows;
  }

  // Kriteria 2: GET /albums/{id}
  async getAlbumById(id) {
    const query = {
      text: 'SELECT id, name, year FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const album = result.rows[0]; // Ambil data album

    // Kriteria Opsional 1: Ambil daftar lagu yang terkait dengan album ini
    // Kita akan membuat method di SongService untuk ini
    // Kemudian panggil dari sini:
    const songs = await this._songService.getSongsByAlbumId(album.id); // << PANGGIL METHOD DARI SONGSERVICE

    return {
      ...album,
      songs, // << TAMBAHKAN DAFTAR LAGU KE OBJEK ALBUM
    };
  }

  // Kriteria 2: PUT /albums/{id}
  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  // Kriteria 2: DELETE /albums/{id}
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumService;