import React from "react";
import Image from "next/image";

const Category = () => {
  const categoryList = [
    { id: 1, country: "이태리" },
    { id: 2, country: "베트남" },
    { id: 3, country: "태국" },
    { id: 4, country: "한국" },
  ];
  return (
    <div className="flex justify-center	gap-5 py-16">
      {categoryList.map((category: { id: number; country: string }) => (
        <div
          key={category.id}
          className="flex justify-center flex-col items-center	gap-3"
        >
          <Image
            src="/icons/logo.jpg"
            alt="logo"
            className="h-10 cursor-pointer sm:w-[103px] md:w-[113px] lg:w-[140px]"
            width={0}
            height={10}
          />
          <p>{category.country}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
