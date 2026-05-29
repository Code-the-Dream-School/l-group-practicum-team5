import { useState } from 'react';
import LoginForm from '../components/features/LoginForm.tsx';
import LoginHeader from '../components/shared/HeaderWithoutInvite.tsx';
import { redirect } from 'react-router-dom';

function LoginPage() {
  const [error, setError] = useState('');

  const onLogin = async (data: { email: string; password: string }) => {
    /*try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();
      if (result.message == 'Login successful') {
        redirect('/dashboard');
      } else {
        setError('Login Failed');
      }
    } catch (err) {
      if (err) {
        setError('Error: Login Failed');
      }
    }*/
  };

  return (
    <div className="bg-indigo-400/25 h-screen">
      <LoginHeader />
      <p>{error}</p>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
