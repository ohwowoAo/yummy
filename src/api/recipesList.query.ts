import { useQuery } from "@tanstack/react-query";

// export const useRecipesListQuery = () => {
//   return useQuery(["randomRecipes"], async () => {
//     const API_KEY = "42f16ee60d054057bcf06a6cb472f624";
//     const BASE_URL = "https://api.spoonacular.com/recipes/random";

//     const res = await fetch(`${BASE_URL}?apiKey=${API_KEY}$number=5`);
//     if (!res.ok) {
//       throw new Error("error");
//     }
//     return res;
//   });
// };

// API 요청 함수
const fetchRandomRecipes = async () => {
  //   const res = await fetch(`${BASE_URL}?apiKey=${API_KEY}&number=5`);
  //   if (!res.ok) {
  //     throw new Error("Failed to fetch random recipes");
  //   }
  //   return res.json(); // JSON 응답 반환
  // };
  // export const useRecipesListQuery = () => {
  //   return useQuery({
  //     queryKey: ["randomRecipes"], // 쿼리 키
  //     queryFn: fetchRandomRecipes, // API 요청 함수
  //   });
};
