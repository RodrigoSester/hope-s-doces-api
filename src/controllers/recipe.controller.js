const { spoonWeightEnum } = require('../enum');

function _calculateCostOfOne(ingredient) {
  let spoon;

  switch (ingredient.type) {
    case 'volume':
      return (ingredient.cost / ingredient.totalVolume) * ingredient.quantity;
    case 'weight':
      return (ingredient.cost / _getWeightNumber(ingredient.totalWeight)) * _getWeightNumber(ingredient.weight);
    case 'unit':
      return ingredient.cost * ingredient.quantity;
    case 'spoon':
      spoon = ingredient?.spoonWeight ? spoonWeightEnum[ingredient?.spoonWeight] : spoonWeightEnum.TABLE_FLAT;
      return ((ingredient.spoons * spoon) * ingredient.cost) / _getWeightNumber(ingredient.totalWeight);
    default:
      return 0;
  }
}

function _getWeightNumber(weight) {
  const number = parseFloat(weight);
  return isNaN(number) ? 0 : number;
}

const calculateProfit = (req, res) => {
  const {
    ingredients,
    totalTime,
    hourValue,
    productPrice,
    quantity
  } = req.body;

  let recipeCost = 0;

  for (const ingredient of ingredients) {
    const costOfIngredient = _calculateCostOfOne(ingredient);

    recipeCost += costOfIngredient;
  }

  recipeCost = parseFloat(recipeCost).toFixed(2);

  const costOfOne = recipeCost / quantity;

  const workValue = totalTime * hourValue;

  const revenue = productPrice * quantity;
  const profit = revenue - parseFloat(recipeCost);

  res.json({
    recipeCost,
    costOfOne,
    revenue,
    profit,
    workValue
  });
};

module.exports = {
  calculateProfit
};
