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

interface AuthModalProps {
  closeModal: () => void;
  initialForm?: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({
  closeModal,
  initialForm = "login",
}) => {
  const { isAuthenticated, error } = useAuth();
  const [isLogin, setIsLogin] = useState(initialForm === "login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
    }
  }, [isAuthenticated, closeModal]);

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
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto z-50">
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
