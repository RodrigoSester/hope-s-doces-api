const { orderService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');

const registerOrder = async (req, res) => {
  try {
    const { person_id, description, value, is_paid, adress } = req.body;
    const { id } = req.user;

    await verifyExistence.personExists(person_id);

    const orderDTO = {
      person_id,
      description,
      value,
      is_paid,
      adress,
      created_by: id
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
