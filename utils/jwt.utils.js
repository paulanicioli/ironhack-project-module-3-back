const jwt = require('jsonwebtoken');

class JwtManager {
  constructor() {
    this.jwt = jwt;
  }

  generateAuthToken = (user) => {
    return this.jwt.sign({ id: user._id }, process.env.JWT_HASH_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
  };

  checkUserId = (token) => {
    return this.jwt.decode(token);
  };

  checkToken = (token) => {
    const { id } = jwt.verify(
      token,
      process.env.JWT_HASH_SECRET
    );

    return id;
  }
}

module.exports = new JwtManager();
