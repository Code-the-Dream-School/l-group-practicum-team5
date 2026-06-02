import CreateEventForm from '../components/features/CreateEventForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const onCreateEvent = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {

        navigate('/dashboard');

  };
  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return (
    <div className="dashboard-container">
      <HeaderWithoutInvite />

      <CreateEventForm onCreateEvent={onCreateEvent} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default CreateEvent;
