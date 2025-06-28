const { SongQuerySchema } = require('./schema');
const InvariantError = require('../../../exceptions/InvariantError');

const SongQueryValidator = {
  validateSongQuery: (query) => {
    const validationResult = SongQuerySchema.validate(query);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongQueryValidator;