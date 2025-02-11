import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCart } from "@/store/slices/cartSlice";

export const useCheckoutGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedAddress, paymentMethod } = useSelector(
    (state: RootState) => state.checkout
  );
  const { cartItems, loading } = useSelector((state: RootState) => state.cart);

  const [isChecking, setIsChecking] = useState(true);
  const orderCompleted =
    typeof window !== "undefined" && localStorage.getItem("orderCompleted");

  useEffect(() => {
    if (cartItems.length === 0) {
      dispatch(fetchCart()).finally(() => setIsChecking(false));
    } else {
      setIsChecking(false);
    }
  }, [dispatch, cartItems.length]);

  useEffect(() => {
    if (isChecking || loading) return;

    if (
      orderCompleted &&
      pathname.startsWith("/checkout") &&
      pathname !== "/checkout/done"
    ) {
      router.replace("/");
      return;
    }
    if (cartItems.length === 0) {
      router.replace("/");
      return;
    }

    if (pathname.includes("/checkout/payment") && !selectedAddress) {
      router.replace("/checkout/address");
    } else if (
      pathname.includes("/checkout/confirm") &&
      (!selectedAddress || !paymentMethod)
    ) {
      router.replace("/checkout/payment");
    }
  }, [
    pathname,
    cartItems.length,
    selectedAddress,
    paymentMethod,
    isChecking,
    loading,
    router,
    orderCompleted,
  ]);

  return { isChecking, loading, cartItems };
};
