import { NextResponse } from "next/server";

// Access the orders from the parent file or store them here temporarily
let orders: any[] = [];

export async function POST(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;

  // Find the order by ID
  const order = orders.find((o) => o.id === orderId);
  
  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  // Update order status to "cooking"
  order.status = "cooking";

  // Send response back with updated order
  return NextResponse.json({ message: "Order accepted", order }, { status: 200 });
}
