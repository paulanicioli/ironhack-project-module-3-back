const BusinessCategories = require('../models/BusinessCategory');

class BusinessCategoriesController {
  constructor() {
    this.BusinessCategories = BusinessCategories;
  }

  getAll = async (req, res, next) => {
    console.log('getAll has been called!');
    try {
      console.log('CategoriesList called and successful!');
      const categories = await this.BusinessCategories.find();

      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new BusinessCategoriesController();
