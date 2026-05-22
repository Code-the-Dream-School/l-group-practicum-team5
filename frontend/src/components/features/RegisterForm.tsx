import TextInputWithLabel from '../shared/TextInputWithLabel.tsx'; //from login pr
import { useState } from 'react';

interface LoginFormProps {
  onRegister: (data: { name: string; email: string; password: string }) => void;
}

const RegisterForm = function ({ onRegister }: LoginFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      onRegister({ name, email, password });
    } else {
      // add error message here
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
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
          value={password}
          type="password"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
