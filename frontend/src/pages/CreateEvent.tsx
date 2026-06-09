import CreateEventForm from '../components/features/CreateEventForm.tsx';
import DashboardHeader from './../Dashboard/DashboardHeader';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createEvent } from './../services/eventService';

function CreateEvent() {
  const [success, setSucess] = useState(false);
  const [error, setError] = useState('');

  const onCreateEvent = async (
    group_id: string,
    title: string,
    description: string,
    event_date: string,
    status: 'planned' | 'completed' | 'cancelled',
  ) => {
    const response = await createEvent({
      group_id,
      title,
      description,
      event_date,
      status,
    });
    if (response.success === true) {
      setSucess(true);
    } else {
      setError('');
    }
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-4 pr-5 pl-5 rounded-4xl shadow-sm';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';

  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return success ? (
      <div className="dashboard-container">
        <DashboardHeader />
        <div className={containerStyling}>
          <h1 className="text-xl pt-3 pb-2">Event Created Successfully!</h1>
          <hr className="pb-5 text-indigo-500/50" />
          <Link className={buttonStyling} to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
  ) : (
    <div className="dashboard-container">
      <DashboardHeader />

      <CreateEventForm onCreateEvent={onCreateEvent} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default CreateEvent;
