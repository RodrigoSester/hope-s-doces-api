const express = require('express');
const routes = express.Router();

const controller = require('../controllers/recipe.controller');

routes.post('/recipe/profit', controller.calculateProfit);

module.exports = routes;
