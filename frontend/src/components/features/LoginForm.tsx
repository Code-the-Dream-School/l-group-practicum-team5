import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';

const LoginForm = function ({ onLogin }) {
  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(e.target);
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <TextInputWithLabel
          elementId="Email"
          label="Email"
          onChange=""
          value=""
        />
        <TextInputWithLabel
          elementId="Password"
          label="Password"
          onChange=""
          value=""
        />
        <a href="">Forgot password?</a>
        <a href="">Register</a>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
