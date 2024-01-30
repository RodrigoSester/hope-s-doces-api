const { orderService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');
const { logger } = require('../config');

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

module.exports = {
  registerOrder
};
