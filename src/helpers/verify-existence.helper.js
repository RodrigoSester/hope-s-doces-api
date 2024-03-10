const bcrypt = require('bcrypt');

const { personService, orderService } = require('../services');

const personExists = async(personId) => {
  const person = await personService.getById(personId);

  if (!person) {
    throw new Error(`Person with id ${personId} not found`);
  }

  return person;
};

const orderExists = async(orderId) => {
  const order = await orderService.getById(orderId);

  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }

  return order;
};

const verifyPassword = async(password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return isPasswordValid;
};

module.exports = {
  personExists,
  orderExists,
  verifyPassword
};
