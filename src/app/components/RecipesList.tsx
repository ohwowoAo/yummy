"use client";

import React from "react";
import { useRecipesList } from "../hooks/useRecipesList";
import Image from "next/image";
import { Heart } from "lucide-react";

const RecipesList = () => {
  const { recipesList, isLoading, isError } = useRecipesList();
  console.log(recipesList);

  // 로딩 중일 때
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  // 오류가 발생한 경우
  if (isError) {
    console.log(isError);
  }

  // recipesList가 배열이 아닐 경우 처리
  if (!Array.isArray(recipesList)) {
    return <p>잘못된 데이터 형식입니다.</p>;
  }
  return (
    <div className="gap-5 flex-wrap px-5 grid grid-cols-4 ">
      {recipesList?.map((recipe: any) => (
        <div key={recipe?.id}>
          <div className="relative">
            <Image
              src={recipe?.image}
              alt=""
              width={556} // 실제 너비
              height={370}
              className="w-full h-full object-cover rounded-lg"
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
              <p>{recipe?.vegetarian ? "#채식주의자" : null}</p>
              <p>{recipe?.vegan ? "#비건" : null}</p>
              <p>{recipe?.veryHealthy ? "#건강식" : null}</p>
              <p>{recipe?.veryPopular ? "#Best" : null}</p>
              <p>{recipe?.occasions}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipesList;
