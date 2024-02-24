const { orderService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');
const { logger } = require('../utils');

const registerOrder = async(req, res) => {
  try {
    const { personId, description, value, isPaid, adress } = req.body;
    const { id } = req.user;

    await verifyExistence.personExists(personId);

    const orderDTO = {
      personId,
      description,
      value,
      isPaid,
      adress,
      createdBy: id
    };
    const registeredOrder = await orderService.register(orderDTO);
    return res.status(201).json(registeredOrder);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'error',
      error: err,
      code: 'internal_server_error'
    });
  }
};

const getAllOrders = async(req, res) => {
  try {
    const { limit, offset, sortBy, order } = req.queryOptions;

    const orders = await orderService.getAll(limit, offset, sortBy, order);

    return res.status(200).json(orders);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: 'error',
      error,
      code: 'internal_server_error'
    });
  }
};

const getOrderById = async(req, res) => {
  try {
    const { id } = req.params;

    const order = await verifyExistence.orderExists(id);

    return res.status(200).json(order);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: 'error',
      error,
      code: 'internal_server_error'
    });
  }
};

module.exports = {
  registerOrder,
  getAllOrders,
  getOrderById
};
