const { logger } = require('../config');

const apply = async(req, res, next) => {
  const { limit = 10, offset = 0, sortBy, order } = req.query;

  if (limit <= 0) {
    logger.error('The limit must be greater than 0');
    return res.status(400).json({
      message: 'The limit must be greater than 0'
    });
  } else if (offset < 0) {
    logger.error('The limit must be greater than 0');
    return res.status(400).json({
      message: 'The offset must be greater or equal to 0'
    });
  }

  req.queryOptions = {
    limit,
    offset,
    sortBy,
    order
  };

  next();
};

module.exports = {
  apply
};
