"use client";

import Link from "next/link";
import useAuth from "@/hooks/use-auth";
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
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

const OPTIONS = ["MEN", "WOMEN"];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();
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
    window.location.href = "/"; // not using router.push to refresh the page and remove states
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
      <div className="container mx-auto flex justify-between items-center">
        {pathName.startsWith("/checkout") ? (
          <Link href="/" className="text-2xl font-bold">
            FashionFusion
          </Link>
        ) : (
          <>
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
              <CartButton />

              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
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
          </>
        )}
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
