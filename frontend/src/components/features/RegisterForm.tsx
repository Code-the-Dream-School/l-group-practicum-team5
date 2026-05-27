import TextInputWithLabel from '../shared/TextInputWithLabel.tsx'; //from login pr
import { useState } from 'react';

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
      setError("Passwords do not match.")
    }
  };

  return (
    <>
    if(error != ''){
      <div id="error">{error}</div>
    }
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

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default RegisterForm;
