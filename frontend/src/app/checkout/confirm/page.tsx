"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { makeOrder } from "@/store/slices/checkoutSlice";
import ImageComponent from "@/components/ui/image";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "@/store/slices/cartSlice";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
const ConfirmPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { selectedAddress, paymentMethod, loading } = useSelector(
    (state: RootState) => state.checkout
  );
  const { cartItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const { order } = useSelector((state: RootState) => state.checkout);
  console.log("order", order);
  const handlePlaceOrder = async () => {
    if (selectedAddress && paymentMethod) {
      await dispatch(
        makeOrder({
          savedAddressId: selectedAddress.id,
          paymentMethod,
        })
      );
      localStorage.removeItem("totalItems");
      router.push("/checkout/done");
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h1 className="text-2xl font-bold">Confirm Your Order</h1>

      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold">Shipping Address</h2>
        {selectedAddress ? (
          <p className="text-gray-700">
            {selectedAddress.street}, {selectedAddress.city},{" "}
            {selectedAddress.country}, {selectedAddress.zipCode}
          </p>
        ) : (
          <p className="text-red-500">No address selected.</p>
        )}
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold">Payment Method</h2>
        <p className="text-gray-700">
          {paymentMethod || "No payment method selected."}
        </p>
      </div>

      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <ul className="space-y-2">
          {cartItems.map(({ id, quantity, subtotal, sizeVariant }) => {
            const product = sizeVariant.product;
            return (
              <li
                key={id}
                className="relative flex items-center gap-4 border-b pb-3"
              >
                <div className="w-20 h-20 relative">
                  <ImageComponent
                    src={product.image || "/images/placeholder.svg"}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-md font-semibold">
                    {product.brand} {product.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Size: {sizeVariant.size}
                  </p>
                  <p className="text-gray-500 text-sm">Quantity: {quantity}</p>
                </div>

                <p className="text-lg font-bold mt-12 mr-2">
                  {subtotal.toFixed(2)} €
                </p>
                <Button
                  variant="ghost"
                  onClick={() => handleRemove(id)}
                  className="absolute top-2 right-2"
                >
                  <FaTrash />
                </Button>
              </li>
            );
          })}
        </ul>
        <p className="text-lg font-bold mt-3">
          Total: {totalPrice.toFixed(2)} €
        </p>
      </div>

      <Button
        onClick={handlePlaceOrder}
        disabled={!selectedAddress || !paymentMethod}
        className="w-full"
      >
        {loading ? <LoadingSpinner /> : "Place Order"}
      </Button>
    </div>
  );
};

export default ConfirmPage;
