import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';
import { useState } from 'react';

interface LoginFormProps {
  onLogin: (data: { email: string; password: string }) => void;
}

const LoginForm = function ({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ email, password });
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin();}}>
        <TextInputWithLabel
          elementId="email"
          label="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement >) => setEmail(e.currentTarget.value)}
          value={email}
        />
        <TextInputWithLabel
          elementId="password"
          label="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement >) => setPassword(e.currentTarget.value)}
          value={password}
          type="password"
        />
        <a href="">Forgot password?</a>
        <a href="">Register</a>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
