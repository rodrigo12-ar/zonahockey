import { NextResponse } from "next/server";
import { getOrders } from "@/lib/shop";

export async function GET() {
  return NextResponse.json(getOrders());
}
