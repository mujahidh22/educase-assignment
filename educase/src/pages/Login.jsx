import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/account');
    } catch (err) {
      if (err.response?.data?.details) {
        const errors = {};
        err.response.data.details.forEach((d) => { errors[d.field] = d.message; });
        setFieldErrors(errors);
      }
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] min-h-[700px] bg-[#f7f8f9] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col p-8 animate-[fadeIn_0.3s_ease]">
        <h1 className="text-[28px] font-bold text-[#1d2226] leading-tight tracking-tight">
          Signin to your<br />PopX account
        </h1>
        <p className="text-base text-[#8e8e8e] leading-relaxed mt-2">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        <form onSubmit={handleSubmit} className="mt-7">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg py-3 px-4 mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="relative mb-5">
            <label htmlFor="login-email" className="absolute -top-2 left-3.5 bg-[#f7f8f9] px-1.5 text-[13px] font-medium text-primary z-[1]">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full py-3.5 px-4 border-[1.5px] border-[#d4d4d4] rounded-lg text-[15px] font-inter text-[#1d2226] bg-transparent outline-none transition-colors duration-200 focus:border-primary placeholder:text-[#b0b0b0] placeholder:font-normal"
            />
            {fieldErrors.email && (
              <div className="text-xs text-red-600 mt-1 pl-0.5">{fieldErrors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <label htmlFor="login-password" className="absolute -top-2 left-3.5 bg-[#f7f8f9] px-1.5 text-[13px] font-medium text-primary z-[1]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full py-3.5 px-4 border-[1.5px] border-[#d4d4d4] rounded-lg text-[15px] font-inter text-[#1d2226] bg-transparent outline-none transition-colors duration-200 focus:border-primary placeholder:text-[#b0b0b0] placeholder:font-normal"
            />
            {fieldErrors.password && (
              <div className="text-xs text-red-600 mt-1 pl-0.5">{fieldErrors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className={`w-full py-[15px] px-6 rounded-lg text-base font-semibold font-inter text-center transition-all duration-200 active:scale-[0.98] cursor-pointer ${loading ? 'bg-[#dedede] text-[#888] cursor-not-allowed opacity-80' : 'bg-primary hover:bg-primary-dark text-white'}`}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <p className="text-center mt-5 text-sm text-[#8e8e8e]">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold no-underline hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
