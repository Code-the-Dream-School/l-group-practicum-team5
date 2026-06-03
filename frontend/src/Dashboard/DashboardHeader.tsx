import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/authService';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const logout = async () => {
      const response = await logoutUser();
      if (response.message == 'Logout successful') {
        navigate('/login');
        console.log('Logout successful!');
      } else {
        console.log('Logout failed somehow...');
      }
    };

      const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2.5 m-5 rounded-xl';
    
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
            <button className={buttonStyling} onClick={logout}>Log out</button>
          </div>
        </div>
      </header>
    );
  }