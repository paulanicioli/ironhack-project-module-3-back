const Products = require('../models/Product');
const Businesses = require('../models/Business');
const ProductCategories = require('../models/ProductCategory');

class ProductController {
  constructor() {
    this.Products = Products;
    this.Businesses = Businesses;
    this.ProductCategories = ProductCategories;
  }

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await this.Products.findById(id)
        .populate('business')
        .populate('productCategory');

      if (product === null) {
        res
          .status(404)
          .json({ message: `Produto com id ${id} não foi encontrado.` });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  };

  createOne = async (req, res, next) => {
    try {
      const newProduct = new this.Products({
        ...req.body,
      });

      if (req.user) {
        newProduct.creator = req.user.id;
      }

      await newProduct.save();

      res.status(201).json({ _id: newProduct._id });
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

      const updatedProduct = await this.Products.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatedProduct) {
        return res.status(401).json({
          message: `Produto com ID ${id} não consta no banco de dados.`,
        });
      }

      res.status(200).json({ message: `Produto com ID ${id} foi atualizado.` });
    } catch (error) {
      console.log(error);
    }
  };

  deleteOne = async (req, res, next) => {
    const { id } = req.params;

    try {
      const deletedProduct = await this.Products.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(401).json({
          message: `Produto com id ${id} não encontrado no banco de dados.`,
        });
      }

      res.status(200).json({
        message: `Produto com ID ${id} foi removido do banco de dados.`,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new ProductController();
