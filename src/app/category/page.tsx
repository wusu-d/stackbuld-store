import ProductListItem from "@/components/ProductListItem/ProductListItem";
import { Suspense } from "react";
import Filters from "@/components/Filters/Filters";
import AddProduct from "@/components/AddProduct/AddProduct";
import Pagination from "@/components/Pagination/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
};

const CategoryPage = async ({ searchParams }: { searchParams: any }) => {
  const urlParams = new URLSearchParams(searchParams);

  let data = await fetch(`${process.env.URL}/api/category?${urlParams}`, {
    cache: "no-cache",
  });
  let { products, currentPage, totalPages, totalItems } = await data.json();

  return (
    <main>
      <div className="max-w-6xl border-t-2 border-orange-500 mx-auto px-4 md:px-20">
        <section className="flex flex-col md:flex-row">
          <div className="basis-1/4 py-3 md:py-10">
            <div className="md:sticky md:top-10 space-y-4 md:space-y-20">
              <Filters activeCat={searchParams.cat} />
            </div>
          </div>
          <div className="basis-3/4 py-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl md:text-2xl font-bold">Products</h1>
              <AddProduct />
            </div>
            <Suspense
              fallback={<p className="text-center mt-10 font-bold">Loading</p>}
            >
              {products.length === 0 && (
                <p className="text-center mt-10 font-bold">No products found</p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 min-h-[480px]">
                {products.map((product: any) => (
                  <ProductListItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    desc={product.desc}
                    price={product.price}
                    image={product.image}
                  />
                ))}
              </div>
              <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                totalPage={totalPages}
              />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
