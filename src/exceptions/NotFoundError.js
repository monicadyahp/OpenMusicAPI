const ClientError = require('./ClientError'); // Mengimpor ClientError sebagai dasar

class NotFoundError extends ClientError { // Mewarisi dari ClientError
  constructor(message) {
    super(message, 404); // Memanggil constructor ClientError dengan status code 404
    this.name = 'NotFoundError'; // Mengatur nama error
  }
}

module.exports = NotFoundError; // Mengekspor NotFoundError