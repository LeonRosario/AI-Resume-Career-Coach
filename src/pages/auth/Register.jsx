import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthVisual from "../../components/auth/AuthVisual";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      register(form.name || "There", form.email || "you@example.com");
      navigate("/app");
    }, 700);
  };

  return (
    <AuthLayout
      eyebrow="Get started — free"
      title="Create your account"
      subtitle="Your first resume scan takes about a minute."
      side={<AuthVisual />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          icon={User}
          placeholder="Jordan Lee"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <Input
          label="Confirm password"
          type="password"
          icon={Lock}
          placeholder="••••••••"
          required
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={error}
        />

        <Button type="submit" variant="primary" full size="lg" disabled={loading}>
          {loading ? "Creating account..." : "Create free account"}
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
            register("There", "you@gmail.com");
            navigate("/app");
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-muted pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
