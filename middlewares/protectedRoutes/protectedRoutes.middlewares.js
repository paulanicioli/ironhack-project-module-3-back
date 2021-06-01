const { isError } = require('joi');
const jwt = require('jsonwebtoken');

class ProtectedRoutesMiddleware {
  constructor() {
    this.type = 'Auth';
    this.noTokenMessage = 'You have to be logged in to access this page.';
    this.invalidTokenMessage = 'Invalid Credentials';
    this.notAuthorizedMessage = 'You have to be logged in to access this page.';
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

  checkAuth = (res, next, userRole, level) => {
    const userAuthLevel = this.userLevel(userRole);

    if (userAuthLevel >= level) return next();

    return res.status(401).json({
      type: 'Auth',
      message: 'You do not have authorization to access this page.'
    })    
  }

  protect = (level) => {
    return (req, res, next) => {
      const token = req.get('Authorization');
  
      if (!token) {
        return res.status(401).json({
          type: this.type, 
          message: this.noTokenMessage
        });
      }
  
      try {
        const tokenInfo = jwt.verify(
          token,
          process.env.JWT_HASH_SECRET
        );

        req.user = tokenInfo;

        this.checkAuth(res, next, req.user.role, level);
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
