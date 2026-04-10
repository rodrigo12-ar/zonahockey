import { NextResponse } from "next/server";
import { createPhoto, getPhotoProducts } from "@/lib/shop";

export async function GET() {
  return NextResponse.json(getPhotoProducts());
}

export async function POST(request: Request) {
  const data = await request.json();
  const photo = createPhoto(data);
  return NextResponse.json(photo, { status: 201 });
}
