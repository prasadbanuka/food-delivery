'use client';

import { useState } from "react";

const menuItems = [
  { id: 1, name: "Pizza", price: 10, icon: "🍕" },
  { id: 2, name: "Burger", price: 8, icon: "🍔" },
  { id: 3, name: "Salad", price: 6, icon: "🥗" },
];

export default function MenuPage() {
  const [loading, setLoading] = useState(false);

  const placeOrder = async (item: { id: number; name: string; price: number }) => {
    setLoading(true);

    const order = { itemId: item.id, name: item.name, price: item.price };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    setLoading(false);
    if (response.ok) {
      alert(`✅ Order placed for ${item.name}!`);
    } else {
      alert("❌ Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📖 Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl shadow-lg p-4 flex flex-col items-center text-center transition hover:scale-105"
          >
            <div className="text-5xl">{item.icon}</div>
            <h2 className="text-xl font-semibold mt-3">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <button
              onClick={() => placeOrder(item)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Placing..." : "Order Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
