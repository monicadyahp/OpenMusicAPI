const Joi = require('joi');

const SongQuerySchema = Joi.object({
  title: Joi.string().allow(''), // Boleh string kosong
  performer: Joi.string().allow(''), // Boleh string kosong
});

module.exports = { SongQuerySchema };