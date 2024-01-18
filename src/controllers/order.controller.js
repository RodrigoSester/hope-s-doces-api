

const registerOrder = async (req, res) => {
  const { person_id, description, value, is_paid, adress } = req.body
  // TODO: get user id of middleware

  // TODO: verify if person_id exists
  const orderDTO = {
    person_id, 
    description, 
    value, 
    is_paid, 
    adress
  }
  const registeredOrder = await orderService.register(orderDTO);
  return res.status(201).json(registeredOrder);
};

module.exports = {
  registerOrder
}