import RegisterForm from '../components/features/RegisterForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  const onRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(apiURL + '/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (result.success == true) {
        navigate('/login');
      } else {
        setError(result.message);
      }
    } catch (err) {
      if (err) {
        setError('Error: Register Failed');
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
