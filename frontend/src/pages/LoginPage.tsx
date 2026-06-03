import LoginForm from '../components/features/LoginForm.tsx';
import LoginHeader from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onLogin = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });

      if (response.success == true) {
        navigate('/dashboard');
      } else {
        setError("Error: Login Failed");
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
      'm-auto mt-5 w-1/6 p-1 bg-[#ff2651] text-white rounded-3xl text-center';
  }
  return (
    <div className="dashboard-container">
      <LoginHeader />

      <LoginForm onLogin={onLogin} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default LoginPage;
