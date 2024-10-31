"use client";

import React from "react";
import { useRecipesList } from "../hooks/useRecipesList";
import Image from "next/image";
import { Heart } from "lucide-react";

const RecipesList = () => {
  const { recipesList } = useRecipesList();
  console.log(recipesList);

  if (!Array.isArray(recipesList)) {
    return <p>오류발생</p>;
  }
  return (
    <div className="flex gap-5 flex-wrap px-5 grid grid-cols-4 ">
      {recipesList?.map((recipe: any) => (
        <div key={recipe?.id}>
          <div className="relative h-[370px]">
            <Image
              src={recipe?.image}
              alt=""
              width={556} // 실제 너비
              height={370}
              className="w-full h-full object-cover"
            />
            <p className="flex gap-1 absolute right-1	bottom-0 bg-white p-1 rounded text-xs">
              <Heart fill="#e66c69" strokeWidth={0} className="w-3" />
              like {recipe?.aggregateLikes}
            </p>
          </div>
          <div>
            <p>{recipe?.title}</p>
            <p>{recipe?.vegetarian ? "#채식주의자" : null}</p>
            <p>{recipe?.vegan ? "#비건" : null}</p>
            <p>{recipe?.veryHealthy ? "#건강식" : null}</p>
            <p>{recipe?.veryPopular ? "#Best" : null}</p>
            <p>{recipe?.occasions}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
