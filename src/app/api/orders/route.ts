import { NextResponse } from "next/server";

// Store orders in memory (for testing)
let orders: any[] = [];

export async function POST(req: Request) {
  try {
    const order = await req.json();

    if (!order || !order.name || !order.price) {
      return NextResponse.json({ message: "Invalid order data" }, { status: 400 });
    }

    orders.push(order); // Save order in memory
    return NextResponse.json({ message: "Order received", order }, { status: 201 });
  } catch (error) {
    console.error("Error handling order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(orders, { status: 200 });
}
