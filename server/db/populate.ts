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
      "Boil spaghetti in salted water until al dente. In a separate pan, melt butter and cook it slightly. In a bowl, whisk together eggs and grated parmesan cheese. Drain the spaghetti, reserving some pasta water. Quickly mix the hot spaghetti with the egg and cheese mixture, adding a little pasta water to create a creamy sauce. Stir in the butter and season with freshly ground black pepper. Serve immediately with extra parmesan cheese on top.",
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
      "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg",
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
      "Wash and chop the romaine lettuce into bite-sized pieces. In a large bowl, toss the lettuce with Caesar dressing until evenly coated. Add croutons and grated parmesan cheese. Toss again to combine. Serve immediately, garnished with additional parmesan cheese and freshly ground black pepper if desired.",
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
      "https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg",
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
      "Preheat the oven to 220°C (425°F). Roll out a pizza base using flour. Spread tomato sauce over the base and sprinkle with parmesan cheese. Drizzle with melted butter and season with freshly ground black pepper. Bake in the preheated oven for 10-15 minutes or until the crust is golden. Serve hot.",
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
  {
    id: 9,
    name: "Tomato Basil Soup",
    ingredients: [
      "tomato",
      "basil",
      "garlic",
      "onion",
      "vegetable broth",
      "olive oil",
    ],
    instructions:
      "Sauté chopped onions and garlic in olive oil until translucent. Add chopped tomatoes and cook until softened. Pour in vegetable broth and bring to a boil. Reduce heat and simmer for 20 minutes. Blend the mixture until smooth. Stir in chopped basil, season with salt and pepper, and serve warm.",
    image:
      "https://www.happyfoodstube.com/wp-content/uploads/2020/03/creamy-tomato-basil-soup-image.jpg",
  },
  {
    id: 10,
    name: "Lemon Herb Chicken",
    ingredients: [
      "chicken breasts",
      "lemon",
      "garlic",
      "rosemary",
      "thyme",
      "olive oil",
    ],
    instructions:
      "Marinate chicken breasts in a mixture of lemon juice, minced garlic, chopped rosemary, thyme, and olive oil for at least 30 minutes. Grill or bake the chicken until fully cooked. Serve with lemon slices and a sprinkle of fresh herbs.",
    image:
      "https://thewholecook.com/wp-content/uploads/2024/04/Lemon-Herb-Marinated-Grilled-Chicken-1-5-500x500.jpg",
  },
  {
    id: 11,
    name: "Vegetarian Lasagna",
    ingredients: [
      "Lasagna noodles",
      "ricotta cheese",
      "spinach",
      "mozarella cheese",
      "mushrooms",
      "marinara Sauce",
    ],
    instructions:
      "Layer cooked lasagna noodles with a mixture of ricotta cheese and sautéed spinach, sliced mushrooms, and marinara sauce. Repeat layers and top with shredded mozzarella cheese. Bake until the cheese is melted and bubbly.",
    image:
      "https://www.simplyrecipes.com/thmb/sdTBmeRjdzbQ11qBVJfjbPU54Hs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__11__Vegetarian-Lasagna-LEAD-1-6173a71bfd1347aa8d7659150e87b8f4.jpg",
  },
  {
    id: 12,
    name: "Honey Lemon Tea",
    ingredients: ["honey", "lemon", "ginger", "water"],
    instructions:
      "Boil water and pour over slices of fresh ginger. Let it steep for 5 minutes. Add lemon juice and honey to taste. Stir well and serve warm.",
    image:
      "https://teakruthi.com/cdn/shop/articles/Honey-and-Lemon-Tea-For-Sore-Throats_grande.jpg?v=1591156445",
  },
  {
    id: 13,
    name: "mozarella Caprese Salad",
    ingredients: [
      "fresh mozarella",
      "tomatoes",
      "basil",
      "olive oil",
      "balsamic glaze",
    ],
    instructions:
      "Slice fresh mozzarella and tomatoes. Arrange them alternately on a plate. Top with fresh basil leaves. Drizzle with olive oil and balsamic glaze. Season with salt and pepper to taste.",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F3b432b41ce04c96a08d77befa42b9881a587a436",
  },
  {
    id: 14,
    name: "Garlic Bread",
    ingredients: ["baguette", "garlic", "butter", "parsley"],
    instructions:
      "Mix softened butter with minced garlic and chopped parsley. Slice the baguette and spread the garlic butter mixture on each slice. Wrap in foil and bake until crispy.",
    image:
      "https://www.simplyrecipes.com/thmb/5JwdiUjcSPTxyuhmdqv8pM8kWs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Garlic-Bread-METHOD-2-3-1c5f5cfa8bf6408c84c0596eea83f8e8.jpg",
  },
  {
    id: 15,
    name: "Eggplant parmesan",
    ingredients: [
      "eggplant",
      "marinara sauce",
      "mozarella cheese",
      "parmesan cheese",
      "breadcrumbs",
    ],
    instructions:
      "Slice eggplant and coat with breadcrumbs. Fry until golden brown. Layer fried eggplant slices with marinara sauce and cheeses. Bake until the cheese is melted and bubbly.",
    image:
      "https://thehotelleela.com/wp-content/uploads/2021/10/finished-eggplant-parmesan-with-spaghetti-and-basil-Copyright-David-Lewetag-II-scaled.jpg",
  },
  {
    id: 16,
    name: "Butter Cookies",
    ingredients: ["butter", "sugar", "flour", "vanilla extract"],
    instructions:
      "Cream together butter and sugar. Add vanilla extract and flour, mixing until a dough forms. Shape the dough into cookies and bake until golden brown.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCSLWOG3O6NvDavkm98WTdNPaUdMiylMXxA&s",
  },
  {
    id: 17,
    name: "Greek Salad",
    ingredients: [
      "romaine Lettuce",
      "cucumbers",
      "tomatoes",
      "red onions",
      "olives",
      "feta cheese",
      "lemon",
      "oregano",
    ],
    instructions:
      "Toss chopped romaine lettuce with sliced cucumbers, tomatoes, red onions, and olives. Top with crumbled feta cheese. Drizzle with lemon juice and sprinkle with oregano.",
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-6-1.jpg",
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
  { name: "basil" },
  { name: "mozzarella" },
  { name: "olive oil" },
  { name: "lemon" },
  { name: "honey" },
  { name: "ricotta cheese" },
  { name: "spinach" },
  { name: "marinara sauce" },
  { name: "baguette" },
  { name: "eggplant" },
  { name: "breadcrumbs" },
  { name: "vanilla extract" },
  { name: "feta cheese" },
  { name: "oregano" },
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
