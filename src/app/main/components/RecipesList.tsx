"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useRecipesList } from "../hook/useRecipesList";
import { useSearchResultList } from "../hook/useSearchResultList";

const RecipesList = () => {
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();
  const [fetching, setFetching] = useState(false); // fetch 상태를 위한 추가 상태
  const category = searchParams.get("category");
  const [recipesList, setRecipesList] = useState<unknown[]>([]); // 상태 타입을 any[]로 설정

  const {
    data: randomRecipes,
    isLoading: loadingSearch,
    isError: errorSearch,
  } = useRecipesList();

  const {
    data: searchResults,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchResultList(category || "");

  useEffect(() => {
    if (category) {
      if (searchResults && "pages" in searchResults) {
        setRecipesList(
          searchResults.pages.flatMap((page: { results: any }) => page.results)
        );
      }
    } else {
      if (randomRecipes) {
        setRecipesList(randomRecipes);
      }
    }
  }, [category, searchResults, randomRecipes]);

  useEffect(() => {
    // inView가 true이고, hasNextPage가 있으며, 추가 fetch가 진행 중이 아닐 때 fetchNextPage 호출
    if (inView && hasNextPage && !isFetchingNextPage && !fetching) {
      setFetching(true); // 호출 시작을 표시
      fetchNextPage().then(() => {
        setFetching(false); // 호출 완료 후 표시 해제
      });
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage, fetching]);

  return (
    <div>
      {/* <h1>Infinite Loading</h1> */}
      {status === "pending" || loadingSearch ? (
        <p>Loading...</p>
      ) : status === "error" || errorSearch ? (
        <span>Error: {error?.message}</span>
      ) : (
        <>
          <div className="w-[100vh] min-h-[100vh] gap-5 flex-wrap px-5 grid grid-cols-4">
            {recipesList.map((recipe: any) => (
              <div key={`${recipe.title}-${recipe.id}`}>
                <Link href={`/detail/${recipe.id}`}>
                  <div className="relative w-full pb-[66.5%]">
                    <Image
                      src={recipe?.image}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                    <p className="flex gap-1 absolute right-2	bottom-3 bg-white px-1 rounded text-xs items-center">
                      <span className="text-[#e66c69] flex items-center">
                        <Heart fill="#e66c69" strokeWidth={0} className="w-3" />
                        like
                      </span>
                      <span className="text-slate-950 font-semibold">
                        {recipe?.aggregateLikes}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-950 line-clamp-2 h-[50px]">
                      {recipe?.title}
                    </p>
                    <div className="text-slate-600 text-sm flex gap-1">
                      {recipe?.vegetarian && <p>#채식주의자</p>}
                      {recipe?.vegan && <p>#비건</p>}
                      {recipe?.veryHealthy && <p>#건강식</p>}
                      {recipe?.veryPopular && <p>#Best</p>}
                      {recipesList &&
                        recipe &&
                        recipe.occasions &&
                        recipe.occasions.length > 1 && (
                          <p># {recipe.occasions.join(", ")}</p>
                        )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* 이 div가 화면에 보이면 fetchNextPage 호출 */}
          <div ref={ref} style={{ height: "20px" }}></div>
          <div>{isFetchingNextPage ? "Loading more..." : null}</div>
        </>
      )}
      <hr />
      {/* <Link href="/about">Go to another page</Link> */}
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default RecipesList;
