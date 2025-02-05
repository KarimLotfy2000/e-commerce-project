"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/store/slices/cartSlice";
import { RootState, AppDispatch } from "@/store/store";
import CartItemCard from "./CartItemCard";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const CartItemList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems, totalPrice, loading } = useSelector(
    (state: RootState) => state.cart
  );
  const { isAuthenticated, showLoginModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0 && isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, cartItems.length, isAuthenticated]);

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.length > 0 ? (
        <>
          <h1 className="text-3xl mb-4 font-semibold">
            Your Cart ({cartItems.length} items)
          </h1>
          {cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}

          <div className="mt-8 flex justify-between items-center p-4 border-t">
            <p className="text-lg font-semibold">
              Total: {totalPrice.toFixed(2)} €
            </p>
            <Button variant="accent" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 flex flex-col items-center gap-4 mt-10">
          <p className="text-lg">Your cart is empty.</p>

          {!isAuthenticated && (
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                className="w-60"
                onClick={showLoginModal}
              >
                Login to Start Shopping
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-60"
                onClick={() => router.back()}
              >
                Go Back
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartItemList;
