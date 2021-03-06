const BusinessCategories = require('../models/BusinessCategory');
const Businesses = require('../models/Business');

class BusinessCategoriesController {
  constructor() {
    this.BusinessCategories = BusinessCategories;
    this.Businesses = Businesses;
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this.BusinessCategories.find();

      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
    }
  };

  getAllBusinessFromCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      const businesses = await this.Businesses.find({
        businessCategory: categoryId,
      }).populate('businessCategory');

      return res.status(200).json(businesses);
    } catch (error) {
      console.log(error);
    }
  };

  filterFromCategoryAndDistance = async (req, res, next) => {
    const { categoryId } = req.params;
    const { lat, lng, searchRadius } = req.query;

    try {
      const businesses = await Businesses.find(
        { 
          businessCategory: categoryId,
          "address.location": {
            $near: {
              $geometry: {
                  type: "Point" ,
                  coordinates: [lng, lat]
                },
              $maxDistance: parseInt(searchRadius) * 1000
            }
          }
        }
      ).populate('businessCategory');

      return res.status(200).json(businesses);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new BusinessCategoriesController();
