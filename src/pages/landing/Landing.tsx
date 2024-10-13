import { useState } from "react";
import { RecipeCard } from "../../components";
import { RecipeType } from "../../components/recipeCard/RecipeCard";

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
      "Boil spaghetti. Cook pancetta. Mix eggs and cheese. Combine all with spaghetti and pancetta. Season with pepper.",
    image:
      "https://th.bing.com/th/id/OIP.TbEUSKK-p1OcmiEeEgOM7AHaGl?w=211&h=187&c=7&r=0&o=5&pid=1.7",
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
    instructions:
      "Cook onions, garlic, and ginger. Add chicken and curry powder. Pour in coconut milk and simmer until chicken is cooked.",
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
      "Chop lettuce. Add croutons and cheese. Toss with Caesar dressing.",
    image:
      "https://th.bing.com/th/id/OIP.MMJq36Gu_IlHC2E5ksmY4AHaLH?w=203&h=304&c=7&r=0&o=5&pid=1.7",
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
      "Cook beef and onions. Add mushrooms and cook until tender. Stir in flour and sour cream. Simmer until thickened.",
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
      "Stir fry vegetables with garlic and ginger. Add soy sauce and cook until vegetables are tender.",
    image:
      "https://th.bing.com/th/id/OIP.VmnyfVuV9NLwp5OFlN1ZiAAAAA?w=203&h=372&c=7&r=0&o=5&pid=1.7",
  },
];

const Landing = () => {
  const [recipes, setRecipes] = useState(recipesList);
  return (
    <>
      <h1>Recipes List</h1>
      <h3>recipes count: ${recipes.length}</h3>
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </>
  );
};

export default Landing;
