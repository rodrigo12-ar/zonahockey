import { NextResponse } from "next/server";
import { deleteProduct, getProductBySlug, updateProduct } from "@/lib/shop";

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const product = await updateProduct(params.slug, data);
    if (!product) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    await deleteProduct(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo eliminar el producto" },
      { status: 500 }
    );
  }
}
