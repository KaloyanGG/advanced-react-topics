import { useSuspenseQuery } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { Fragment } from "react/jsx-runtime";
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
        <Fragment key={idx}>
          <label htmlFor={i.name}>{i.name}</label>
          <input
            onChange={onChange}
            id={i.name}
            type='checkbox'
            name='ingredients[]'
            value={i._id}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default IngredientsContainer;
