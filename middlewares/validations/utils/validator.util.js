class Validator {
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
  
    findErrors = (schema, body) => {
      const validationErrors = schema.validate(body);
  
      if (validationErrors.error) return this.mountErrorMessage(validationErrors.error.details)
  
      return null;
    }
  }
  
 module.exports = new Validator()
  