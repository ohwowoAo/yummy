"use client";

import React from "react";
import { useRecipesList } from "../hooks/useRecipesList";
import Image from "next/image";

const RecipesList = () => {
  const { recipesList } = useRecipesList();
  console.log(recipesList);

  if (!Array.isArray(recipesList)) {
    return <p>오류발생</p>;
  }
  return (
    <div className="flex gap-5 flex-wrap px-5">
      {recipesList?.map((recipe: any) => (
        <Image
          key={recipe?.id}
          src={recipe?.image}
          alt=""
          width={556} // 실제 너비
          height={370}
        />
      ))}
    </div>
  );
};

export default RecipesList;
