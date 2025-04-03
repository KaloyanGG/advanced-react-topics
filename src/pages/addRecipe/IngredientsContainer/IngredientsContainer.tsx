import { useSuspenseQuery } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { fetchIngredients } from "../../../services/ingredientsService";

const IngredientsContainer = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { data: ingredients = [] } = useSuspenseQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 2,
  });

  return (
    <div className='ingredients-container'>
      {ingredients.map((i, idx) => (
        <div className='ingredient-and-checkbox' key={idx}>
          <label htmlFor={i.name}>{i.name}</label>
          <input
            onChange={onChange}
            id={i.name}
            type='checkbox'
            name='ingredients[]'
            value={i._id}
          />
        </div>
      ))}
    </div>
  );
};

export default IngredientsContainer;
