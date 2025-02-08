"use client";

import { useDispatch, useSelector } from "react-redux";
import { setPaymentMethod } from "@/store/slices/checkoutSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PaymentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { paymentMethod } = useSelector((state: RootState) => state.checkout);

  const handleNext = () => {
    if (paymentMethod) {
      router.push("/checkout/confirm");
    }
  };
  const paymentMethods = [
    { value: "CREDIT_CARD", text: "Credit Card" },
    { value: "DEBIT_CARD", text: "Debit Card" },
    { value: "PAYPAL", text: "PayPal" },
    { value: "CASH_ON_DELIVERY", text: "Cash on Delivery" },
  ];
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Select Payment Method</h1>
      <div className="my-6 flex flex-col space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.text}
            className={`w-full p-3 border rounded hover:bg-primary-hover  ${
              paymentMethod === method.value
                ? "border-black bg-gray-100"
                : "border-gray-300"
            }`}
            onClick={() => dispatch(setPaymentMethod(method.value))}
          >
            {method.text}
          </button>
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={handleNext}
        disabled={!paymentMethod}
      >
        Next
      </Button>
    </div>
  );
};

export default PaymentPage;
