'use client';

import { useState } from "react";
import Image from "next/image";

const menuItems = [
  { id: 1, name: "Pizza", price: 10, image: "/pizza.avif" },
  { id: 2, name: "Burger", price: 8, image: "/burger.avif" },
  { id: 3, name: "Salad", price: 6, image: "/salad.avif" },
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
    <section className="bg-[#000] py-[80px]">
      <div className="container mx-auto px-[30px]">
        <div className="">
          <h1 className="text-[35px] font-bold mb-6 text-[#fff] text-center pb-[30px]">Our Delicious Menu</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1c1919] rounded-lg shadow-lg flex flex-col items-center text-center pb-6"
              >
                {/* ✅ Fixed Image */}
                <div className="w-full h-full min-h-[250px] relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                <h2 className="text-[24px] font-semibold pt-6 text-[#fff]">{item.name}</h2>
                <p className="font-semibold text-[#ddd] text-[18px]">${item.price}</p>
                <button
                  onClick={() => placeOrder(item)}
                  className="mt-3 bg-[#c90b12] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#000] hover:text-[#c90b12] cursor-pointer border-[2px] border-[#C90B12]"
                  disabled={loading}
                >
                  {loading ? "Placing..." : "Order Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
