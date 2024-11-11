import express, { Request, Response } from "express";
import cors from "cors";
import { id } from "./helpers";
import { populateDB } from "./db/populate";
import connectDB from "./db/connection";
import IngredientModel from "./models/ingredient.model";
import RecipeModel from "./models/recipe.model";

(async () => {
  await connectDB();
  await populateDB();
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

app.post("/recipes", (req: Request, res: Response) => {
  const recipe = req.body;
  // recipesList.push({ id: id(recipesList), likes: 0, ...recipe });
  res.sendStatus(202);
});

app.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  const recipe = await RecipeModel.findById(id);
  res.send(recipe);
});

const port = 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
