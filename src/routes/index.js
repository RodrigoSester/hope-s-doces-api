const recipeRoutes = require('./_recipe');

const configureRoutes = server => {
  server.use(recipeRoutes)
}

module.exports = {
  configureRoutes
}