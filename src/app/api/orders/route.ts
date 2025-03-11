import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

// Store orders in memory (for testing)
let orders: any[] = [];

export async function POST(req: Request) {
  try {
    const order = await req.json();

    if (!order || !order.name || !order.price) {
      return NextResponse.json({ message: "Invalid order data" }, { status: 400 });
    }

    // Assign a unique ID and default status
    const newOrder = {
      id: uuidv4(), // Generate unique order ID
      name: order.name,
      price: order.price,
      status: "pending", // Default status
    };

    orders.push(newOrder); // Save order in memory
    return NextResponse.json({ message: "Order received", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error handling order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(orders, { status: 200 });
}
