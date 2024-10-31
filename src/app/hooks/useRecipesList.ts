"use client";

import { useRecipesListQuery } from "@/api/recipesList.query";
import { useMemo } from "react";

export const useRecipesList = () => {
  const { data: res, isLoading, isError } = useRecipesListQuery();

  const savedRecipes = localStorage.getItem("recipesList");

  // 기본값으로 빈 배열 선언
  const recipesList = useMemo(() => {
    // 로컬 스토리지에서 데이터가 있는 경우
    if (savedRecipes) {
      try {
        return JSON.parse(savedRecipes); // JSON으로 파싱
      } catch (error) {
        console.error("Error parsing savedRecipes:", error); // 파싱 오류 처리
        return []; // 기본값 반환
      }
    }

    // res가 유효한 경우
    if (res) {
      localStorage.setItem("recipesList", JSON.stringify(res.recipes)); // 로컬 스토리지에 저장
      return res.recipes; // API로부터 가져온 데이터를 반환
    }

    return []; // 그 외의 경우 빈 배열 반환
  }, [res, savedRecipes]);

  // 로딩 중이거나 오류가 발생한 경우 초기값으로 빈 배열 반환
  return { recipesList, isLoading, isError };
};
