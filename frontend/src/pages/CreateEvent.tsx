import CreateEventForm from '../components/features/CreateEventForm.tsx';
import DashboardHeader from './../Dashboard/DashboardHeader';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from './../services/eventService';


function CreateEvent() {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onCreateEvent = async (
    group_id: string,
    title: string,
    description: string,
    event_date: string,
    status: 'planned' | 'completed' | 'cancelled'
  ) => {
    const response = await createEvent({group_id, title, description, event_date, status});
    if (response.success === true) {
      navigate('/dashboard');
    } else {
      setError("");
    }
  };
  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <CreateEventForm onCreateEvent={onCreateEvent} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default CreateEvent;
