const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validator = require('./utils/validator.util');

class BusinessValidator {
  constructor() {
    this.creationSchema = Joi.object()
      .options({ abortEarly: false })
      .keys({
        name: Joi.string().trim().min(3).max(50).required(),
        street: Joi.string().trim().min(3).max(100),
        city: Joi.string().trim().min(3).max(100),
        state: Joi.string().trim().min(2).max(2),
        zipCode: Joi.string().trim().min(8).max(9),
        imageUrl: Joi.string().trim(),
        phoneNumber: Joi.string()
          .required()
          .pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/),
        timezone: Joi.string().trim(),
        businessCategory: Joi.objectId(),
        verified: Joi.boolean(),
      });
  }

  createOne = (req, res, next) => {
    const validationErrors = validator.findErrors(
      this.creationSchema,
      req.body
    );

    if (validationErrors) {
      console.log(validationErrors);
      return res.status(400).json(validationErrors);
    }

    next();
  };

  //Check what will be sent with update request (if all properties or only the modified ones)
}

module.exports = new BusinessValidator();
