import { NextRequest, NextResponse } from "next/server";
import { addProduct, deleteProduct, editProduct, getProducts } from "@/data";

// const db = {
//   products: data.products,
//   setProducts: function (data: any) {
//     this.products = data;
//   },
// };

export async function GET(request: NextRequest) {
  console.log(request.url);
  const category = request.nextUrl.searchParams.get("cat") as string;
  const min = request.nextUrl.searchParams.get("min") as string;
  const max = request.nextUrl.searchParams.get("max") as string;
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "8", 10);
  const products = getProducts();
  let filteredProducts = [...products];

  if (category && category.toLowerCase() !== "all") {
    filteredProducts = filteredProducts.filter(
      (products) => products.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by minimum price
  const minPrice = min ? parseFloat(min as string) : 800;
  if (!isNaN(minPrice)) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  // Filter by maximum price
  const maxPrice = max ? parseFloat(max as string) : 10000000000;
  if (!isNaN(maxPrice)) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the array for pagination
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
    products: paginatedProducts,
  });
  // if (!category || category === "All") {
  // const products = awaib.products.filter((product) => {
  //   const isWithinPriceRange =
  //     product.price >= minPrice && product.price <= maxPrice;
  //   const isInCategory = category ? product.category === category : true;
  //   return isWithinPriceRange && isInCategory;
  // });

  //   return NextResponse.jsob);
  // } else {
  //   const products b.products.filter(
  //     (products) => products.category === category
  //   );
  //   return NextResponse.json({ products });
  // }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json();

    const newProduct = addProduct(product);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product = await request.json();
    const products = editProduct(product);
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const product = await request.json();
    const products = deleteProduct(product);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
    console.log(error);
  }
}
