const { personService } = require('../services');

const personExists = async(personId) => {
  const person = await personService.getById(personId);

  if (!person) {
    throw new Error(`Person with id ${personId} not found`);
  }

  return person;
};

module.exports = {
  personExists
};
