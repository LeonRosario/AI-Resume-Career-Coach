import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthVisual from "../../components/auth/AuthVisual";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm]     = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(form.email || "you@example.com");
      navigate("/app");
    }, 700);
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-300 accent-primary-600 cursor-pointer"
            />
            Remember me
          </label>
          <a href="#" className="text-primary-600 font-medium hover:text-primary-700 transition-colors text-sm">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          full
          size="lg"
          disabled={loading}
          loading={loading}
          icon={loading ? undefined : ArrowRight}
          iconPosition="right"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <span className="h-px bg-slate-200 flex-1" />
          <span className="text-xs text-muted font-medium">or continue with</span>
          <span className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Google */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { login("you@gmail.com"); navigate("/app"); }}
          className="w-full flex items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-medium text-body border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-card"
        >
          <GoogleIcon />
          Continue with Google
        </motion.button>

        <p className="text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            Sign up free
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
