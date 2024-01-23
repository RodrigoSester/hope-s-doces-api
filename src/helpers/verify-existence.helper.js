const { personService } = require('../services');

const personExists = async (person_id) => {
  const person = await personService.getById(person_id);

  if (!person) {
    throw new Error('Person not found');
  }

  return person;
};

module.exports = {
  personExists
};
