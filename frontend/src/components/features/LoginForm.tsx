import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';

const LoginForm = function ({ onLogin }: any) {
  const handleLogin = (e: any) => {
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
