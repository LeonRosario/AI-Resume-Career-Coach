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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/app");
    } catch (err) {
      setError(err.message || "Unable to register. Please try again.");
    } finally {
      setLoading(false);
    }
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
        />

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <Button type="submit" variant="primary" full size="lg" disabled={loading}>
          {loading ? "Creating account..." : "Create free account"}
        </Button>

        <div className="flex items-center gap-3 my-2">
          <span className="h-px bg-ink/10 flex-1" />
          <span className="text-xs text-muted">or</span>
          <span className="h-px bg-ink/10 flex-1" />
        </div>

        <Button type="button" variant="glass" full size="lg" onClick={() => navigate("/login")}>
          Already have an account
        </Button>

        <p className="text-center text-sm text-body pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
