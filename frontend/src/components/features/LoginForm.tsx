import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (email: string, password: string ) => Promise<void>;
}

const LoginForm = function ({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    await onLogin( email, password );
    setPassword('');
    setEmail('');
  };


  const containerStyling =
    'container m-auto mt-5 w-2/5 text-center bg-white pt-2 pb-2 pr-5 pl-5 rounded-4xl';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-8 rounded-xl';

  return (
    <div className={containerStyling}>
      <h1 className="text-xl pt-3 pb-2">Login</h1>
      <hr className="pb-5 text-indigo-500/50" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <TextInputWithLabel
            elementId="email"
            label="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            value={email}
          />
          <TextInputWithLabel
            elementId="password"
            label="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
            type="password"
          />
        </div>
        <Link  className={buttonStyling} to="/" >
          Register
        </Link>
        <button disabled={!email || !password} className={buttonStyling} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
