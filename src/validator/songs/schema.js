const Joi = require('joi'); // Mengimpor Joi untuk definisi schema

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(), // Judul lagu harus string dan wajib
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(), // Tahun harus integer, minimal 1900, maksimal tahun saat ini, dan wajib
  genre: Joi.string().required(), // Genre harus string dan wajib
  performer: Joi.string().required(), // Performer harus string dan wajib
  duration: Joi.number().integer().min(0).optional(), // Durasi harus number (integer), minimal 0, dan opsional (boleh null/undefined)
  albumId: Joi.string().optional(), // ID album harus string dan opsional (boleh null/undefined)
});

module.exports = { SongPayloadSchema }; // Mengekspor schema lagu