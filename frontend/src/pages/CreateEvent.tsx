import CreateEventForm from '../components/features/CreateEventForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from './../services/eventService';
import type { EventResponse } from './../services/eventService';

function CreateEvent() {
  const [error, setError] = useState<EventResponse[message]>('');
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
      setError(response.message);
    }
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
