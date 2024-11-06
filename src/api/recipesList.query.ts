import { useInfiniteQuery } from "@tanstack/react-query";

const fetchSearchResults = async (value: string, pageParam: number) => {
  const BASE_URL_RANDOM = "https://api.spoonacular.com/recipes/random";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const page = 20;

  if (value) {
    const BASE_URL_SEARCH = "https://api.spoonacular.com/recipes/complexSearch";
    const res = await fetch(
      `${BASE_URL_SEARCH}?apiKey=${API_KEY}&cuisine=${value}&number=${page}&offset=${
        (pageParam - 1) * page
      }`
    );
    if (!res.ok) {
      throw new Error("오류발생");
    }
    return res.json();
  }

  // 카테고리가 없을 경우 랜덤 레시피 API 호출
  const res = await fetch(
    `${BASE_URL_RANDOM}?apiKey=${API_KEY}&number=${page}&offset=${
      (pageParam - 1) * page
    }`
  );
  if (!res.ok) {
    throw new Error("오류발생");
  }
  return res.json(); // JSON 응답 반환
};

export const useRecipesListQuery = (value: string, page: number) => {
  return useInfiniteQuery({
    queryKey: ["searchResults", value, page],
    queryFn: ({ pageParam = page }) => fetchSearchResults(value, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지를 체크하여 다음 페이지 번호를 결정합니다.
      return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
