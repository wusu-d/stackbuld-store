"use client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const NavigationText = ({
  category,
  name,
}: {
  category: string;
  name: string;
}) => {
  const { back } = useRouter();
  return (
    <div className="mt-4 md:mt-10 mb-5 flex items-center text-xs md:text-base">
      Category <ChevronRight className="w-5 h-5 font-bold" />
      <span className="cursor-pointer">{category}</span>
      <ChevronRight className="w-5 h-5 font-bold" /> {name}
    </div>
  );
};

export default NavigationText;
