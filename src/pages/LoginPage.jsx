import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import BackgroundGlow from '../components/layout/BackgroundGlow';
import GlassCard from '../components/ui/GlassCard';
import GlassInput from '../components/ui/GlassInput';
import GlassButton from '../components/ui/GlassButton';
import GoogleButton from '../components/ui/GoogleButton';
import api from '../api/axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.email) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('auth_token', data.token);
      navigate('/');
    } catch {
      setErrors({ form: 'Invalid email or password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">
      <BackgroundGlow variant="auth" />

      <PageTransition className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="font-fustat text-3xl font-extrabold text-[#0084FF]">
            Career<span className="text-[#60B1FF]">AI</span>
          </Link>
          <p className="mt-2 text-sm text-slate-500">Welcome back to your career coach</p>
        </div>

        <GlassCard hover={false} className="p-8 md:p-10">
          <h1 className="font-fustat mb-1 text-2xl font-bold text-slate-900">Sign in</h1>
          <p className="mb-6 text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-[#0084FF] hover:underline">
              Create one
            </Link>
          </p>

          <GoogleButton className="mb-6" onClick={() => {}} />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-transparent px-3 text-slate-400 backdrop-blur-sm">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <GlassInput
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <GlassInput
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={form.password}
              onChange={handleChange}
              error={errors.password}
            />

            {errors.form && (
              <p className="text-center text-xs text-red-500">{errors.form}</p>
            )}

            <GlassButton type="submit" className="mt-2 w-full justify-center" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={16} />}
            </GlassButton>
          </form>
        </GlassCard>
      </PageTransition>
    </div>
  );
}
