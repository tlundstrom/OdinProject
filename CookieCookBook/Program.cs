using CookieCookBook.App;
using CookieCookBook.DataAccess;
using CookieCookBook.FileAccess;
using CookieCookBook.Recipe;
using CookieCookBook.Recipes.Ingredients;


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