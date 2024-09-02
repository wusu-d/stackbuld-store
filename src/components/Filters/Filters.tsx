"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const categories = [
  "All",
  "Men's Clothing",
  "Women's Fashion",
  "Beauty Products",
  "Electronics",
  "Laptops",
  "Accessories",
];

const Filters = ({ activeCat }: { activeCat: string }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(activeCat);

  useEffect(() => {
    if (searchParams.size === 0) setActiveCategory("All");
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const params = new URLSearchParams(searchParams);
    params.set("cat", category);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div>
        <p className="text-sm md:text-base">Categories</p>
        <ul className="flex flex-wrap md:flex-col gap-2 items-start mt-3">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 text-xs cursor-pointer rounded-xl ${
                activeCategory === category
                  ? "bg-slate-600 border text-white"
                  : "border border-black  text-gray-800"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm md:text-base">Filter by Price</p>
        <div className="flex flex-row md:flex-col gap-3 mt-3">
          <div>
            <label className="text-xs block mb-1">Min Price:</label>
            <input
              className="w-28 px-2 border border-black rounded-xl "
              type="number"
              name="min"
              min={0}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-xs block mb-1">Max Price:</label>
            <input
              className="w-28 px-2 border border-black rounded-xl "
              type="number"
              name="max"
              min={0}
              max={100000}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
