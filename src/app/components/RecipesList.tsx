"use client";

import React, { useEffect, useState } from "react";
import { useRecipesList } from "../hooks/useRecipesList";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSearchResultList } from "../hooks/useSearchResultList";

const RecipesList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [recipesList, setRecipesList] = useState([]);
  const {
    data: randomRecipes,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useRecipesList();
  // console.log(recipesList);
  const {
    data: searchResults,
    isLoading: loadingRandom,
    isError: errorRandom,
  } = useSearchResultList(category || "");

  useEffect(() => {
    if (category) {
      if (searchResults) {
        setRecipesList(searchResults);
      }
    } else {
      if (randomRecipes) {
        setRecipesList(randomRecipes);
      }
    }
  }, [category, searchResults, randomRecipes]);

  if (loadingSearch || loadingRandom) return <p>Loading...</p>;
  if (errorSearch || errorRandom) return <p>Error occurred!</p>;

  // recipesList가 배열이 아닐 경우 처리
  if (!Array.isArray(recipesList)) {
    return <p>잘못된 데이터 형식입니다.</p>;
  }
  return (
    <div className="gap-5 flex-wrap px-5 grid grid-cols-4 ">
      {recipesList?.map((recipe: any) => (
        <div key={recipe?.id}>
          <div className="relative w-full pb-[66.5%]">
            <Image
              src={recipe?.image}
              alt=""
              fill
              className="object-cover rounded-lg"
            />
            <p className="flex gap-1 absolute right-2	bottom-3 bg-white px-1 rounded text-xs items-center">
              <span className="text-[#e66c69] flex 	items-center">
                <Heart fill="#e66c69" strokeWidth={0} className="w-3" />
                like
              </span>
              <span className="text-slate-950 font-semibold	">
                {recipe?.aggregateLikes}
              </span>
            </p>
          </div>
          <div>
            <p className="text-slate-950 line-clamp-2 h-[50px]">
              {recipe?.title}
            </p>
            <div className="text-slate-600 text-sm flex gap-1">
              {recipe?.vegetarian && <p>#채식주의자</p>}
              {recipe?.vegan && <p>#비건</p>}
              {recipe?.veryHealthy && <p>#건강식</p>}
              {recipe?.veryPopular && <p>#Best</p>}
              {recipesList &&
                recipe &&
                recipe.occasions &&
                recipe.occasions.length > 1 && (
                  <p># {recipe.occasions.join(", ")}</p>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
