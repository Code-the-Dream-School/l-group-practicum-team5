import RegisterForm from '../components/features/RegisterForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import { redirect } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {
  const [error, setError] = useState('');

  const onRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (result.message == 'User registered successfully') {
        redirect('/login');
      } else {
        setError('Register Failed');
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
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl border-[#a00020] text-center';
  }

  return (
    <div className="bg-indigo-400/25 h-screen">
      <HeaderWithoutInvite />

      <RegisterForm onRegister={onRegister} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default RegisterPage;
