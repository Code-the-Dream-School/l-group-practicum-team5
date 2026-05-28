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
    setPassword('');
    setEmail('');
  };

  return (
    <div className='container max-w-1/2  m-auto bg-indigo-50 pt-2 pb-2 pr-5 pl-5 rounded-4xl'>
      <h1>Login</h1>
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
        {/*<a href="">Forgot password?</a>*/}
        <a href="">Register</a> <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
