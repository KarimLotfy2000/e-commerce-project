import { useEffect, useState } from "react";
import useAuth from "@/hooks/use-auth";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import LoginForm from "@/components/Auth/LoginForm/LoginForm";
import RegisterForm from "@/components/Auth/RegistrationForm/RegistrationForm";
import useMediaQuery from "@/hooks/use-media-query";
import classNames from "classnames";

interface AuthModalProps {
  closeModal: () => void;
  initialForm?: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({
  closeModal,
  initialForm = "login",
}) => {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(initialForm === "login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.visualViewport === "undefined"
    ) {
      return;
    }

    const handleResize = () => {
      setKeyboardVisible(
        window.visualViewport!.height < window.innerHeight * 0.75
      );
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport?.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        setIsLogin(true);
        setRegistrationSuccess(false);
      }, 1000);
    }
  }, [registrationSuccess]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <DialogContent
          className={classNames(
            "bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto z-50   transition-transform duration-300",
            {
              "translate-y-[-30vh]": isMobile && isKeyboardVisible,
            }
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              {isLogin ? "Login" : "Register"}
            </DialogTitle>
          </DialogHeader>
          {isLogin ? (
            <LoginForm toggleForm={toggleForm} />
          ) : (
            <RegisterForm
              toggleForm={toggleForm}
              setRegistrationSuccess={setRegistrationSuccess}
            />
          )}
          <DialogClose
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default AuthModal;
