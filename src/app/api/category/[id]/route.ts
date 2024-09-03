import { getProductById } from "@/data";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const product = getProductById(params.id);
  //   console.log(params);

  return NextResponse.json(product);
}
