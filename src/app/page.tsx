import CategoryListItem from "@/components/CategoryListItem/CategoryListItem";
import HeroSection from "@/components/HeroSection/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* hero-section */}
      <HeroSection />

      {/* categories */}
      <div className="max-w-6xl mx-auto ">
        <section className="px-4 md:px-20 mt-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold">Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CategoryListItem
              name="Men's Clothing"
              image="https://images.pexels.com/photos/5490979/pexels-photo-5490979.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <CategoryListItem
              name="Electronics"
              image="https://images.pexels.com/photos/26935556/pexels-photo-26935556/free-photo-of-lens-of-canon-camera.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <CategoryListItem
              name="Laptops"
              image="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <CategoryListItem
              name="Beauty Products"
              image="https://images.pexels.com/photos/1029896/pexels-photo-1029896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <CategoryListItem
              name="Women's Fashion"
              image="https://images.pexels.com/photos/944761/pexels-photo-944761.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <CategoryListItem
              name="Accessories"
              image="https://images.pexels.com/photos/1050244/pexels-photo-1050244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
