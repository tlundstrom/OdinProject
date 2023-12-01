﻿using CookieCookBook.Recipe;
using CookieCookBook.Recipes.Ingredients;
using System.Text.Json;

const FileFormat Format = FileFormat.Json;

IStringsRepository stringsRepository = Format == FileFormat.Json ?
    new StringsJsonRepository() :
    new StringsTextualRepository();

const string FileName = "recipes";
var fileMetadata = new FileMetadata(FileName, Format);

var ingredientsRegister = new IngredientsRegister();

var cookiesRecipesApp = new CookiesRecipeApp(
    new RecipesRepository(
        stringsRepository,
        ingredientsRegister),
    new RecipesConsoleUserInteraction(
        ingredientsRegister));
cookiesRecipesApp.Run(fileMetadata.ToPath());

public class FileMetadata
{
    public string Name { get; }
    public FileFormat Format { get; }
    public FileMetadata(string name, FileFormat format)
    {
        Name = name;
        Format = format;
    }
    public string ToPath() => $"{Name}.{Format.AsFileExtension()}";
}

public static class FileFormatExtensions
{
    public static string AsFileExtension(this FileFormat fileFormat) =>
        fileFormat == FileFormat.Json ? "json" : "txt";
}
public enum FileFormat
{
    Json,
    Txt
}

public class CookiesRecipeApp
{
    private readonly RecipesRepository _recipesRepository;
    private readonly IRecipesUserInteraction _recipesUserInteraction;

    public CookiesRecipeApp(
        RecipesRepository recipesRepository,
        IRecipesUserInteraction recipesUserInteraction)
    {
        _recipesRepository = recipesRepository;
        _recipesUserInteraction = recipesUserInteraction;
    }

    public void Run(string filePath)
    {
        var allRecipes = _recipesRepository.Read(filePath);
        _recipesUserInteraction.PrintExistingRecipes(allRecipes);

        _recipesUserInteraction.promptToCreateRecipe();

        var ingredients = _recipesUserInteraction.ReadIgredientsFromUser();

        if (ingredients.Count() > 0)
        {
            var recipe = new Recipe(ingredients);
            allRecipes.Add(recipe);
            _recipesRepository.Write(filePath, allRecipes);

            _recipesUserInteraction.ShowMessage("Recipe added:");
            _recipesUserInteraction.ShowMessage(recipe.ToString());
        }
        else
        {
            _recipesUserInteraction.ShowMessage(
                "No ingredients have been selected." +
                "Recipe will not be saved.");
        }
        _recipesUserInteraction.Exit();
    }
}

public interface IRecipesUserInteraction
{
    void Exit();
    void ShowMessage(string message);
    void PrintExistingRecipes(IEnumerable<Recipe> allRecipes);
    void promptToCreateRecipe();
    IEnumerable<Ingredient> ReadIgredientsFromUser();
}

public interface IIngredientsRegister
{
    IEnumerable<Ingredient> All { get; }
    Ingredient GetById(int id);
}

public class IngredientsRegister : IIngredientsRegister
{
    public IEnumerable<Ingredient> All { get; } = new List<Ingredient>
    {
        new WheatFlour(),
        new SpeltFlour(),
        new Butter(),
        new Chocolate(),
        new Sugar(),
        new Cardamom(),
        new Cinnamon(),
        new CocoaPowder()
    };

    public Ingredient GetById(int id)
    {
        foreach (var ingredient in All)
        {
            if (ingredient.Id == id)
            {
                return ingredient;
            }
        }
        return null;
    }
}

public class RecipesConsoleUserInteraction: IRecipesUserInteraction
{
    private readonly IIngredientsRegister _ingredientsRegister;

    public RecipesConsoleUserInteraction(
        IIngredientsRegister ingredientsRegister)
    {
        _ingredientsRegister = ingredientsRegister;
    }
    public void Exit()
    {
        Console.WriteLine("Press any key to close.");
        Console.ReadKey();
    }

