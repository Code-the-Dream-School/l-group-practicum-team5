import RegisterForm from '../components/features/RegisterForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

function RegisterPage() {
  const [success, setSucess] = useState(false);
  const [error, setError] = useState('');
  
  const onRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await registerUser({ name, email, password });

      if (response.success == true) {
        setSucess(true);
        
      } else {
        setError('Error: Register Denied');
      }
    } catch (err) {
      if (err) {
        setError('Error: Server connection');
      }
    }
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-4 pr-5 pl-5 rounded-4xl shadow-sm';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';

  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return success ? (

      <div className="dashboard-container">
        <HeaderWithoutInvite />
        <div className={containerStyling}>
          <h1 className="text-xl pt-3 pb-2">Registered Successfully!</h1>
          <hr className="pb-5 text-indigo-500/50" />
          <Link className={buttonStyling} to="/login">
            Go to Login
          </Link>
        </div>
      </div>

  ) : (
    <div className="dashboard-container">
      <HeaderWithoutInvite />

      <RegisterForm onRegister={onRegister} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default RegisterPage;
