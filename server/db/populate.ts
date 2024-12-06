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
      "parmesan cheese",
      "black pepper",
      "butter",
    ],
    instructions:
      "Boil spaghetti in salted water until al dente. In a separate pan, melt butter and cook it slightly. In a bowl, whisk together eggs and grated Parmesan cheese. Drain the spaghetti, reserving some pasta water. Quickly mix the hot spaghetti with the egg and cheese mixture, adding a little pasta water to create a creamy sauce. Stir in the butter and season with freshly ground black pepper. Serve immediately with extra Parmesan cheese on top.",
    image:
      "https://th.bing.com/th/id/OIP.iGnkcU1QMKkdCJloykf6JAHaE8?w=282&h=188&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    id: 2,
    name: "Chicken Curry",
    likes: 5,
    ingredients: ["onions", "garlic", "ginger", "curry powder", "butter"],
    instructions:
      "In a large skillet, melt butter over medium heat. Add chopped onions, garlic, and ginger, and sauté until aromatic. Add curry powder and stir to coat the mixture. Add a small amount of water or stock and let it simmer to thicken. Serve as a flavorful topping or mix into rice or vegetables.",
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
      "black pepper",
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
      "onions",
      "mushrooms",
      "sour cream",
      "flour",
      "butter",
    ],
    instructions:
      "Slice the beef into thin strips. In a large skillet, melt butter over medium-high heat. Add the beef strips and cook until browned. Remove the beef from the skillet and set aside. In the same skillet, add sliced onions and mushrooms. Cook until the onions are translucent and the mushrooms are tender. Sprinkle flour over the vegetables and stir to combine. Gradually add water or stock, stirring constantly until the sauce thickens. Return the beef to the skillet and stir in sour cream. Cook until heated through. Serve over rice or noodles.",
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
    instructions:
      "Heat a large skillet or wok over high heat. Add a small amount of oil, followed by chopped garlic and ginger. Stir until fragrant, then add chopped vegetables. Cook while stirring frequently, then add soy sauce. Continue cooking until the vegetables are tender but still crisp. Serve immediately.",
    image:
      "https://th.bing.com/th/id/OIP.VmnyfVuV9NLwp5OFlN1ZiAAAAA?w=203&h=372&c=7&r=0&o=5&pid=1.7",
  },
  {
    id: 6,
    name: "Margherita Pizza",
    likes: 800,
    ingredients: [
      "flour",
      "parmesan cheese",
      "tomato sauce",
      "black pepper",
      "butter",
    ],
    instructions:
      "Preheat the oven to 220°C (425°F). Roll out a pizza base using flour. Spread tomato sauce over the base and sprinkle with Parmesan cheese. Drizzle with melted butter and season with freshly ground black pepper. Bake in the preheated oven for 10-15 minutes or until the crust is golden. Serve hot.",
    image:
      "https://th.bing.com/th?id=OLC.b5QX9S+NfNA%2fFA480x360&w=186&h=140&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
  },
  {
    id: 7,
    name: "Pancakes",
    likes: 1234,
    ingredients: ["flour", "milk", "eggs", "butter", "sugar"],
    instructions:
      "In a bowl, whisk together flour, sugar, and a pinch of salt. In a separate bowl, mix eggs and milk. Gradually combine the wet ingredients with the dry, mixing until smooth. Heat a pan over medium heat and melt some butter. Pour a ladleful of batter into the pan and cook until bubbles form on the surface. Flip and cook the other side until golden brown. Serve with your choice of toppings.",
    image:
      "https://th.bing.com/th?id=OSK.mmcolR6qXhBpGIAy-FQpGwuk5r1ltXhliJGYm3RI2fwlLp-E&w=130&h=100&c=8&o=6&dpr=2&pid=SANGAM",
  },
  {
    id: 8,
    name: "Grilled Salmon",
    likes: 567,
    ingredients: ["butter", "garlic", "parsley", "black pepper", "onions"],
    instructions:
      "Preheat the grill to medium heat. In a small bowl, mix melted butter, minced garlic, chopped parsley, and black pepper. Brush the mixture over the salmon and grill for 4-5 minutes per side or until cooked through. Serve with grilled onions on the side.",
    image:
      "https://th.bing.com/th?id=OSK.a7b624df6fac273984e6478d6c35dc83&w=226&h=339&rs=2&qlt=80&o=6&cdv=1&dpr=2&pid=16.1",
  },
];

const ingredients = [
  { name: "spaghetti" },
  { name: "eggs" },
  { name: "butter" },
  { name: "black pepper" },
  { name: "parmesan cheese" },
  { name: "onions" },
  { name: "garlic" },
  { name: "ginger" },
  { name: "curry powder" },
  { name: "romaine lettuce" },
  { name: "croutons" },
  { name: "caesar dressing" },
  { name: "beef" },
  { name: "mushrooms" },
  { name: "sour cream" },
  { name: "flour" },
  { name: "broccoli" },
  { name: "carrots" },
  { name: "bell peppers" },
  { name: "soy sauce" },
  { name: "milk" },
  { name: "sugar" },
  { name: "parsley" },
  { name: "tomato sauce" },
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
