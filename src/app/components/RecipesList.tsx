"use client";

import React from "react";
import { useRecipesList } from "../hooks/useRecipesList";
import Image from "next/image";

const RecipesList = () => {
  const { recipesList } = useRecipesList();
  console.log(recipesList);
  return (
    <div>
      <Image
        src={recipesList[0]?.image}
        alt=""
        width={556} // 실제 너비
        height={370}
      />
    </div>
  );
};

export default RecipesList;
