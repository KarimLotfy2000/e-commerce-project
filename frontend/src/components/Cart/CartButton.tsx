"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCart, setTotalItems } from "@/store/slices/cartSlice";
import useAuth from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export const LOCAL_STORAGE_KEY = "totalItems";

const CartButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  useEffect(() => {
    if (isAuthenticated) {
      const storedTotalItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTotalItems) {
        dispatch(setTotalItems(parseInt(storedTotalItems)));
      } else {
        dispatch(fetchCart());
      }
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="relative">
      <Button variant="primary" className="rounded-full p-3" asChild>
        <Link href="/cart">
          <FaShoppingCart className="text-lg" />
        </Link>
      </Button>

      {totalItems > 0 && isAuthenticated && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartButton;
