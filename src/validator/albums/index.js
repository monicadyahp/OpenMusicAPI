const { AlbumPayloadSchema } = require('./schema'); // Mengimpor skema yang baru dibuat
const InvariantError = require('../../exceptions/InvariantError'); // Mengimpor custom error InvariantError

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload); // Melakukan validasi payload menggunakan skema

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message); // Melemparkan InvariantError jika validasi gagal
    }
  },
};

module.exports = AlbumValidator; // Mengekspor validator album