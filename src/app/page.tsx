"use client";
import { useRecipesList } from "./hooks/useRecipesList";

export default function Home() {
  const { recipesList } = useRecipesList();

  return <div>{recipesList.recipes.vegetarian}</div>;
}
