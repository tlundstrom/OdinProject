using CookieCookBook.Recipes.Ingredients;

namespace CookieCookBook.App;

public interface IRecipesUserInteraction
{
    void Exit();
    void ShowMessage(string message);
    void PrintExistingRecipes(IEnumerable<Recipe> allRecipes);
    void promptToCreateRecipe();
    IEnumerable<Ingredient> ReadIgredientsFromUser();
}
