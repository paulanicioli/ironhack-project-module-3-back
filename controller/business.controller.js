const Businesses = require('../models/Business');
const Products = require('../models/Product');
const Schedules = require('../models/Schedule');
const ProductCategory = require('../models/ProductCategory');

const Maps = require('./mapsApi.controller');

class BusinessController {
  constructor() {
    this.Businesses = Businesses;
    this.Products = Products;
    this.Schedules = Schedules;
  }

  getAll = async (req, res, next) => {
    try {
      const { category } = req.query;
      const businesses = await this.Businesses.find({});

      res.status(200).json(businesses);
    } catch (error) {
      console.log(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const business = await this.Businesses.findById(id);

      //If business is null, there's no need to search for it's products and schedule;
      if (business === null) {
        res
          .status(404)
          .json({ message: `Negócio com id ${id} não foi encontrado.` });
        return;
      }

      const businessProducts = await this.Products.find({
        business: business._id,
      }).populate('productCategory');

      const businessSchedules = await this.Schedules.find({
        business: business._id,
      });

      // Returns the business object, its products and its schedule
      res.status(200).json({
        business,
        products: businessProducts,
        schedules: businessSchedules,
      });
    } catch (error) {
      console.log(error);
    }
  };

  createOne = async (req, res, next) => {
    const coordinates = req.body.fullAddress ? await Maps.geocode(req.body.fullAddress) : [0, 0]

    try {
      const newBusiness = new this.Businesses({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        verified: true,
        address: {
          location: {
            type: "Point",
            coordinates
          }
        }
        // creator: req.user.id,
      });

      console.log(newBusiness)

      if (req.user) {
        newBusiness.creator = req.user.id;
      }

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

      const updatedBusiness = await this.Businesses.findByIdAndUpdate(
        id,
        body,
        { new: true }
      );

      if (!updatedBusiness) {
        return res.status(401).json({
          message: `Negócio com ID ${id} não consta no banco de dados.`,
        });
      }

      res.status(200).json({ message: `Negócio com ID ${id} foi atualizado.` });
    } catch (error) {
      console.log(error);
    }
  };

  deleteOne = async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedBusiness = await this.Businesses.findByIdAndDelete(id);

      if (!deletedBusiness) {
        return res.status(401).json({
          message: `Negócio com id ${id} não encontrado no banco de dados.`,
        });
      }

      res.status(200).json({
        message: `Negócio com ID ${id} foi removido do banco de dados.`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateAll = async (req, res, next) => {
    try {
      await this.Businesses.updateMany({}, { address: {
        location: {
          type: "Point",
          coordinates: [1, 2]
        }
      }})
    } catch(error) {
      console.log(error)
    }

    // this.Businesses.updateMany({}, { $unset: { }})
  }
}

module.exports = new BusinessController();
