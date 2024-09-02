import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryListItem: React.FC<{ name: string; image: string }> = ({
  name,
  image,
}) => {
  return (
    <Link
      href={`/category?cat=${name}`}
      className="h-32 md:h-60 rounded bg-slate-400 flex items-center justify-center relative"
    >
      <Image src={image} fill alt="" className="object-cover" />
      <div className="uppercase border-orange-500 tracking-wider text-xs md:text-base md:h-20 px-3 py-3 md:px-6 flex flex-col items-center justify-center border opacity-70 bg-white">
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default CategoryListItem;
