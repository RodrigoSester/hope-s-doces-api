const { personService } = require('../services');
const verifyExistence = require('../helpers/verify-existence.helper');

const registerPerson = async (req, res) => {
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
      created_by: id
    };
  
    const registeredPerson = await personService.register(personDTO);
    
    return res.status(201).json(registeredPerson);
  } catch (err) {
    throw err;
  }

};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await verifyExistence.personExists(id);

    return res.status(200).json(person);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  registerPerson,
  getById
}