namespace CookieCookBook.Recipes.Ingredients;

public abstract class Flour : Ingredient
{
    public override string PreperationInstructions => $"Sift. {base.PreperationInstructions}";
}