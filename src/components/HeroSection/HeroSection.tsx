import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-slate-500">
      <section className="mx-auto max-w-6xl flex justify-between items-center p-4 md:p-20 ">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Summer Sales</h1>
          <p className="my-3">Get up to 50% off on select items</p>
          <Link
            href={"/category"}
            className="bg-orange-500 py-2 px-3 rounded-md font-medium"
          >
            Shop Now
          </Link>
        </div>
        <div className="relative w-[130px] h-[200px] md:w-[300px] md:h-[300px]">
          <Image
            className="object-contain"
            src="/images/hero-img.png"
            fill
            alt="hero-image"
          />
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
