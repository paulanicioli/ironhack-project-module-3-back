const jwt = require('jsonwebtoken');

class ProtectedRoutesMiddleware {
  protect = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).json({
        type: 'Auth',
        message: 'You have to be logged in to access this page.',
      });
    }

    try {
      const tokenInfo = jwt.verify(
        token,
        process.env.JWT_HASH_SECRET
      );

      req.user = tokenInfo;

      return next();
    } catch (error) {
      console.log(error);
      
      return res.status(401).json({
        type: 'Auth',
        message: 'Invalid credentials',
      });
    }
  };
}

module.exports = new ProtectedRoutesMiddleware();
