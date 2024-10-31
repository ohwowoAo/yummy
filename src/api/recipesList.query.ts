import { useQuery } from "@tanstack/react-query";

// API 요청 함수
const fetchRandomRecipes = async () => {
  const BASE_URL = "https://api.spoonacular.com/recipes/random";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(`${BASE_URL}?apiKey=${API_KEY}&number=20`);
  if (!res.ok) {
    throw new Error("Failed to fetch random recipes");
  }
  return res.json(); // JSON 응답 반환
};
export const useRecipesListQuery = () => {
  return useQuery({
    queryKey: ["randomRecipes"], // 쿼리 키
    queryFn: fetchRandomRecipes, // API 요청 함수
  });
};
