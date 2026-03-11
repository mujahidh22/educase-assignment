import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[400px] min-h-[700px] bg-[#f7f8f9] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Text content */}
      <div className="px-6 pb-9">
        <h1 className="text-[28px] font-bold text-[#1d2226] leading-tight tracking-tight mb-2">
          Welcome to PopX
        </h1>
        <p className="text-base text-[#8e8e8e] leading-relaxed">
          Lorem ipsum dolor sit amet,<br />
          consectetur adipiscing elit,
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-7">
          <button
            id="create-account-btn"
            className="w-full py-[15px] px-6 bg-primary hover:bg-primary-dark text-white font-semibold text-base rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Create Account
          </button>
          <button
            id="login-btn"
            className="w-full py-[15px] px-6 bg-primary-light hover:bg-[#cec0ef] text-[#3c1a7a] font-semibold text-base rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
