import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-full max-w-[400px] min-h-[700px] bg-[#f7f8f9] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="py-[18px] px-6 border-b border-[#e4e4e4] flex items-center justify-between">
        <span className="text-lg font-semibold text-[#1d2226]">Account Settings</span>
        <button
          onClick={handleLogout}
          className="p-1.5 text-[#d32f2f] hover:bg-[#ffebee] rounded-full transition-colors cursor-pointer"
          title="Logout"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-4 px-6 pt-6 pb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}&background=e0c8ff&color=6C25FF&size=128&bold=true`}
            alt={user?.full_name || 'User avatar'}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-[22px] h-[22px] bg-primary rounded-full border-2 border-[#f7f8f9] flex items-center justify-center">
            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" />
              <path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#1d2226]">{user?.full_name || 'User'}</h3>
          <p className="text-sm text-[#8e8e8e] mt-0.5">{user?.email || 'user@email.com'}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pt-2 pb-6 text-sm text-[#555] leading-relaxed">
        Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy
        Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
      </div>

      {/* Divider */}
      <hr className="mx-6 border-none border-t-2 border-dashed border-[#d4d4d4]" style={{ borderTop: '2px dashed #d4d4d4' }} />

      <div className="flex-1"></div>
    </div>
  );
};

export default AccountSettings;
