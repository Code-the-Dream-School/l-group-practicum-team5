import LoginForm from '../components/features/LoginForm.tsx';
import LoginHeader from '../components/shared/HeaderWithoutInvite.tsx';
//import { redirect  } from 'react-router-dom';

const onLogin = (data: { email: string; password: string }) => {
  console.log(data); //will connect to backend here, plan to redirect to dashboard based on backend response
  //redirect("/dashboard");
};

function LoginPage() {
  return (
    <div className='bg-indigo-400/25 h-screen'>
      <LoginHeader/>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
