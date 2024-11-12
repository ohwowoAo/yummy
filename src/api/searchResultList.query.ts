import { useInfiniteQuery } from "@tanstack/react-query";

const fetchSearchResults = async (value: string, pageParam: number) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const page = 20;

  if (value) {
    const BASE_URL_SEARCH = "https://api.spoonacular.com/recipes/complexSearch";
    const res = await fetch(
      `${BASE_URL_SEARCH}?apiKey=${API_KEY}&cuisine=${value}&number=${page}&offset=${pageParam}`
    );
    if (!res.ok) {
      throw new Error("오류발생");
    }
    const data = await res.json();
    return { ...data, nextId: pageParam + 5 };
  }
};

export const useSearchResultListQuery = (value: string) => {
  return useInfiniteQuery({
    queryKey: ["searchResults", value],
    queryFn: ({ pageParam = 0 }) => fetchSearchResults(value, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextId ?? 0,
  });
};
