const jwt = require('jsonwebtoken');

class ProtectedRoutesMiddleware {
  protect = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).json({
        type: 'Auth',
        message: 'Missing token',
      });
    }
    try {
      const tokenInfo = jwt.verify(
        token.split(' ')[1],
        process.env.JWT_HASH_SECRET
      );

      req.user = tokenInfo;

      return next();
    } catch (error) {
      return rest.status(401).json({
        type: 'Auth',
        message: 'Invalid credentials',
      });
    }
  };
}

module.exports = new ProtectedRoutesMiddleware();
