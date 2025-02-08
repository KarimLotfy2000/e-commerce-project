"use client";

import { useCheckoutGuard } from "@/hooks/use-checkout-guard";
import Breadcrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { usePathname } from "next/navigation";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isChecking, loading, cartItems } = useCheckoutGuard();
  const pathName = usePathname();
  if (isChecking || loading || cartItems.length === 0) return null;

  return (
    <div className="container mx-auto py-8">
      {!pathName.includes("done") && <Breadcrumbs />}
      {children}
    </div>
  );
}
