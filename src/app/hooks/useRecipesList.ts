import { useRecipesListQuery } from "@/api/recipesList.query";
import { useMemo } from "react";

export const useRecipesList = () => {
  const { data: res } = useRecipesListQuery();

  const recipesList = useMemo(() => res ?? [], [res]);

  return recipesList;
};
