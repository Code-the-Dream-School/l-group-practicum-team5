import { useState } from 'react';
import LoginForm from '../components/features/LoginForm.tsx';
import LoginHeader from '../components/shared/HeaderWithoutInvite.tsx';
import { redirect } from 'react-router';


function LoginPage() {
  const [error, setError] = useState('');

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();
      if (result.message == 'Login successful') {
        redirect("/dashboard");
      } else {
        setError('Login Failed');
      }
    } catch (err) {
      if (err) {
        setError('Error: Login Failed');
      }
    }
  };
  let errorStyling = '';
  if(error !== ''){
    errorStyling = 'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl border-[#a00020] text-center';
  }
  return (
    <div className="bg-indigo-400/25 h-screen">
      <LoginHeader />
      
      <LoginForm onLogin={onLogin} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default LoginPage;
