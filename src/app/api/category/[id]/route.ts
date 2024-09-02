import { NextResponse } from "next/server";
import data from "@/data.json";

const db = {
  products: data.products,
  setProducts: function (data: any) {
    this.products = data;
  },
};

export async function GET(response: Response, context: any) {
  const { params } = context;
  const product = db.products.filter(
    (product) => product.id.toString() === params.id
  );
  //   console.log(params);

  return NextResponse.json(product);
}
