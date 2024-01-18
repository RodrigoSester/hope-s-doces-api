const { orderService } = require('../services');

const registerOrder = async (req, res) => {
  const { person_id, description, value, is_paid, adress } = req.body
  const { id } = req.user;

  // TODO: verify if person_id exists
  const orderDTO = {
    person_id, 
    description, 
    value, 
    is_paid, 
    adress,
    created_by: id
  }
  const registeredOrder = await orderService.register(orderDTO);
  return res.status(201).json(registeredOrder);
};

module.exports = {
  registerOrder
}