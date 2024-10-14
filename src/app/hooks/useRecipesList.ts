"use client";

import { useRecipesListQuery } from "@/api/recipesList.query";
import { useMemo } from "react";

export const useRecipesList = () => {
  const { data: res, isLoading, isError } = useRecipesListQuery();

  const recipesList = useMemo(() => res?.recipes ?? [], [res]);

  return { recipesList, isLoading, isError };
};
