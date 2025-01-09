"use client";

import { useRecipesListQuery } from "@/api/recipesList.query";
import { useMemo } from "react";

export const useRecipesList = () => {
  const { data: res, isLoading, isError } = useRecipesListQuery();

  const savedRecipes = localStorage.getItem("recipesList");

  // 기본값으로 빈 배열 선언
  const data = useMemo(() => {
    let list = [];

    // 로컬 스토리지에서 데이터가 있는 경우
    if (savedRecipes) {
      try {
        return JSON.parse(savedRecipes); // JSON으로 파싱
      } catch (error) {
        console.error("Error parsing savedRecipes:", error); // 파싱 오류 처리
        return []; // 기본값 반환
      }
    } else if (res) {
      // res가 유효한 경우
      list = res.recipes;
      localStorage.setItem("recipesList", JSON.stringify(res.recipes)); // 로컬 스토리지에 저장
    }

    // 이미지가 빈 문자열이 아닌 항목만 필터링하여 반환
    return list.filter(
      (recipe: { image: string }) => recipe.image && recipe.image.trim() !== ""
    );
  }, [res, savedRecipes]);

  // 로딩 중이거나 오류가 발생한 경우 초기값으로 빈 배열 반환
  return { data, isLoading, isError };
};
