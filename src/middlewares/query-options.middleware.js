const apply = async(req, res, next) => {
  const { limit = 10, offset = 0, sortBy = 'name', order = 'ASC' } = req.query;

  if (limit <= 0) {
    throw new Error('The limit must be greater than 0');
  } else if (offset < 0) {
    throw new Error('The offset must be greater or equal to 0');
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
