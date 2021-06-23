const Products = require('../models/Product');
const Businesses = require('../models/Business');
const Orders = require('../models/Order');
const Users = require('../models/User');

class OrderController {
  constructor() {
    this.Products = Products;
    this.Businesses = Businesses;
    this.Orders = Orders;
    this.Users = Users;
  }

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await this.Orders.findById(id)
        .populate('business')
        .populate('user')
        .populate('products');

      if (order === null) {
        res
          .status(404)
          .json({ message: `Pedido com id ${id} não foi encontrado.` });
        return;
      }

      res.status(200).json(order);
    } catch (error) {
      console.log(error);
    }
  };

  createOne = async (req, res, next) => {
    try {
      const newOrder = new this.Orders({
        ...req.body,
      });

      await newOrder.save();

      res.status(201).json({ _id: newOrder._id });
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

      const updatedOrder = await this.Orders.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!updatedOrder) {
        return res.status(401).json({
          message: `Pedido com ID ${id} não consta no banco de dados.`,
        });
      }

      res.status(200).json({ message: `Pedido com ID ${id} foi atualizado.` });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new OrderController();
