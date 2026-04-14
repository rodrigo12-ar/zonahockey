import { NextResponse } from "next/server";
import { createProduct, getPhysicalProducts } from "@/lib/shop";

export async function GET() {
  return NextResponse.json(await getPhysicalProducts());
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await createProduct(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo crear el producto" },
      { status: 500 }
    );
  }
}
