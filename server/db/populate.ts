import IngredientModel from "../models/ingredient.model";
import RecipeModel from "../models/recipe.model";

const recipesList = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    ingredients: [
      "spaghetti",
      "eggs",
      "bacon",
      "parmesan cheese",
      "black pepper",
      "garlic",
      "olive oil",
      "salt",
    ],
    instructions:
      "Cook spaghetti according to package instructions. While pasta is cooking, fry bacon in olive oil until crispy, then set aside. In the same pan, sauté minced garlic for 1-2 minutes. In a bowl, whisk together eggs, grated parmesan, and black pepper. Once spaghetti is done, drain and quickly toss with the egg mixture, ensuring it coats the pasta evenly. Add crispy bacon and season with salt and more pepper to taste. Serve immediately.",
    image:
      "https://th.bing.com/th/id/OIP.iGnkcU1QMKkdCJloykf6JAHaE8?w=282&h=188&c=7&r=0&o=5&dpr=2&pid=1.7",
  },
  {
    id: 2,
    name: "Chicken Curry",
    ingredients: [
      "chicken",
      "onions",
      "garlic",
      "ginger",
      "tomatoes",
      "curry powder",
      "coconut milk",
      "vegetable oil",
      "salt",
      "coriander",
    ],
    instructions:
      "In a large pot, heat vegetable oil over medium heat. Add chopped onions, garlic, and ginger, and sauté until soft. Add curry powder and stir for a minute. Add chicken pieces and cook until browned. Pour in chopped tomatoes and coconut milk, and stir to combine. Let it simmer for 20-30 minutes, or until the chicken is cooked through. Season with salt and garnish with fresh coriander. Serve with rice or naan.",
    image:
      "https://www.foodandwine.com/thmb/8YAIANQTZnGpVWj2XgY0dYH1V4I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-chicken-curry-FT-RECIPE0321-58f84fdf7b484e7f86894203eb7834e7.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    ingredients: [
      "romaine lettuce",
      "croutons",
      "parmesan cheese",
      "caesar dressing",
      "garlic",
      "olive oil",
      "lemon juice",
      "anchovy fillets",
      "black pepper",
    ],
    instructions:
      "In a large bowl, toss chopped romaine lettuce with croutons and grated parmesan cheese. In a separate small bowl, combine caesar dressing, minced garlic, olive oil, lemon juice, and mashed anchovy fillets. Pour the dressing over the salad and toss to coat evenly. Season with black pepper to taste. Serve immediately, optionally adding extra parmesan or croutons.",
    image:
      "https://www.thespruceeats.com/thmb/DRaBINVopeoHOpjJn66Yh7pMBSc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-caesar-salad-recipe-996054-Hero_01-33c94cc8b8e841ee8f2a815816a0af95.jpg",
  },
  {
    id: 4,
    name: "Beef Stroganoff",
    ingredients: [
      "beef sirloin",
      "onions",
      "garlic",
      "mushrooms",
      "beef broth",
      "sour cream",
      "flour",
      "butter",
      "paprika",
      "salt",
      "pepper",
      "egg noodles",
    ],
    instructions:
      "Cook egg noodles according to package instructions. In a large skillet, melt butter over medium heat. Add sliced onions and garlic, sautéing until soft. Add mushrooms and cook until browned. Stir in flour and paprika, cooking for a minute. Gradually add beef broth while stirring to form a sauce. Add beef sirloin and cook until browned and tender. Lower the heat and stir in sour cream. Season with salt and pepper. Serve the beef mixture over the cooked egg noodles.",
    image:
      "https://ohsnapmacros.com/wp-content/uploads/2023/12/beefstroganoff.jpg",
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    ingredients: [
      "broccoli",
      "carrots",
      "bell peppers",
      "snow peas",
      "onions",
      "garlic",
      "ginger",
      "soy sauce",
      "sesame oil",
      "vegetable oil",
      "green onions",
      "sesame seeds",
    ],
    instructions:
      "Heat vegetable oil in a wok or large skillet over medium-high heat. Add chopped onions, garlic, and ginger, and sauté for 1-2 minutes until aromatic. Add the broccoli, carrots, bell peppers, and snow peas, and stir-fry for 5-7 minutes until tender-crisp. Pour in soy sauce and a splash of sesame oil, and stir to coat the vegetables. Cook for another 2 minutes, then remove from heat. Garnish with sliced green onions and sesame seeds. Serve with rice or noodles.",
    image:
      "https://kristineskitchenblog.com/wp-content/uploads/2024/01/vegetable-stir-fry-22-3.jpg",
  },
  {
    id: 6,
    name: "Margherita Pizza",
    ingredients: [
      "pizza dough",
      "tomato sauce",
      "mozzarella cheese",
      "fresh basil",
      "olive oil",
      "salt",
      "garlic",
      "parmesan cheese",
    ],
    instructions:
      "Preheat the oven to 475°F (245°C). Roll out the pizza dough on a floured surface. Spread a thin layer of tomato sauce over the dough, leaving a small border around the edges. Tear mozzarella cheese into pieces and distribute evenly over the sauce. Drizzle with olive oil and sprinkle with a pinch of salt. Bake for 10-12 minutes, or until the crust is golden and the cheese is bubbling. Remove from the oven and top with fresh basil leaves. Finish with a light sprinkle of parmesan cheese and a drizzle of olive oil. Slice and serve.",
    image:
      "https://th.bing.com/th?id=OLC.b5QX9S+NfNA%2fFA480x360&w=186&h=140&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2",
  },
  {
    id: 7,
    name: "Pancakes",
    ingredients: [
      "flour",
      "milk",
      "eggs",
      "baking powder",
      "sugar",
      "salt",
      "butter",
      "vanilla extract",
      "maple syrup",
    ],
    instructions:
      "In a large bowl, whisk together flour, baking powder, sugar, and salt. In a separate bowl, beat the eggs, then add milk, melted butter, and vanilla extract. Pour the wet ingredients into the dry ingredients and stir until just combined (lumps are okay). Heat a non-stick skillet over medium heat and lightly grease with butter or oil. Pour batter onto the skillet, forming pancakes of your desired size. Cook for 2-3 minutes on each side until golden brown. Serve with maple syrup and your favorite toppings.",
    image:
      "https://th.bing.com/th?id=OSK.mmcolR6qXhBpGIAy-FQpGwuk5r1ltXhliJGYm3RI2fwlLp-E&w=130&h=100&c=8&o=6&dpr=2&pid=SANGAM",
  },
  {
    id: 8,
    name: "Grilled Salmon",
    ingredients: [
      "salmon fillets",
      "olive oil",
      "lemon",
      "garlic",
      "fresh dill",
      "salt",
      "pepper",
    ],
    instructions:
      "Preheat the grill to medium-high heat. Brush salmon fillets with olive oil and season with salt, pepper, and minced garlic. Place the salmon on the grill, skin-side down, and cook for about 4-5 minutes per side, depending on thickness. Squeeze fresh lemon juice over the salmon while grilling. Once cooked through, remove from the grill and garnish with fresh dill. Serve with lemon wedges on the side.",
    image:
      "https://th.bing.com/th?id=OSK.a7b624df6fac273984e6478d6c35dc83&w=226&h=339&rs=2&qlt=80&o=6&cdv=1&dpr=2&pid=16.1",
  },
  {
    id: 9,
    name: "Tomato Basil Soup",
    ingredients: [
      "tomatoes",
      "onions",
      "garlic",
      "vegetable broth",
      "basil",
      "olive oil",
      "heavy cream",
      "salt",
      "pepper",
    ],
    instructions:
      "Heat olive oil in a large pot over medium heat. Add chopped onions and garlic, and sauté until softened. Add chopped tomatoes and cook for a few minutes. Pour in vegetable broth and bring to a simmer. Let it cook for 15-20 minutes. Add fresh basil leaves and season with salt and pepper. Use an immersion blender or a regular blender to puree the soup until smooth. Stir in heavy cream and adjust seasoning if needed. Serve hot, garnished with extra basil.",
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
      "olive oil",
      "rosemary",
      "thyme",
      "parsley",
      "salt",
      "pepper",
    ],
    instructions:
      "In a bowl, whisk together olive oil, lemon juice, minced garlic, chopped rosemary, thyme, salt, and pepper. Place chicken breasts in a resealable bag or shallow dish and pour the marinade over the chicken. Let it marinate in the fridge for at least 30 minutes, or up to 4 hours. Preheat the grill or skillet over medium heat. Cook the chicken for 6-7 minutes per side, or until fully cooked and golden brown. Garnish with fresh parsley and serve with your favorite sides.",
    image:
      "https://thewholecook.com/wp-content/uploads/2024/04/Lemon-Herb-Marinated-Grilled-Chicken-1-5-500x500.jpg",
  },
  {
    id: 11,
    name: "Vegetarian Lasagna",
    ingredients: [
      "lasagna noodles",
      "ricotta cheese",
      "mozzarella cheese",
      "parmesan cheese",
      "spinach",
      "zucchini",
      "mushrooms",
      "onions",
      "garlic",
      "tomato sauce",
      "olive oil",
      "basil",
      "oregano",
      "salt",
      "pepper",
    ],
    instructions:
      "Preheat the oven to 375°F (190°C). Cook lasagna noodles according to package instructions and drain. In a pan, heat olive oil and sauté chopped onions, garlic, zucchini, and mushrooms until softened. Add spinach and cook until wilted. Stir in tomato sauce, basil, oregano, salt, and pepper. In a bowl, combine ricotta cheese with a little salt and pepper. In a baking dish, layer the lasagna by spreading a thin layer of sauce, followed by noodles, ricotta mixture, and shredded mozzarella cheese. Repeat layers until all ingredients are used, ending with a layer of sauce and mozzarella on top. Sprinkle parmesan cheese on top and cover with foil. Bake for 25 minutes, then remove foil and bake for an additional 10-15 minutes, until bubbly and golden. Let it cool for a few minutes before serving.",
    image:
      "https://www.simplyrecipes.com/thmb/sdTBmeRjdzbQ11qBVJfjbPU54Hs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__11__Vegetarian-Lasagna-LEAD-1-6173a71bfd1347aa8d7659150e87b8f4.jpg",
  },
  {
    id: 12,
    name: "Honey Lemon Tea",
    ingredients: ["water", "lemon", "honey", "ginger (optional)"],
    instructions:
      "Boil water in a kettle or pot. While the water is heating, slice the lemon and, if using, grate or slice the ginger. Once the water has boiled, pour it into a cup. Add the lemon slices and a teaspoon of honey to the cup. Stir until the honey dissolves. If using ginger, add it to the tea for an extra kick. Let it steep for a few minutes, then enjoy warm.",
    image:
      "https://teakruthi.com/cdn/shop/articles/Honey-and-Lemon-Tea-For-Sore-Throats_grande.jpg?v=1591156445",
  },
  {
    id: 13,
    name: "Mozarella Caprese Salad",
    ingredients: [
      "mozzarella cheese",
      "tomatoes",
      "fresh basil",
      "olive oil",
      "balsamic vinegar",
      "salt",
      "pepper",
    ],
    instructions:
      "Slice the mozzarella cheese and tomatoes into thick rounds. Arrange them alternately on a plate, layering with fresh basil leaves. Drizzle olive oil and balsamic vinegar over the top. Season with salt and pepper to taste. Serve immediately as a refreshing appetizer or side dish.",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F3b432b41ce04c96a08d77befa42b9881a587a436",
  },
  {
    id: 14,
    name: "Garlic Bread",
    ingredients: [
      "baguette",
      "butter",
      "garlic",
      "parsley",
      "salt",
      "olive oil",
    ],
    instructions:
      "Preheat the oven to 375°F (190°C). Slice the baguette into even pieces. In a bowl, mix softened butter with minced garlic, chopped parsley, and a pinch of salt. Spread the garlic butter mixture generously on each slice of bread. Arrange the slices on a baking sheet and drizzle with a little olive oil. Bake for 10-12 minutes, or until the bread is golden and crispy. Serve warm.",
    image:
      "https://www.simplyrecipes.com/thmb/5JwdiUjcSPTxyuhmdqv8pM8kWs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Garlic-Bread-METHOD-2-3-1c5f5cfa8bf6408c84c0596eea83f8e8.jpg",
  },
  {
    id: 15,
    name: "Eggplant parmesan",
    ingredients: [
      "eggplant",
      "flour",
      "eggs",
      "bread crumbs",
      "parmesan cheese",
      "mozzarella cheese",
      "tomato sauce",
      "garlic",
      "basil",
      "olive oil",
      "salt",
      "pepper",
    ],
    instructions:
      "Preheat the oven to 375°F (190°C). Slice the eggplant into rounds and sprinkle with salt. Let it sit for 10 minutes to draw out excess moisture, then pat dry. Set up a breading station with flour, beaten eggs, and a mixture of bread crumbs and grated parmesan cheese. Dip each eggplant slice into the flour, then the egg, and finally the bread crumbs. Heat olive oil in a skillet over medium heat and fry the breaded eggplant slices until golden brown, about 2-3 minutes per side. In a baking dish, layer fried eggplant slices, tomato sauce, mozzarella cheese, and fresh basil. Repeat layers until all ingredients are used. Top with extra mozzarella and parmesan. Bake for 20-25 minutes, until bubbly and golden. Serve hot.",
    image:
      "https://thehotelleela.com/wp-content/uploads/2021/10/finished-eggplant-parmesan-with-spaghetti-and-basil-Copyright-David-Lewetag-II-scaled.jpg",
  },
  {
    id: 16,
    name: "Butter Cookies",
    ingredients: [
      "butter",
      "sugar",
      "flour",
      "vanilla extract",
      "salt",
      "egg yolk",
    ],
    instructions:
      "Preheat the oven to 350°F (175°C). In a bowl, cream together softened butter and sugar until light and fluffy. Add the egg yolk and vanilla extract, mixing until combined. Gradually add the flour and a pinch of salt, mixing until the dough comes together. Roll the dough into small balls or shape with a cookie cutter. Place on a baking sheet lined with parchment paper and gently flatten each cookie with a fork. Bake for 10-12 minutes, or until the edges are golden. Allow to cool before serving.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCSLWOG3O6NvDavkm98WTdNPaUdMiylMXxA&s",
  },
  {
    id: 17,
    name: "Greek Salad",
    ingredients: [
      "cucumbers",
      "tomatoes",
      "red onion",
      "kalamata olives",
      "feta cheese",
      "olive oil",
      "lemon",
      "oregano",
      "salt",
      "pepper",
    ],
    instructions:
      "Chop the cucumbers, tomatoes, and red onion into bite-sized pieces. In a large bowl, combine the vegetables, olives, and chunks of feta cheese. Drizzle with olive oil and squeeze fresh lemon juice over the salad. Season with oregano, salt, and pepper to taste. Toss gently to combine. Serve immediately as a refreshing side dish or light meal.",
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-6-1.jpg",
  },
];

const ingredientsSet = new Set<string>();
recipesList.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    ingredientsSet.add(ingredient);
  });
});

const ingredients = Array.from(ingredientsSet).map((ingredient) => ({
  name: ingredient,
}));

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
