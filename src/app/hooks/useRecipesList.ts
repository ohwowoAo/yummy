"use client";

import { useRecipesListQuery } from "@/api/recipesList.query";
import { useMemo } from "react";

export const useRecipesList = () => {
  const { data: res, isLoading, isError } = useRecipesListQuery();

  const recipesList = useMemo(() => {
    const savedRecipes = localStorage.getItem("recipesList");

    if (savedRecipes) {
      return JSON.parse(savedRecipes);
    }

    localStorage.setItem("recipesList", JSON.stringify(res?.recipes));
    return res?.recipes;
  }, [res]);

  //로컬에 저장 , 로컬에 이미 있으면 더이상 안불러오는거지
  return { recipesList, isLoading, isError };
};
