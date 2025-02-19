"use client";

import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CartButton from "@/components/Cart/CartButton";
import AuthModal from "@/components/Auth/AuthModal/AuthModal";
import { FaUser, FaBars } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const OPTIONS = ["MEN", "WOMEN"];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user, isAuthenticated, logout, hideLoginModal, isLoginModalOpen } =
    useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    window.location.href = "/"; // Refresh page to remove states
  };

  const [authModal, setAuthModal] = useState<{
    authFormType: "login" | "register";
    isOpen: boolean;
  }>({
    authFormType: "login",
    isOpen: false,
  });

  return (
    <nav className="bg-white mb-16 p-4 shadow-md">
      <div className="sm:container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="text-gray-500 hover:text-gray-900"
                onClick={() => setIsSheetOpen(!isSheetOpen)}
              >
                <FaBars size={24} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 bg-white shadow-lg">
              <div className="flex flex-col p-4">
                {OPTIONS.map((option) => (
                  <Link
                    key={option}
                    href={`/${option.toLowerCase()}`}
                    className="text-gray-700 py-2 hover:text-gray-900"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {option}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-6">
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

        <Link href="/" className="text-2xl flex gap-2 items-center font-bold">
          <Image
            src="/images/logo.png"
            alt="Fashion Fusion"
            width={40}
            height={40}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <p className="text-lg md:text-xl">Fashion Fusion</p>
        </Link>

        <div className="flex items-center space-x-4">
          <CartButton />

          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger className="focus:outline-none">
              {isAuthenticated ? (
                <Avatar>
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ) : (
                <FaUser className="text-lg" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 mt-2 bg-white border shadow-md rounded-md">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/my-orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      setAuthModal({ authFormType: "login", isOpen: true });
                      setIsDropdownOpen(false);
                    }}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setAuthModal({
                        authFormType: "register",
                        isOpen: true,
                      });
                      setIsDropdownOpen(false);
                    }}
                  >
                    Register
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {(authModal.isOpen || isLoginModalOpen) && (
        <AuthModal
          initialForm={isLoginModalOpen ? "login" : authModal.authFormType}
          closeModal={() => {
            setAuthModal({ ...authModal, isOpen: false });
            hideLoginModal();
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
