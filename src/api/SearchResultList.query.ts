import { useQuery } from "@tanstack/react-query";

const fetchSearchResults = async (value: string) => {
  const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(
    `${BASE_URL}?apiKey=${API_KEY}&cuisine=${value}&number=20`
  );
  if (!res.ok) {
    throw new Error("오류발생");
  }
  return res.json();
};

export const useSearchResultListQuery = (value: string) => {
  return useQuery({
    queryKey: ["searchResults", value],
    queryFn: () => fetchSearchResults(value),
  });
};
