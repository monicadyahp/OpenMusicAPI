const ClientError = require('./ClientError'); // Mengimpor ClientError sebagai dasar 

class InvariantError extends ClientError { // Mewarisi dari ClientError 
  constructor(message) {
    super(message); // Memanggil constructor ClientError 
    this.name = 'InvariantError'; // Mengatur nama error 
  }
}

module.exports = InvariantError; // Mengekspor InvariantError