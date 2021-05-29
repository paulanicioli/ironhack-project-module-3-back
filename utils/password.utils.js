const bcrypt = require('bcrypt');

class PasswordManager {
  constructor() {
    this.bcrypt = bcrypt;
    this.saltRounds = 10;
  }

  encrypt = (passwordText) => {
    const salt = this.bcrypt.genSaltSync(this.saltRounds);
    return this.bcrypt.hashSync(passwordText, salt);
  };

  verify = (passwordText, passwordHash) => {
    return this.bcrypt.compareSync(passwordText, passwordHash);
  };
}

module.exports = new PasswordManager();
