import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/shop";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const order = getOrderById(params.id);
  if (!order) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(order);
}

export async function PATCH(request: Request, { params }: Params) {
  const data = await request.json();
  const allowedStatuses = ["pendiente", "entregado", "inconveniente"];

  if (!allowedStatuses.includes(data.status)) {
    return NextResponse.json({ error: "Estado no válido" }, { status: 400 });
  }

  const order = updateOrderStatus(params.id, data.status);
  if (!order) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
  return NextResponse.json(order);
}
