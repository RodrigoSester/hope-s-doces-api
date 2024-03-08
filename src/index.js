const express = require('express');
const cors = require('cors');
const { configureRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use(cors());

configureRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

module.exports = app;
