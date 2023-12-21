const express = require('express');
const app = express();

app.post('/', (req, res) => {
  const {
    ingredients,
    total_time,
    hour_value,
    product_price,
    quantity
  } = req.body;
  

  
  let recipe_cost = 0;
  for (const ingredient of ingredients) {
    const cost_of_ingredient = calculateCostOfOne(ingredient);
    
    recipe_cost += cost_of_ingredient;
    
    const cost_of_one = recipe_cost / quantity; // return cost of one

  }
  
  total_time * hour_value;

  const faturamento = product_price * quantity
  const lucro = faturamento - recipe_cost

  res.json({
    recipe_cost,
    cost_of_one,
    faturamento,
    lucro
  });
});


function calculateCostOfOne(ingredient) {
  const cost_of_one_box = ingredient.cost / ingredient.quantity; // custo de uma embalagem, por exemplo
  const cost_of_g = ingredient.cost / ingredient.weight; // custo da grama
  const product_cost_total = ingredient.cost * ingredient.quantity; // custo do produto total

  return cost_of_one;
}

app.listen(3000, () => console.log('Server running on port 3000'));