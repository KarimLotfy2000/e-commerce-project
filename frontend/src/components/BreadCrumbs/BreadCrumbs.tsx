"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const steps = [
  { name: "Address", path: "/checkout/address" },
  { name: "Payment", path: "/checkout/payment" },
  { name: "Confirm", path: "/checkout/confirm" },
];

const Breadcrumbs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center items-center space-x-4 text-sm text-gray-500 py-4">
      {steps.map((step, index) => {
        const isActive = pathname === step.path;

        return (
          <div key={step.path} className="flex items-center">
            <Link
              href={step.path}
              className={cn(
                "font-medium",
                isActive ? "text-black font-semibold" : "text-gray-400"
              )}
            >
              {step.name}
            </Link>

            {index < steps.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
