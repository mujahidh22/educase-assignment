import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    defaultValues: {
      full_name: '',
      phone: '',
      email: '',
      password: '',
      company_name: '',
      is_agency: 'true',
    },
    mode: 'onTouched',
  });

  const isAgencyValue = watch('is_agency');

  const onSubmit = async (data) => {
    setError('');
    try {
      const payload = { ...data, is_agency: data.is_agency === 'true' };
      await authRegister(payload);
      navigate('/account');
    } catch (err) {
      if (err.response?.data?.details) {
        err.response.data.details.forEach((d) => {
          setFormError(d.field, { type: 'server', message: d.message });
        });
      }
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const fields = [
    { name: 'full_name', label: 'Full Name', required: 'Full name is required', placeholder: 'Marry Doe', type: 'text' },
    { 
      name: 'phone', 
      label: 'Phone number', 
      required: 'Phone number is required', 
      placeholder: 'Marry Doe', 
      type: 'tel',
      pattern: { value: /^[0-9+\-\s()]{7,20}$/, message: 'Please enter a valid phone number' } 
    },
    { 
      name: 'email', 
      label: 'Email address', 
      required: 'Email is required', 
      placeholder: 'Marry Doe', 
      type: 'email',
      pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email address' } 
    },
    { 
      name: 'password', 
      label: 'Password', 
      required: 'Password is required', 
      placeholder: 'Marry Doe', 
      type: 'password',
      minLength: { value: 6, message: 'Password must be at least 6 characters' } 
    },
    { name: 'company_name', label: 'Company name', required: false, placeholder: 'Marry Doe', type: 'text', maxLength: { value: 100, message: 'Max length is 100 characters' } },
  ];

  return (
    <div className="w-full max-w-[400px] min-h-[700px] bg-[#f7f8f9] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col p-8 pt-5 animate-[fadeIn_0.3s_ease]">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 mb-2 text-[#555] text-sm font-inter hover:text-[#333] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-[28px] font-bold text-[#1d2226] leading-tight tracking-tight mb-6">
          Create your<br />PopX account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg py-3 px-4 mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div className="relative mb-5" key={field.name}>
              <label htmlFor={`register-${field.name}`} className="absolute -top-2 left-3.5 bg-[#f7f8f9] px-1.5 text-[13px] font-medium text-primary z-[1]">
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>
              <input
                id={`register-${field.name}`}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.name === 'password' ? 'new-password' : field.name}
                className="w-full py-3.5 px-4 border-[1.5px] border-[#d4d4d4] rounded-lg text-[15px] font-inter text-[#1d2226] bg-transparent outline-none transition-colors duration-200 focus:border-primary placeholder:text-[#b0b0b0] placeholder:font-normal"
                {...register(field.name, {
                  required: field.required ? field.required : false,
                  pattern: field.pattern,
                  minLength: field.minLength,
                  maxLength: field.maxLength,
                })}
              />
              {errors[field.name] && (
                <div className="text-xs text-red-600 mt-1 pl-0.5">{errors[field.name].message}</div>
              )}
            </div>
          ))}

          {/* Agency Radio */}
          <div className="mb-5">
            <span className="text-sm font-medium text-[#1d2226] mb-3 block">
              Are you an Agency?<span className="text-red-500 ml-0.5">*</span>
            </span>
            <div className="flex gap-7">
              {[
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' },
              ].map((opt) => (
                <label className="flex items-center gap-2 cursor-pointer" key={opt.value}>
                  <input
                    type="radio"
                    value={opt.value}
                    className="hidden"
                    {...register('is_agency', { required: 'Please select an option' })}
                  />
                  <span className={`radio-dot w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${isAgencyValue === opt.value ? 'border-primary' : 'border-[#d4d4d4]'}`}>
                    <span className="radio-dot-inner"></span>
                  </span>
                  <span className="text-[15px] text-[#1d2226]">{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.is_agency && (
              <div className="text-xs text-red-600 mt-1 pl-0.5">{errors.is_agency.message}</div>
            )}
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-[15px] px-6 rounded-lg text-base font-semibold font-inter text-center transition-all duration-200 active:scale-[0.98] mt-3 cursor-pointer ${isSubmitting ? 'bg-[#dedede] text-[#888] cursor-not-allowed opacity-80' : 'bg-primary hover:bg-primary-dark text-white'}`}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
