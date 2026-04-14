import { NextResponse } from "next/server";
import { deletePhoto, getPhotoBySlug, updatePhoto } from "@/lib/shop";

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const product = getPhotoBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PATCH(request: Request, { params }: Params) {
  const data = await request.json();
  const product = updatePhoto(params.slug, data);
  if (!product) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: Params) {
  deletePhoto(params.slug);
  return NextResponse.json({ success: true });
}
