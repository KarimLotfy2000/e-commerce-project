"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import dayjs from "dayjs";

const CheckoutDonePage = () => {
  const router = useRouter();
  const { order } = useSelector((state: RootState) => state.checkout);

  useEffect(() => {
    if (!order) {
      router.replace("/checkout/confirm");
    }
  }, [order, router]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("orderCompleted");
    };
  }, []);

  if (!order) return null;

  const formattedOrderDate = dayjs(order.orderDate).format("MMMM D, YYYY");
  const estimatedArrivalDate = dayjs(order.orderDate)
    .add(5, "days")
    .format("MMMM D, YYYY");

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <div className="flex flex-col items-center">
        <FaCheckCircle className="text-green-500 text-6xl" />
        <h1 className="text-2xl font-bold text-green-600 mt-2">
          Order Successfully Placed!
        </h1>
      </div>

      <div className="mt-6 text-left border-t pt-4 space-y-3">
        <p className="text-gray-600">
          Your order <span className="font-semibold">#{order.id}</span> has been
          placed.
        </p>
        <p className="text-gray-600">
          Order Date:{" "}
          <span className="font-semibold">{formattedOrderDate}</span>
        </p>
        <p className="text-gray-600">
          Estimated Arrival:{" "}
          <span className="font-semibold">{estimatedArrivalDate}</span>
        </p>

        <div className="mt-2 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">Shipping Address:</p>
          <p className="text-gray-700">
            {order.address.street}, {order.address.city},{" "}
            {order.address.country} - {order.address.zipCode}
          </p>
        </div>

        <div className="mt-2 p-4 border rounded-lg bg-gray-50">
          <p className="font-semibold">Payment Method:</p>
          <p className="text-gray-700">
            {order.paymentMethod.replace("_", " ")}
          </p>
        </div>

        <div className="mt-4 p-4 border-t font-semibold text-lg">
          Total Paid: {order.totalPrice.toFixed(2)} €
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => router.push("/")} variant="primary" size="lg">
          Continue Shopping
        </Button>
        <Button
          onClick={() => router.push("/my-orders")}
          variant="secondary"
          size="lg"
        >
          View Order History
        </Button>
      </div>
    </div>
  );
};

export default CheckoutDonePage;
