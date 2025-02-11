import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { useState } from "react";

interface LoginFormProps {
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm }) => {
  const { login, loadingLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <Button type="submit" disabled={loadingLogin}>
        {loadingLogin ? "Logging in..." : "Login"}
      </Button>

      <p className="text-sm text-center">
        Don't have an account yet?
        <button onClick={toggleForm} className="text-blue-500 underline">
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
