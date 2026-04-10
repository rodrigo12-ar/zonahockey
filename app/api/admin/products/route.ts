import { NextResponse } from "next/server";
import { createProduct, getPhysicalProducts } from "@/lib/shop";

export async function GET() {
  return NextResponse.json(getPhysicalProducts());
}

export async function POST(request: Request) {
  const data = await request.json();
  const product = createProduct(data);
  return NextResponse.json(product, { status: 201 });
}
