const jwt = require('jsonwebtoken');

class JwtManager {
  constructor() {
    this.jwt = jwt;
  }

  generateAuthToken = (user) => {
    return this.jwt.sign({ id: user._id, role: user.role }, process.env.JWT_HASH_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  };
}

module.exports = new JwtManager();
