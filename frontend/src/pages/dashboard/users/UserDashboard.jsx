import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/orderApi.js";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  // Ensure we always have an array to map
  const orders = Array.isArray(ordersData)
    ? ordersData
    : ordersData?.orders || [];

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-600">Error getting orders data.</div>;

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome, <span className="font-semibold">{currentUser?.name || "User"}</span>!
          Here are your recent orders:
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2"
                >
                  <p className="font-medium text-gray-800">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(order?.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Total: ${order.totalPrice?.toFixed(2) || 0}
                  </p>

                  <div className="mt-2">
                    <p className="font-medium text-gray-700">Products:</p>
                    {(order.productIds || []).length > 0 ? (
                      <ul className="ml-4 list-disc text-gray-600">
                        {order.productIds.map((productId, index) => (
                          <li key={index}>{productId}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ml-4 text-gray-500">No products listed.</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no recent orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
