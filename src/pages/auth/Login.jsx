import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthVisual from "../../components/auth/AuthVisual";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to CareerAI"
      subtitle="Pick up right where you left off."
      side={<AuthVisual />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          icon={Mail}
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-body">
            <input type="checkbox" className="rounded accent-primary-600" />
            Remember me
          </label>
          <a href="#" className="text-primary-600 font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" full size="lg" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </Button>

        <div className="flex items-center gap-3 my-2">
          <span className="h-px bg-ink/10 flex-1" />
          <span className="text-xs text-muted">or</span>
          <span className="h-px bg-ink/10 flex-1" />
        </div>

        <Button
          type="button"
          variant="glass"
          full
          size="lg"
          onClick={() => {
            navigate("/register");
          }}
        >
          Create an account
        </Button>

        <p className="text-center text-sm text-body pt-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">
            Sign up free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
