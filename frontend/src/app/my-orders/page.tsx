"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchRecentOrders, fetchAllOrders } from "@/store/slices/ordersSlice";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/OrderCard/OrderCard";

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recentOrders, allOrders, loading } = useSelector(
    (state: RootState) => state.orders
  );
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    dispatch(fetchRecentOrders());
  }, [dispatch]);

  const handleLoadAllOrders = () => {
    dispatch(fetchAllOrders());
    setShowAllOrders(true);
  };

  const sortedOrders = (showAllOrders ? allOrders : recentOrders)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {sortedOrders.length > 0 ? (
            <>
              {sortedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
              {!showAllOrders && (
                <Button
                  variant="primary"
                  onClick={handleLoadAllOrders}
                  className="mt-4 w-full"
                >
                  View All Orders
                </Button>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center">You have no orders yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;
