import { useInfomationQuery } from "@/api/information.query";
import { useMemo } from "react";

export const useInfomation = (recipesNum: number | null) => {
  const { data: res, isLoading } = useInfomationQuery(recipesNum);

  const data = useMemo(() => {
    if (!res) return [];
    return res;
  }, [res]);

  return { data, isLoading };
};
