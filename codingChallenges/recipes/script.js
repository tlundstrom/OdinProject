const recipes = ["bread", "sandwich", "burger"];
const ingredients = [
  ["yeast", "flour"],
  ["bread", "meat"],
  ["sandwich", "meat", "bread"],
];
const supplies = ["yeast", "flour", "meat"];

var findAllRecipes = function (recipes, ingredients, supplies) {
  const missing = {};

  const recipeMap = new Map();

  let foundRecipes = [];

  for (const supply of supplies) {
    recipeMap.set(supply);
  }

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredient = ingredients[i];
    let makable = true;
    missing[recipe] = [];

    for (const ingred of ingredient) {
      console.log(ingred);
      makable = makable && recipeMap.has(ingred);
      if (!recipeMap.has(ingred)) missing[recipe].push[ingred];
    }
    if (makable) {
      recipeMap.set(recipe);
      foundRecipes.push(recipe);
      delete missing[recipe];
    }
  }

  return foundRecipes;
};

findAllRecipes(recipes, ingredients, supplies);
