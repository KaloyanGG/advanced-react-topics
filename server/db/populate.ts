import IngredientModel from "../models/ingredient.model";
import RecipeModel from "../models/recipe.model";

const recipesList = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    likes: 3,
    ingredients: [
      "spaghetti",
      "eggs",
      "pancetta",
      "parmesan cheese",
      "black pepper",
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
      "chicken",
      "curry powder",
      "coconut milk",
      "onions",
      "garlic",
      "ginger",
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
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "caesar dressing",
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
      "beef",
      "mushrooms",
      "onions",
      "sour cream",
      "butter",
      "flour",
    ],
    instructions:
      "Slice the beef into thin strips. In a large skillet, melt butter over medium-high heat. Add the beef strips and cook until browned. Remove the beef from the skillet and set aside. In the same skillet, add sliced onions and mushrooms. Cook until the onions are translucent and the mushrooms are tender. Sprinkle flour over the vegetables and stir to combine. Gradually add beef broth, stirring constantly until the sauce thickens. Return the beef to the skillet and stir in sour cream. Cook until heated through. Serve over egg noodles or rice.",
    image:
      "https://ohsnapmacros.com/wp-content/uploads/2023/12/beefstroganoff.jpg",
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    likes: 12,
    ingredients: [
      "broccoli",
      "carrots",
      "bell peppers",
      "soy sauce",
      "garlic",
      "ginger",
    ],
    instructions: "One line instruction",
    image:
      "https://th.bing.com/th/id/OIP.VmnyfVuV9NLwp5OFlN1ZiAAAAA?w=203&h=372&c=7&r=0&o=5&pid=1.7",
  },
];

const ingredients = [
  { name: "spaghetti" },
  { name: "eggs" },
  { name: "pancetta" },
  { name: "parmesan cheese" },
  { name: "black pepper" },
  { name: "chicken" },
  { name: "curry powder" },
  { name: "coconut milk" },
  { name: "onions" },
  { name: "garlic" },
  { name: "ginger" },
  { name: "romaine lettuce" },
  { name: "croutons" },
  { name: "caesar dressing" },
  { name: "beef" },
  { name: "mushrooms" },
  { name: "sour cream" },
  { name: "butter" },
  { name: "flour" },
  { name: "broccoli" },
  { name: "carrots" },
  { name: "bell peppers" },
  { name: "soy sauce" },
];

export async function populateDB() {
  try {
    await IngredientModel.deleteMany({});
    await RecipeModel.deleteMany({});
    const insertedIngredients = await IngredientModel.insertMany(ingredients);
    console.log("Ingredients inserted successfully");
    const ingredientMap = new Map<string, string>();
    insertedIngredients.forEach((ingredient) => {
      ingredientMap.set(ingredient.name, ingredient._id.toString());
    });
    const recipesWithIngredientIds = recipesList.map((recipe) => ({
      ...recipe,
      ingredients: recipe.ingredients.map((ingredientName) =>
        ingredientMap.get(ingredientName)
      ),
    }));
    await RecipeModel.insertMany(recipesWithIngredientIds);
    console.log("Recipes inserted successfully");
  } catch (error) {
    console.error("Error populating the database:", error);
  }
}
