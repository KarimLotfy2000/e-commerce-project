"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "@/hooks/use-auth";
import AuthModal from "@/components/Auth/AuthModal/AuthModal";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const OPTIONS = ["MEN", "WOMEN"];

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authFormType, setAuthFormType] = useState<"login" | "register">(
    "login"
  );
  const { user, isAuthenticated, logout } = useAuth();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <nav className="bg-white mb-16 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          {OPTIONS.map((option) => (
            <Link
              key={option}
              href={`/${option.toLowerCase()}`}
              className="text-gray-500 hover:text-gray-900"
            >
              {option}
            </Link>
          ))}
        </div>

        <Link href="/" className="text-2xl font-bold">
          FashionFusion
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Button variant="secondary" asChild>
                <Link href="/cart">
                  <FaShoppingCart className="text-lg" />
                  <span className="ml-2">Cart</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar>
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 mt-2 bg-white border shadow-md rounded-md">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsModalOpen(true);
                  setAuthFormType("login");
                }}
              >
                Login
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(true);
                  setAuthFormType("register");
                }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AuthModal
          closeModal={() => setIsModalOpen(false)}
          initialForm={authFormType}
        />
      )}
    </nav>
  );
};

export default Navbar;
