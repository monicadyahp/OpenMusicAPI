const Joi = require('joi'); // Mengimpor Joi untuk definisi schema

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(), // Nama album harus string dan wajib
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(), // Tahun album harus integer, minimal 1900, maksimal tahun saat ini, dan wajib
});

module.exports = { AlbumPayloadSchema }; // Mengekspor schema album