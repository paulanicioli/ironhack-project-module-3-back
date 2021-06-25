const Users = require('../../models/User');
const { isError } = require('joi');
const jwt = require('jsonwebtoken');
const { jwtManager } = require('../../controller/auth.controller');

class ProtectedRoutesMiddleware {
  constructor() {
    this.type = 'Auth';
    this.noTokenMessage = 'You have to be logged in to access this page.';
    this.invalidTokenMessage = 'Invalid Credentials';
    this.notAuthorizedMessage = 'You do not have authorization to access this page.';
  }

  userLevel = (userRole) => {
    switch(userRole) {
      case 'super-admin':
        return 3;
      case 'business-manager': 
        return 2;
      default:
        return 1;   
    }
  }

  protect = (level) => {
    return async (req, res, next) => {
      const token = req.get('Authorization');
  
      if (!token) {
        return res.status(401).json({
          type: this.type, 
          message: this.noTokenMessage
        });
      }
  
      try {
        const userId = jwtManager.checkToken(token.split(' ')[1]);
        const { role } = await Users.findById(userId, 'role');

        const userAuthLevel = this.userLevel(role);

        req.user = userId;

        if (userAuthLevel >= level) return next();

        return res.status(401).json({
          type: 'Auth',
          message: this.notAuthorizedMessage
        }) 

      } catch (error) {
        console.log(error);
        
        return res.status(401).json({
          type: this.type,
          message: this.invalidTokenMessage,
        });
      }
    };
  }
}

module.exports = new ProtectedRoutesMiddleware();
