const recipesList = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    likes: 3,
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Pancetta",
      "Parmesan cheese",
      "Black pepper",
    ],
    instructions:
      "Boil spaghetti in salted water until al dente. In a separate pan, cook pancetta until crispy. In a bowl, whisk together eggs and grated Parmesan cheese. Drain the spaghetti, reserving some pasta water. Quickly mix the hot spaghetti with the egg and cheese mixture, adding a little pasta water to create a creamy sauce. Stir in the pancetta and season with freshly ground black pepper. Serve immediately with extra Parmesan cheese on top.",
    image:
      "https://th.bing.com/th/id/OIP.iGnkcU1QMKkdCJloykf6JAHaE8?w=282&h=188&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    id: 2,
    name: "Chicken Curry",
    likes: 5,
    ingredients: [
      "Chicken",
      "Curry powder",
      "Coconut milk",
      "Onions",
      "Garlic",
      "Ginger",
    ],
    instructions: "Perfect.",
    image:
      "https://th.bing.com/th/id/OIP.E6h1K_AfzDjWo8SA_T802wHaJQ?w=203&h=254&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 3,
    name: "Caesar Salad",
    likes: 1003,
    ingredients: [
      "Romaine lettuce",
      "Croutons",
      "Parmesan cheese",
      "Caesar dressing",
    ],
    instructions:
      "Wash and chop the romaine lettuce into bite-sized pieces. In a large bowl, toss the lettuce with Caesar dressing until evenly coated. Add croutons and grated Parmesan cheese. Toss again to combine. Serve immediately, garnished with additional Parmesan cheese and freshly ground black pepper if desired.",
    image:
      "https://www.thespruceeats.com/thmb/DRaBINVopeoHOpjJn66Yh7pMBSc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-caesar-salad-recipe-996054-Hero_01-33c94cc8b8e841ee8f2a815816a0af95.jpg",
  },
  {
    id: 4,
    name: "Beef Stroganoff",
    likes: 953,
    ingredients: [
      "Beef",
      "Mushrooms",
      "Onions",
      "Sour cream",
      "Butter",
      "Flour",
    ],
    instructions:
      "Slice the beef into thin strips. In a large skillet, melt butter over medium-high heat. Add the beef strips and cook until browned. Remove the beef from the skillet and set aside. In the same skillet, add sliced onions and mushrooms. Cook until the onions are translucent and the mushrooms are tender. Sprinkle flour over the vegetables and stir to combine. Gradually add beef broth, stirring constantly until the sauce thickens. Return the beef to the skillet and stir in sour cream. Cook until heated through. Serve over egg noodles or rice.",
    image:
      "https://th.bing.com/th/id/OIP.7rIzNaYnV0mDmPEo-WSx0QHaKx?w=203&h=295&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    likes: 12,
    ingredients: [
      "Broccoli",
      "Carrots",
      "Bell peppers",
      "Soy sauce",
      "Garlic",
      "Ginger",
    ],
    instructions: "One line instruction",
    image:
      "https://th.bing.com/th/id/OIP.VmnyfVuV9NLwp5OFlN1ZiAAAAA?w=203&h=372&c=7&r=0&o=5&pid=1.7",
  },
];
const ingredients = [
  "spaghetti",
  "eggs",
  "pancetta",
  "parmesan cheese",
  "black pepper",
  "chicken",
  "curry powder",
  "coconut milk",
  "onions",
  "garlic",
  "ginger",
  "romaine lettuce",
  "croutons",
];

import express, { Request, Response } from "express";
import cors from "cors";
import { id } from "./helpers";

const app = express();

app.use(cors(), express.json());

app.get("/", (req, res, next) => {
  res.send(200);
});

app.get("/recipes", (_, res) => {
  res.send(recipesList);
});
app.get("/ingredients", (_, res) => {
  res.send(ingredients);
});

app.post("/recipes", (req: Request, res: Response) => {
  const recipe = req.body;
  recipesList.push({ id: id(recipesList), likes: 0, ...recipe });
  res.sendStatus(202);
});

app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const recipeById = recipesList.find((r) => r.id === parseInt(id));
  if (recipeById) {
    res.status(200).send(recipeById);
  } else {
    res.sendStatus(404);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
