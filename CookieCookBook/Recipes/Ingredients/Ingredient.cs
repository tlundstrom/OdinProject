namespace CookieCookBook.Recipes.Ingredients;

public abstract class Ingredient
{
    public abstract string Name { get; }
    public abstract int Id { get; }
    public virtual string PreperationInstructions => "Add to other ingredients.";

    public override string ToString() =>
        $"{Id}. {Name}";
}