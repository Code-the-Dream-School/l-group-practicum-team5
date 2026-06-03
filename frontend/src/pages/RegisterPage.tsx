import RegisterForm from '../components/features/RegisterForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function RegisterPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onRegister = async (name: string, email: string, password: string) => {
    try {
      
      const response = await registerUser({ name, email, password });

      if (response.success == true) {
       navigate('/login');
        
      } else {
        setError("Error: Register Failed");
      }
    } catch (err) {
      if (err) {
        setError('Error');
      }
    }
  };
  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return (
    <div className="dashboard-container">
      <HeaderWithoutInvite />

      <RegisterForm onRegister={onRegister} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default RegisterPage;
