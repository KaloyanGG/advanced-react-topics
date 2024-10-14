import { useState } from "react";
import { RecipeCard } from "../../components";
import { RecipeType } from "../../components/recipeCard/RecipeCard";
import "./Landing.css";
const recipesList: RecipeType[] = [
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
    instructions:
      "Cut the vegetables into bite-sized pieces. Heat oil in a large wok or skillet over high heat. Add minced garlic and grated ginger, and cook for 30 seconds until fragrant. Add the vegetables and stir-fry for 5-7 minutes until they are tender-crisp. Pour in soy sauce and stir to coat the vegetables evenly. Cook for another minute. Serve hot over rice or noodles.",
    image:
      "https://th.bing.com/th/id/OIP.VmnyfVuV9NLwp5OFlN1ZiAAAAA?w=203&h=372&c=7&r=0&o=5&pid=1.7",
  },
];

const Landing = () => {
  const [recipes, setRecipes] = useState(recipesList);
  return (
    <>
      <h1>Recipes List</h1>
      <h3>Found: {recipes.length}</h3>
      <div className='recipes-container'>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </>
  );
};

export default Landing;
