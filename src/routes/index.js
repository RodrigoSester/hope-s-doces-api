const recipeRoutes = require('./_recipe');
const personRoutes = require('./_person');
const userRoutes = require('./_user');
const orderRoutes = require('./_order');

const configureRoutes = server => {
  server.use(recipeRoutes),
  server.use(personRoutes),
  server.use(userRoutes),
  server.use(orderRoutes)
}

module.exports = {
  configureRoutes
}