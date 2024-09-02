import { NextRequest, NextResponse } from "next/server";

import data from "@/data.json";
import { NextApiRequest } from "next";
import fs from "fs";
import path from "path";
import { log } from "console";

const db = {
  products: data.products,
  setProducts: function (data: any) {
    this.products = data;
  },
};

export async function GET(request: NextRequest) {
  console.log(request.url);
  const category = request.nextUrl.searchParams.get("cat") as string;
  const min = request.nextUrl.searchParams.get("min") as string;
  const max = request.nextUrl.searchParams.get("max") as string;
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "8", 10);
  const products = db.products;
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
    // Path to your JSON file
    const filePath = path.join(process.cwd(), "data", "myData.json");
    console.log(filePath);
    // Read the existing JSON file
    // const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const product = await request.json();
    const newProduct = {
      id: db.products?.length ? db.products[db.products.length - 1].id + 1 : 1,
      image:
        "https://images.pexels.com/photos/7897470/pexels-photo-7897470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: product.name,
      price: product.price,
      desc: product.description,
      category: product.category,
    };
    db.setProducts([...db.products, newProduct]);

    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product = await request.json();
    const foundProduct = db.products.find(
      (prod) => prod.id === parseInt(product.id)
    );
    if (!foundProduct) {
      return NextResponse.json({
        message: `Product ID ${product.id} not found`,
      });
    }
    if (product.name) foundProduct.name = product.name;
    if (product.price) foundProduct.price = product.price;
    if (product.description) foundProduct.desc = product.description;
    const filteredArray = db.products.filter(
      (emp) => emp.id !== parseInt(product.id)
    );
    const unsortedArray = [...filteredArray, foundProduct];
    db.setProducts(
      unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    return NextResponse.json(db.products);
  } catch (error) {}
}

export async function DELETE(request: NextRequest) {
  try {
    const product = await request.json();
    const foundProduct = db.products.find(
      (prod) => prod.id === parseInt(product.id)
    );
    if (!foundProduct) {
      return NextResponse.json({
        message: `Product ${product.id} not found`,
      });
    }
    const filteredArray = db.products.filter(
      (prod) => prod.id !== parseInt(product.id)
    );
    db.setProducts([...filteredArray]);
    return NextResponse.json(db.products);
  } catch (error) {
    console.log(error);
  }
}
