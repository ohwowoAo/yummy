import React from "react";
import Category from "./components/Category";
import RecipesList from "./components/RecipesList";

const MainContent = () => {
  return (
    <div>
      <Category />
      <RecipesList />
    </div>
  );
};

export default MainContent;
