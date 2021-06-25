const Products = require('../models/Product');
const Businesses = require('../models/Business');
const Orders = require('../models/Order');
const Users = require('../models/User');

const jwtManager = require('../utils/jwt.utils');

class OrderController {
  constructor() {
    this.Products = Products;
    this.Businesses = Businesses;
    this.Orders = Orders;
    this.Users = Users;
    this.jwtManager = jwtManager;
  }

  findOwner = async (req, res, next) => {
    try {
      const { token } = req.body;
      const userId = this.jwtManager.checkUserId(token).id;

      const orders = await this.Orders.find({ user: userId })
        .populate('business')
        .populate('user')
        .populate('products');

      if (orders.length === 0) {
        res
          .status(404)
          .json({ message: `Usuário com id ${id} não tem nenhum pedido.` });
        return;
      }
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  };

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
      const rawOrder = req.body;
      const products = rawOrder.order.map((element) => {
        return element.product;
      });
      const quantities = rawOrder.order.map((element) => {
        return element.quantity;
      });
      const comments = rawOrder.order.map((element) => {
        return element.comment;
      });

      const userId = await this.jwtManager.checkUserId(req.body.token).id;

      const newOrder = new this.Orders({});

      newOrder.products = products;
      newOrder.quantities = quantities;
      newOrder.comments = comments;
      newOrder.user = userId;
      newOrder.business = req.body.business;
      newOrder.totalPrice = rawOrder.totalPrice;

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
