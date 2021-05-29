const jwt = require('jsonwebtoken');

class JwtManager {
  constructor() {
    this.jwt = jwt;
  }

  generateAuthToken = (user) => {
    this.jwt.sign({ id: user._id }, process.env.JWT_HAS_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  };
}

module.exports = new JwtManager();
