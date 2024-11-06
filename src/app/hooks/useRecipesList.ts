"use client";

import { useRecipesListQuery } from "@/api/recipesList.query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useRecipesList = (value: string) => {
  const [page, setPage] = useState(1);
  const [allRecipes, setAllRecipes] = useState<unknown[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { data: res, isLoading, isError } = useRecipesListQuery(value, page);
  const savedRecipes = localStorage.getItem("recipesList");
  // console.log("savedRecipes: ", savedRecipes);
  // console.log("page", page);
  // 기본값으로 빈 배열 선언
  const data = useMemo(() => {
    if (!value) {
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
        // 모든 페이지의 데이터를 배열로 결합
        list = res.pages.flatMap((page) => page.recipes || []);
        localStorage.setItem("recipesList", JSON.stringify(list)); // 로컬 스토리지에 저장
      }

      // 이미지가 빈 문자열이 아닌 항목만 필터링하여 반환
      return list.filter(
        (recipe: { image: string }) =>
          recipe.image && recipe.image.trim() !== ""
      );
    } else if (value && res) {
      console.log("res: ", res);

      const results = res.pages.flatMap((page) => page.results || []);
      return results.filter(
        (recipe: { image: string }) =>
          recipe.image && recipe.image.trim() !== ""
      );
    }
  }, [res, savedRecipes, value]);

  useEffect(() => {
    setPage(1); // 페이지를 1로 초기화
    setAllRecipes([]); // 이전 데이터 초기화
  }, [value]);

  useEffect(() => {
    if (data) {
      setAllRecipes((prev: unknown[]) => [...prev, ...data]);
    }
  }, [data]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev: number) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading]
  );

  // 로딩 중이거나 오류가 발생한 경우 초기값으로 빈 배열 반환
  return { data: allRecipes, isLoading, isError, loadMoreRef };
};
