const { spoonWeightEnum } = require("../enum");

function _calculateCostOfOne(ingredient) {
  switch (ingredient.type) {
    case 'volume':
      return ingredient.cost / ingredient.quantity;
    case 'weight':
      return ingredient.cost / ingredient.total_weight;
    case 'unit':
      return ingredient.cost * ingredient.quantity;
      case 'spoon':
        const spoon = ingredient?.spoon_weight ? spoonWeightEnum[ingredient?.spoon_weight] : spoonWeightEnum.TABLE_FLAT;
        return ingredient.cost / (ingredient.total_spoons * spoon);
    default:
      return 0;
  }
}

const calculateProfit = (req, res) => {
  const {
    ingredients,
    total_time,
    hour_value,
    product_price,
    quantity
  } = req.body;
  
  let recipe_cost = 0;

  for (const ingredient of ingredients) {
    const cost_of_ingredient = _calculateCostOfOne(ingredient);
    
    recipe_cost += cost_of_ingredient;    
  }

  const cost_of_one = recipe_cost / quantity;
  
  const work_value = total_time * hour_value;

  const revenue = product_price * quantity
  const profit = revenue - recipe_cost + work_value;

  res.json({
    recipe_cost,
    cost_of_one,
    revenue,
    profit,
    work_value
  });
}

module.exports = {
  calculateProfit
};