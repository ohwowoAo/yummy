"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useInfomation } from "../hooks/useInfomation";
import Category from "@/app/main/components/Category";
import Header from "@/components/header/Header";
import DetailContent from "../components/DetailContent";

const Detail = () => {
  const params = useParams();
  const paramsidx = params.idx;
  const numbericID =
    paramsidx && !Array.isArray(paramsidx) ? Number(paramsidx) : null;

  const { data: info, isLoading } = useInfomation(numbericID);

  if (isLoading) return <div>로딩중입니다</div>;

  console.log(info);
  return (
    <div className="bg-white min-h-screen text-slate-500">
      <Header />
      <main>
        <Category />
        <DetailContent />
      </main>
    </div>
  );
};

export default Detail;
