"use client";

// import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className="border-b border-b-slate-400 flex justify-between	px-5 py-5">
      {/* <Image
        src="/icons/logo_white.png"
        alt="logo"
        className="h-10 cursor-pointer sm:w-[103px] md:w-[113px] lg:w-[140px]"
        onClick={() => router.push("/")}
        width={0}
        height={10}
      /> */}
      <div onClick={() => router.push("/")}>로고</div>
      <div className="flex gap-5">
        <div>검색</div>
        <div>메뉴</div>
      </div>
    </div>
  );
};

export default Header;
