"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useInfomation } from "../hooks/useInfomation";
import sanitizeHtml from "sanitize-html";

const DetailContent = () => {
  const params = useParams();
  const paramsidx = params.idx;
  const numbericID =
    paramsidx && !Array.isArray(paramsidx) ? Number(paramsidx) : null;
  const { data: info, isLoading } = useInfomation(numbericID);
  const cleanHtml = sanitizeHtml(info.summary, {
    allowedTags: ["b", "i", "em", "strong", "a", "div"],
    allowedAttributes: {
      a: ["href"],
    },
  });
  if (isLoading) return <div>로딩중입니다</div>;

  console.log(info);
  return (
    <div>
      <div>
        {/* <div>이미지지</div> */}
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
    </div>
  );
};

export default DetailContent;
