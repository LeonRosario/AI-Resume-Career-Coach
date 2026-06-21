import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import BackgroundGlow from '../components/layout/BackgroundGlow';
import GlassCard from '../components/ui/GlassCard';
import GlassInput from '../components/ui/GlassInput';
import GlassButton from '../components/ui/GlassButton';
import GoogleButton from '../components/ui/GoogleButton';
import api from '../api/axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters';
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword)
      next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem('auth_token', data.token);
      navigate('/');
    } catch {
      setErrors({ form: 'Registration failed. This email may already be in use.' });
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
          <p className="mt-2 text-sm text-slate-500">Start your AI-powered career journey</p>
        </div>

        <GlassCard hover={false} className="p-8 md:p-10">
          <h1 className="font-fustat mb-1 text-2xl font-bold text-slate-900">Create account</h1>
          <p className="mb-6 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#0084FF] hover:underline">
              Sign in
            </Link>
          </p>

          <GoogleButton className="mb-6" onClick={() => {}} />

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/40" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-transparent px-3 text-slate-400 backdrop-blur-sm">
                or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <GlassInput
              label="Name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              icon={User}
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
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
            <GlassInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            {errors.form && (
              <p className="text-center text-xs text-red-500">{errors.form}</p>
            )}

            <GlassButton type="submit" className="mt-2 w-full justify-center" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <ArrowRight size={16} />}
            </GlassButton>
          </form>
        </GlassCard>
      </PageTransition>
    </div>
  );
}
