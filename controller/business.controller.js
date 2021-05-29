const Businesses = require('../models/Business');
const Products = require('../models/Product');
const Schedules = require('../models/Schedule');

class BusinessController {
  constructor() {
    this.Businesses = Businesses;
    this.Products = Products;
  }

  getAllFromCategory = async (req, res, next) => {
    try {
      const { category } = req.query;
      const businesses = await this.Businesses.find({
        businessCategory: category,
      });

      res.status(200).json(businesses);
    } catch (error) {
      console.log(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const business = await this.Businesses.findById(id);

      const businessProducts = await this.Products.find({
        business: business._id,
      });

      const businessSchedule = await this.Schedules.find({
        business: business._id,
      });

      if (business === null) {
        res
          .status(404)
          .json({ message: `Negócio com id ${id} não foi encontrado.` });
        return;
      }
      // Returns the business object, its products and its schedule
      res.status(200).json({
        ...business,
        products: businessProducts,
        schedules: businessSchedule,
      });
    } catch (error) {
      console.log(error);
    }
  };

  createOne = async (req, res, next) => {
    try {
      const newBusiness = new this.Businesses({
        ...req.body,
        creator: req.user.id,
      });

      await newBusiness.save();

      res.status(201).json({ _id: newBusiness._id });
    } catch (error) {
      console.log(error);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const {
        params: { id },
        body,
      } = req;

      await this.Businesses.findByIdAndUpdate(id, body);

      res.status(200).json({ message: `Negócio com ID ${id} foi atualizado` });
    } catch (error) {
      console.log(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      await this.Businesses.findByIdAndDelete(id);

      res.status(200).json({ message: `Negócio com ID ${id} foi removido.` });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new BusinessController();
