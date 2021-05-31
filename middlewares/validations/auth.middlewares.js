const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validator = require('./utils/validator.util');

class AuthMiddleware {
  constructor() {
    this.signupSchema = Joi.object()
      .options({ abortEarly: false })
      .keys({
        firstName: Joi.string().trim().min(3).max(100).required(),
        lastName: Joi.string().trim().min(3).max(100).required(),
        imageUrl: Joi.string().trim(),
        role: Joi.string().valid('user', 'business-manager', 'super-admin'),
        street: Joi.string().trim().min(3).max(100),
        city: Joi.string().trim().min(3).max(100),
        state: Joi.string().trim().min(2).max(2),
        zipCode: Joi.string().trim().min(8).max(8),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(6).max(100).required(),
        business: Joi.objectId(),
      });

    this.loginSchema = Joi.object()
      .options({ abortEarly: false })
      .keys({
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().min(6).max(100).required(),
      });
  }

  signup = (req, res, next) => {
    const validationErrors = validator.findErrors(this.signupSchema, req.body);

    if (validationErrors) {
      return res
        .status(400)
        .json(validationErrors);
    }

    next();
  };

  login = (req, res, next) => {
    const validationErrors = validator.findErrors(this.loginSchema, req.body);

    if (validationErrors) {
      return res
        .status(400)
        .json(validationErrors);
    }

    next();
  };
}

module.exports = new AuthMiddleware();
