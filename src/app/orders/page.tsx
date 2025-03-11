"use client";

import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch

    // Refresh orders every 3 seconds
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filter orders into "Pending" and "Accepted"
  const pendingOrders = orders.filter(order => !order.accepted);
  const acceptedOrders = orders.filter(order => order.accepted);

  // Function to accept an order
  const acceptOrder = async (orderId: string | undefined) => {
    if (!orderId) {
      console.error("Error: Order ID is undefined");
      return;
    }
  
    try {
      const response = await fetch(`/api/orders/${orderId}/accept`, {
        method: "POST",
      });
  
      if (!response.ok) throw new Error("Failed to accept order");
  
      fetchOrders(); // Refresh orders after accepting
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🕒 Pending Orders</h2>
            {pendingOrders.length === 0 ? (
              <p>No pending orders.</p>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border rounded-xl shadow-lg p-4 flex flex-col items-center text-center"
                  >
                    <h2 className="text-xl font-semibold">{order.name}</h2>
                    <p className="text-gray-600">${order.price}</p>
                    <button
                      onClick={() => acceptOrder(order.id)}
                      className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      ✅ Accept Order
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accepted Orders */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🔥 Cooking Orders</h2>
            {acceptedOrders.length === 0 ? (
              <p>No orders are being prepared.</p>
            ) : (
              <div className="space-y-4">
                {acceptedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-yellow-100 border border-yellow-400 rounded-xl shadow-lg p-4 flex flex-col items-center text-center"
                  >
                    <h2 className="text-xl font-semibold">{order.name}</h2>
                    <p className="text-gray-600">${order.price}</p>
                    <p className="text-yellow-700 font-semibold">⏳ Cooking...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
