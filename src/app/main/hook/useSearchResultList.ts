import { useSearchResultListQuery } from "@/api/searchResultList.query";
import { useMemo } from "react";

export const useSearchResultList = (value: string) => {
  const {
    data: res,
    isLoading,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchResultListQuery(value);

  const data = useMemo(() => {
    if (!res) return [];
    return res;
  }, [res]);

  return {
    data,
    isLoading,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
