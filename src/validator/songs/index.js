const { SongPayloadSchema } = require('./schema'); // Mengimpor skema lagu yang baru dibuat
const InvariantError = require('../../exceptions/InvariantError'); // Mengimpor custom error InvariantError

const SongValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload); // Melakukan validasi payload menggunakan skema

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message); // Melemparkan InvariantError jika validasi gagal
    }
  },
};

module.exports = SongValidator; // Mengekspor validator lagu