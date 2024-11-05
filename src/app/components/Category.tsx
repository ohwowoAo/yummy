import Image from "next/image";
import Link from "next/link";

const Category = () => {
  const categoryList = [
    { id: 1, country: "한국", vlaue: "Korean" },
    { id: 2, country: "중국", vlaue: "Chinese" },
    { id: 3, country: "일본", vlaue: "Japanese" },
    { id: 4, country: "이태리", vlaue: "Italian" },
    { id: 5, country: "베트남", vlaue: "Vietnamese" },
    { id: 6, country: "태국", vlaue: "Thai" },
  ];

  return (
    <div className="flex justify-center	gap-5 py-16">
      {categoryList.map(
        (category: { id: number; country: string; vlaue: string }) => (
          <Link
            key={category.id}
            className="flex justify-center flex-col items-center gap-3 cursor-pointer"
            // onClick={() => categoryMove(category.vlaue)}
            href={`/?category=${category.vlaue}`}
            shallow
          >
            <div className="relative sm:w-10 sm:h-5 md:w-14 md:h-7 lg:w-20 lg:h-10">
              <Image
                src="/icons/logo.jpg"
                alt="logo"
                className="object-cover"
                fill
              />
            </div>
            <p>{category.country}</p>
          </Link>
        )
      )}
    </div>
  );
};

export default Category;
