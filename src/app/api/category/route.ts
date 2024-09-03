import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/model/productModel";
import connectDB from "@/config/db";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("cat") as string;
  const min = request.nextUrl.searchParams.get("min") as string;
  const max = request.nextUrl.searchParams.get("max") as string;
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "8", 10);
  try {
    await connectDB();
    let filteredProducts = await ProductModel.find({});
    console.log(filteredProducts);
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
  } catch (error) {
    console.log(error);
  }

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
  const product = await request.json();
  try {
    await connectDB();
    const newProduct = await ProductModel.create(product);
    console.log(product);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  const product = await request.json();
  try {
    await connectDB();
    const prod = await ProductModel.findOne({ _id: product.id }).exec();
    if (product.name) prod.name = product.name;
    if (product.price) prod.price = product.price;
    if (product.description) prod.desc = product.description;
    const result = await prod.save();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: NextRequest) {
  const product = await request.json();
  try {
    await connectDB();
    const prod = await ProductModel.findOne({ _id: product.id }).exec();
    const result = await prod.deleteOne();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}
