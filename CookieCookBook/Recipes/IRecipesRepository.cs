namespace CookieCookBook.Recipe;

public interface IRecipesRepository
{
    List<Recipe> Read(string filePath);
}

