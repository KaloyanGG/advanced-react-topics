import express, { Request, Response } from "express";
import cors from "cors";
import { id } from "./helpers";
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

    const previousRecipes = await RecipeModel.find({ _id: { $lt: id } })
      .sort({ _id: -1 })
      .limit(2);

    const nextRecipes = await RecipeModel.find({ _id: { $gt: id } })
      .sort({ _id: 1 })
      .limit(2);

    const recipes = [
      ...previousRecipes.reverse(),
      currentRecipe,
      ...nextRecipes,
    ];

    res.json({
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
