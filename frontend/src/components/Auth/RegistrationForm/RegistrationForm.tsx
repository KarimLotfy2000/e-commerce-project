"use client";

import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RegisterFormProps {
  toggleForm: () => void;
  setRegistrationSuccess: (success: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  toggleForm,
  setRegistrationSuccess,
}) => {
  const { register, loadingRegister } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    register(name, email, password);
    const success = await register(name, email, password);
    if (success) {
      setRegistrationSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
      )}

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}

      <Button type="submit" disabled={loadingRegister}>
        {loadingRegister ? "Registering..." : "Register"}
      </Button>
      <p className="text-sm text-center">
        Already have an account?{" "}
        <button onClick={toggleForm} className="text-blue-500 underline">
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
