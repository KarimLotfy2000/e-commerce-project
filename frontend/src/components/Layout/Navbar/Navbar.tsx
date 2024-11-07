"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const OPTIONS = ["MEN", "WOMEN"];
export const Navbar = () => {
  return (
    <nav className="bg-white mb-16 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          FashionFusion
        </Link>
        <div className="space-x-4 flex items-center">
          {OPTIONS.map((option) => (
            <Link
              key={option}
              href={`/${option.toLowerCase()}`}
              className="text-gray-500  hover:text-gray-900"
            >
              {option}
            </Link>
          ))}

          <Button variant="default" asChild>
            <Link href="/cart">Cart</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
