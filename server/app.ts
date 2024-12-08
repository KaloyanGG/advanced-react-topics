import express, { Request, Response } from "express";
import cors from "cors";
import { populateDB } from "./db/populate";
import connectDB from "./db/connection";
import IngredientModel from "./models/ingredient.model";
import RecipeModel from "./models/recipe.model";

(async () => {
  await connectDB();
  populateDB();
})();

const app = express();

app.use(cors(), express.json());

app.get("/", (req, res, next) => {
  res.send(200);
});

app.get("/recipes", async (_, res) => {
  const recipes = await RecipeModel.find({});
  res.send(recipes);
});
app.get("/ingredients", async (_, res) => {
  const ingredients = await IngredientModel.find({});
  res.send(ingredients);
});

app.post("/recipes", async (req: Request, res: Response) => {
  const recipe = req.body;
  if (!recipe) {
    res.sendStatus(400);
    return;
  }
  await RecipeModel.insertMany(recipe);
  res.sendStatus(202);
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await RecipeModel.findById(id);
  res.send(recipe);
});

app.get("/recipes/details/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const currentRecipe = await RecipeModel.findById(id);
    if (!currentRecipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    // Get all recipes sorted by _id
    const allRecipes = await RecipeModel.find().sort({ _id: 1 });

    // Find the index of the current recipe
    const currentIndex = allRecipes.findIndex(
      (recipe) => recipe._id.toString() === id
    );

    if (currentIndex === -1) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }

    const totalRecipes = allRecipes.length;

    // Helper function to get the recipe at a specific index, wrapping around if necessary
    const getRecipeAt = (index: any) =>
      allRecipes[(index + totalRecipes) % totalRecipes];

    // Get the 5 recipes according to the specified logic
    const recipes = [
      getRecipeAt(currentIndex - 2),
      getRecipeAt(currentIndex - 1),
      getRecipeAt(currentIndex),
      getRecipeAt(currentIndex + 1),
      getRecipeAt(currentIndex + 2),
    ];

    // setTimeout(() => {
    res.json({
      recipes,
    });
    // }, 200);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
