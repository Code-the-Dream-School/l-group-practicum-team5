import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await logoutUser();
      console.log('Logout successful!');
      navigate('/login');
    } catch {
      console.log('Logout failed');
    }
  };

  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#a11ec5] text-white p-2.5 m-5 rounded-xl transition-all transition-discrete';

  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <div className="header-logo">G</div>

          <div>
            <h1 className="header-title">Gatherly</h1>
            <p className="header-subtitle">Plan together, hang together</p>
          </div>
        </div>

        <div className="header-right">
          <button className={buttonStyling} onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
