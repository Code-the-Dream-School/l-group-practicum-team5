import LoginForm from '../components/features/LoginForm.tsx';

const onLogin = (data:any) => {
  data; //todo write code to send login info to the backend here
};

function LoginPage() {
  return <h1>Login page</h1>;
  <LoginForm onLogin={onLogin}/>
}

export default LoginPage;
