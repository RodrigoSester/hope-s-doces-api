const { orderService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');

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
    throw err;
  }
};

module.exports = {
  registerOrder
};
