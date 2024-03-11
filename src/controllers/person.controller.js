const { personService } = require('../services');

const verifyExistence = require('../helpers/verify-existence.helper');

const { logger } = require('../utils');

const registerPerson = async(req, res) => {
  const { name, number } = req.body;
  const { id } = req.user;

  if (!name || !number) {
    return res.status(400).json({
      message: 'Missing required fields'
    });
  }

  try {
    const personDTO = {
      name,
      number,
      createdBy: id
    };

    const registeredPerson = await personService.register(personDTO);

    return res.status(201).json(registeredPerson);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'error',
      error: err,
      code: 'internal_server_error'
    });
  }
};

const getById = async(req, res) => {
  const { id } = req.params;

  try {
    const person = await verifyExistence.personExists(id);

    return res.status(200).json(person);
  } catch (err) {
    logger.error(err.message);
    return res.status(404).json({
      message: 'error',
      error: err.message,
      code: 'internal_server_error'
    });
  }
};

const getAll = async(req, res) => {
  const { limit, offset, sortBy, order } = req.queryOptions;

  const filter = {
    limit,
    offset,
    sortBy,
    order
  };

  try {
    const people = await personService.getAll(filter);

    return res.status(200).json(people);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({
      message: 'error',
      error: err,
      code: 'internal_server_error'
    });
  }
};

const remove = async(req, res) => {
  const { personId } = req.params;

  await verifyExistence.personExists(personId);

  try {
    const personDTO = {
      id: personId,
      userId: req.user.id
    };
    await personService.remove(personDTO);

    return res.status(204).send();
  } catch (err) {
    logger.error(err);

    return res.status(500).json({
      message: 'error',
      error: err,
      code: 'internal_server_error'
    });
  }
};

const getOrdersByPersonId = async(req, res) => {
  const filter = req.queryOptions;
  const { personId } = req.params;

  try {
    const person = await verifyExistence.personExists(personId);

    const orders = await personService.getOrdersByPersonId(person.id, filter);

    return res.status(200).json(orders);
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
  registerPerson,
  getById,
  getAll,
  remove,
  getOrdersByPersonId
};
