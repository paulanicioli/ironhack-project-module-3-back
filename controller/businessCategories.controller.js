const BusinessCategories = require('../models/BusinessCategory');

class BusinessCategoriesController {
  constructor() {
    this.BusinessCategories = BusinessCategories;
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this.BusinessCategories.find();

      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new BusinessCategoriesController();
