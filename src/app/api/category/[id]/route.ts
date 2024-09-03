import connectDB from "@/config/db";
import ProductModel from "@/model/productModel";

import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    await connectDB();
    console.log("here");
    const prod = await ProductModel.findOne({ _id: params.id }).exec();
    console.log(prod);

    return NextResponse.json(prod);
  } catch (error) {
    console.log(error);
  }
}