    public void ShowMessage(string message)
    {
        Console.WriteLine(message);
    }
    public void PrintExistingRecipes(IEnumerable<Recipe> allRecipes)
    {
        
        if(allRecipes.Count()>0)
        {
            Console.WriteLine("Existing recipes are:" + Environment.NewLine);

            int counter = 1;
            foreach (var recipe in allRecipes)
            {
                Console.WriteLine($"*****{counter}*****");
                Console.WriteLine(recipe);
                Console.WriteLine();
                ++counter;
            }
        }
    }

    public void promptToCreateRecipe()
    {
        Console.WriteLine("Create a new cookie recipe! " +
            "Available ingredients are:");

        foreach (var ingredient in _ingredientsRegister.All)
        {
            Console.WriteLine(ingredient);
        }
    }

    public IEnumerable<Ingredient> ReadIgredientsFromUser()
    {
        bool shallStop = false;
        var ingredients = new List<Ingredient>();

        while(!shallStop)
        {
            Console.WriteLine("Add an ingredient by it's ID, " +
                "or type anything else if finished.");
            
            var userInput = Console.ReadLine();

            if(int.TryParse(userInput, out int id))
            {
                var selectedIngredient = _ingredientsRegister.GetById(id);
                if(selectedIngredient is not null)
                {
                    ingredients.Add(selectedIngredient);
                }
            }
            else
            {
                shallStop = true;
            }
        }
        return ingredients;
    }
}

public interface IRecipesRepository
{
    List<Recipe> Read(string filePath);
}
public class RecipesRepository: IRecipesRepository
{
    private readonly IStringsRepository _stringsRepository;
    private readonly IIngredientsRegister _ingredientsRegister;
    private const string Separator = ",";

    public RecipesRepository(IStringsRepository stringsRepository, IIngredientsRegister ingredientsRegister)
    {
        _stringsRepository = stringsRepository;
        _ingredientsRegister = ingredientsRegister;
    }

    public List<Recipe> Read(string filePath)
    {
        List<string> recipesFromFile = _stringsRepository.Read(filePath);
        var recipes = new List<Recipe>();

        foreach (var recipeFromFile in recipesFromFile)
        {
            var recipe = RecipeFromString(recipeFromFile);
            recipes.Add(recipe);
        }
        return recipes;
    }

    private Recipe RecipeFromString(string recipeFromFile)
    {
        var textualIds = recipeFromFile.Split(Separator);
        var ingredients = new List<Ingredient>();

        foreach (var textualId in textualIds)
        {
            var id = int.Parse(textualId);
            var ingredient = _ingredientsRegister.GetById(id);
            ingredients.Add(ingredient);

        }

        return new Recipe(ingredients);
    }

    public void Write(string filePath, List<Recipe> allRecipes)
    {
        var recipesAsStrings = new List<string>();
        foreach (var recipe in allRecipes)
        {
            var allIds = new List<int>();
            foreach (var ingredient in recipe.Ingredients)
            {
                allIds.Add(ingredient.Id);
            }
            recipesAsStrings.Add(string.Join(Separator, allIds));
        }
        _stringsRepository.Write(filePath, recipesAsStrings);
    }
}

public interface IStringsRepository
{
    List<string> Read(string filePath);
    void Write(string filePath, List<string> strings);
}

class StringsTextualRepository : IStringsRepository
{
    private static readonly string Seperator = Environment.NewLine;

    public List<string> Read(string filePath)
    {
        if (File.Exists(filePath))
        { 
            var fileContents = File.ReadAllText(filePath);
            return fileContents.Split(Seperator).ToList();
        }
        return new List<string>();
    }

    public void Write(string filePath, List<string> strings)
    {
        File.WriteAllText(filePath, string.Join(Seperator, strings));
    }
}
class StringsJsonRepository : IStringsRepository
{
    public List<string> Read(string filePath)
    {
        if (File.Exists(filePath))
        {
            var fileContents = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<List<string>>(fileContents);
        }
        return new List<string>();
    }

    public void Write(string filePath, List<string> strings)
    {
        File.WriteAllText(filePath, JsonSerializer.Serialize(strings));
    }
}