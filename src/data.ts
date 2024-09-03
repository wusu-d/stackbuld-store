import { NextResponse } from "next/server";
import data from "./data.json";

let products = data.products;

export const getProducts = () => products;

export const deleteProduct = (product: any) => {
  const foundProduct = products.find((prod) => prod.id == product.id);
  if (!foundProduct) {
    throw new Error(`Product ${product.id} not found`);
  }

  const filteredArray = products.filter((prod) => prod.id != product.id);

  products = [...filteredArray];
  return products;
  // return NextResponse.json(db.products);
};

export const addProduct = (product: any) => {
  const newProduct = {
    id: products?.length ? products[products.length - 1].id + 1 : 1,
    image:
      "https://images.pexels.com/photos/7897470/pexels-photo-7897470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: product.name,
    price: product.price,
    desc: product.description,
    category: product.category,
  };

  products = [newProduct, ...products];
  return newProduct;
};

export const editProduct = (product: any) => {
  const foundProduct = products.find((prod) => prod.id == product.id);
  if (!foundProduct) {
    throw new Error(`Product ID ${product.id} not found`);
  }
  if (product.name) foundProduct.name = product.name;
  if (product.price) foundProduct.price = product.price;
  if (product.description) foundProduct.desc = product.description;
  const filteredArray = products.filter(
    (prod) => prod.id !== parseInt(product.id)
  );
  products = [...filteredArray, foundProduct];
  return products;
};

export const getProductById = (id: any) => {
  return products.filter((product) => product.id == id);
};
