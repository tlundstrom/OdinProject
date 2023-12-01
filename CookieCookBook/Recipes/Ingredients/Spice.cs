namespace CookieCookBook.Recipes.Ingredients;

public abstract class Spice : Ingredient
{
    public override string PreperationInstructions => $"Take half a teaspoon. {base.PreperationInstructions}";
}
