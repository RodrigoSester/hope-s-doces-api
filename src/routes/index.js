const recipeRoutes = require('./_recipe');
const personRoutes = require('./_person');

const configureRoutes = server => {
  server.use(recipeRoutes),
  server.use(personRoutes)
}

module.exports = {
  configureRoutes
}