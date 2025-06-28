const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../../exceptions/InvariantError');
const NotFoundError = require('../../../exceptions/NotFoundError');

// Fungsi utilitas untuk memetakan nama kolom database ke model API
const mapSongDBToModel = ({ // Fungsi ini untuk mengubah nama kolom dari snake_case (database) ke camelCase (API response)
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id, // Perhatikan ini, dari database
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id, // Dipetakan ke albumId sesuai format API
});

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  // Kriteria 3: POST /songs
  async addSong({ title, year, performer, genre, duration, albumId }) {
    const id = `song-${nanoid(16)}`; // Membuat ID lagu unik
    const query = {
      text: 'INSERT INTO songs (id, title, year, performer, genre, duration, album_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  // Kriteria 3: GET /songs (untuk daftar lagu sederhana)
  async getSongs() {
    // Hanya mengambil id, title, dan performer sesuai spesifikasi response GET /songs
    const result = await this._pool.query('SELECT id, title, performer FROM songs');
    return result.rows;
  }

    // Kriteria 3: GET /songs (untuk daftar lagu sederhana)
  // Kriteria Opsional 2: Menerima query parameters untuk pencarian
  async getSongs({ title, performer }) { // << TAMBAHKAN PARAMETER title dan performer
    let queryText = 'SELECT id, title, performer FROM songs';
    const queryValues = [];
    const conditions = [];

    if (title) { // Jika ada filter title
      conditions.push(`title ILIKE $${conditions.length + 1}`); // Gunakan ILIKE untuk case-insensitive search
      queryValues.push(`%${title}%`); // Tambahkan wildcard %
    }
    if (performer) { // Jika ada filter performer
      conditions.push(`performer ILIKE $${conditions.length + 1}`);
      queryValues.push(`%${performer}%`);
    }

    if (conditions.length > 0) { // Jika ada kondisi filter
      queryText += ` WHERE ${conditions.join(' AND ')}`; // Gabungkan kondisi dengan AND
    }

    const result = await this._pool.query(queryText, queryValues); // Jalankan query dengan values yang difilter
    return result.rows;
  }

  // Kriteria 3: GET /songs/{id}
  async getSongById(id) {
    const query = {
      // Mengambil semua detail lagu untuk response GET /songs/{id}
      text: 'SELECT id, title, year, performer, genre, duration, album_id FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return mapSongDBToModel(result.rows[0]); // Panggil fungsi mapping untuk format yang benar
  }

  // Kriteria 3: PUT /songs/{id}
  async editSongById(id, { title, year, performer, genre, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  // Kriteria 3: DELETE /songs/{id}
  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }

    // Kriteria Opsional 1: Method baru untuk mengambil lagu berdasarkan albumId
  async getSongsByAlbumId(albumId) {
        const query = {
        // Hanya mengambil id, title, dan performer seperti yang diminta di response
        text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
        values: [albumId],
        };
        const result = await this._pool.query(query);
        return result.rows; // Mengembalikan daftar lagu
    }
}

module.exports = SongService;