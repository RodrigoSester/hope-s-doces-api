const { personService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');

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
    throw err;
  }
};

const getById = async(req, res) => {
  const { id } = req.params;

  try {
    const person = await verifyExistence.personExists(id);

    return res.status(200).json(person);
  } catch (err) {
    throw err;
  }
};

const getAll = async(req, res) => {
  const { limit, offset, sortBy, order } = req.query_options;

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
    throw err;
  }
};

module.exports = {
  registerPerson,
  getById,
  getAll
};
