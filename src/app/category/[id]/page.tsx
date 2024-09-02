import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import DeleteProduct from "@/components/DeleteProduct/DeleteProduct";
import EditProduct from "@/components/EditProduct/EditProduct";
import NavigationText from "@/components/NavigationText/NavigationText";
import formatToCurrency from "@/helper/formatNumber";

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${process.env.URL}/api/category/${params.id}`, {
    next: { revalidate: 0 },
  });
  const [product] = await response.json();

  return (
    <main>
      <div className="max-w-6xl border-t-2 border-orange-500 mx-auto px-4 md:px-20">
        <NavigationText category={product?.category} name={product?.name} />
        <section className="flex flex-col md:flex-row gap-10 md:gap-20">
          {/* photos */}
          <div className="basis-2/4">
            {/* main photo */}
            <div className="w-full h-[250px] md:h-[350px] bg-zinc-300 rounded-sm relative">
              <Image
                src={product?.image}
                fill
                className="object-cover"
                alt=""
              />
            </div>
            {/* thumbnails of other images */}
            <div className="flex gap-3 mt-3">
              <div className="h-20 md:h-32 bg-gray-300 basis-1/4 relative cursor-pointer">
                <Image
                  src={product?.image}
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="h-20 md:h-32 bg-gray-300 basis-1/4 relative cursor-pointer">
                <Image
                  src={product?.image}
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="h-20 md:h-32 bg-gray-300 basis-1/4 relative cursor-pointer">
                <Image
                  src={product?.image}
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
              <div className="h-20 md:h-32 bg-gray-300 basis-1/4 relative cursor-pointer">
                <Image
                  src={product?.image}
                  fill
                  className="object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* details */}
          <div className="basis-1/3 flex flex-col  justify-between">
            <h1 className="text-lg md:text-xl font-bold">{product.name}</h1>
            <p className="my-2">{product.desc}</p>

            {/* price */}
            <p className="text-xl md:text-2xl font-extrabold">
              {formatToCurrency(product.price)}
            </p>

            {/* quantity */}
            <div>
              <p className="text-sm font-bold my-2">Quantity</p>
              <div className="flex gap-5 items-center bg-stone-300 w-max py-2 px-3 rounded-2xl">
                <button className="flex items-center justify-center">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-lg">1</span>
                <button className="flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* addtocart */}
            <div className="flex gap-4 mt-8">
              <EditProduct
                id={params.id}
                name={product.name}
                price={product.price}
                description={product.desc}
              />
              <DeleteProduct id={params.id} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
