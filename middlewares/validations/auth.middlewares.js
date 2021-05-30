const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

class AuthMiddleware {
  constructor() {
    this.signupSchema = Joi.object()
      .options({ abortEarly: false })
      .keys({
        firstName: Joi.string().trim().min(3).max(100).required(),
        lastName: Joi.string().trim().min(3).max(100).required(),
        imageUrl: Joi.string(),
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
    const validationErrors = this.signupSchema.validate(req.body);

    if (validationErrors.error) {
      return res
        .status(400)
        .json(this.mountErrorMessage(validationErrors.error.details));
    }

    next();
  };

  login = (req, res, next) => {
    const validationErrors = this.loginSchema.validate(req.body);

    if (validationErrors.error) {
      return res
        .status(400)
        .json(this.mountErrorMessage(validationErrors.error.details));
    }

    next();
  };

  mountErrorMessage = (errorDetails) => {
    const fieldErrors = errorDetails.map((error) => {
      return {
        field: error.context.key,
        message: error.message,
      };
    });
    return {
      message: 'Houve um problema com sua requisição.',
      error: fieldErrors,
    };
  };
}

module.exports = new AuthMiddleware();
