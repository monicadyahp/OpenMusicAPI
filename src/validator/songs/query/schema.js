const Joi = require('joi');

const SongQuerySchema = Joi.object({
  title: Joi.string().allow(''), 
  performer: Joi.string().allow(''), 
});

module.exports = { SongQuerySchema };