import RegisterForm from '../components/features/RegisterForm.tsx';

const onRegister = (data: { name:string; email: string; password: string }) => {
  console.log(data); //todo write code to send register info to the backend here
};

function RegisterPage() {
  return;
  <div>
    <h1>Register</h1>
    <RegisterForm onRegister={onRegister} />
  </div>;
}

export default RegisterPage;
