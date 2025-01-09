import { useQuery } from "@tanstack/react-query";

const fetchInfomation = async (recipesNum: number | null) => {
  const BASE_URL = `https://api.spoonacular.com/recipes/${recipesNum}/information`;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(`${BASE_URL}?apiKey=${API_KEY}`);
  if (!res.ok) {
    throw new Error("새고로침 해주세요.");
  }
  return res.json();
};

export const useInfomationQuery = (recipesNum: number | null) => {
  return useQuery({
    queryKey: ["info"],
    queryFn: () => fetchInfomation(recipesNum),
    enabled: recipesNum !== null, // recipesNum이 null일 때 쿼리 실행하지 않도록
  });
};
