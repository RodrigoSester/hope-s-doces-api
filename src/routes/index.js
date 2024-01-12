const recipeRoutes = require('./_recipe');
const personRoutes = require('./_person');
const userRoutes = require('./_user');

const configureRoutes = server => {
  server.use(recipeRoutes),
  server.use(personRoutes),
  server.use(userRoutes)
}

module.exports = {
  configureRoutes
}