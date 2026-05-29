import TextInputWithLabel from '../shared/TextInputWithLabel.tsx'; //from login pr
import { useState } from 'react';
import { Link } from "react-router";

interface RegisterFormProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
}

const RegisterForm = function ({ onRegister }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      onRegister({ name, email, password });
    } else {
      setError('Passwords do not match.');
    }
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-indigo-50 pt-2 pb-2 pr-5 pl-5 rounded-4xl';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';

  return (
    <div className={containerStyling}>
      <h1 className="text-xl pt-3 pb-2">Register</h1>
      <hr className="pb-5 text-indigo-500/50" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <TextInputWithLabel
          elementId="name"
          label="Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
          value={name}
        />
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
        <TextInputWithLabel
          elementId="confirm_password"
          label="Confirm Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.currentTarget.value)
          }
          value={confirmPassword}
          type="password"
        />
        <Link className={buttonStyling} to="/login">
          Login Page
        </Link>
        <button className={buttonStyling} type="submit">
          Submit
        </button>
      </form>
      <p id="error">{error}</p>
    </div>
  );
};

export default RegisterForm;
