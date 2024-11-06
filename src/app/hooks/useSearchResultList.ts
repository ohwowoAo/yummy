// import { useSearchResultListQuery } from "@/api/SearchResultList.query";
// import { useMemo } from "react";

// export const useSearchResultList = (value: string) => {
//   const { data: res, isLoading, isError } = useSearchResultListQuery(value);

//   const data = useMemo(() => {
//     if (!res) return [];
//     const results = res.results;
//     return results.filter(
//       (recipe: { image: string }) => recipe.image && recipe.image.trim() !== ""
//     );
//   }, [res]);

//   return { data, isLoading, isError };
// };
