import LoginForm from '../components/features/LoginForm.tsx';

const onLogin = (data: { email: string; password: string }) => {
  console.log(data); //todo write code to send login info to the backend here
};

function LoginPage() {
  return (
    <div className='bg-indigo-400/25 h-screen'>
      
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
