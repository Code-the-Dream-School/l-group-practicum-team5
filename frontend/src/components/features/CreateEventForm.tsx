import TextInputWithLabel from '../shared/TextInputWithLabel.tsx'; //from login pr
import { useState } from 'react';
import { Link } from 'react-router';

interface CreateEventFormProps {
  onCreateEvent: (
    group_id: string,
    title: string,
    description: string,
    event_date: string,
    status: 'planned' | 'completed' | 'cancelled',
  ) => void;
}

const CreateEventForm = function ({ onCreateEvent }: CreateEventFormProps) {
  //const [group_id, setGroup_id] = useState('10');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [event_date, setEvent_date] = useState('');
  //const [status, setStatus] = useState<'planned' | 'completed' | 'cancelled'>('planned');

  const handleCreateEvent = () => {
    onCreateEvent('10', title, description, event_date, 'planned');
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-2 pr-5 pl-5 rounded-4xl';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';

  return (
    <div className={containerStyling}>
      <h1 className="text-xl pt-3 pb-2">Create Event</h1>
      <hr className="pb-5 text-indigo-500/50" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateEvent();
        }}
      >
        <TextInputWithLabel
          elementId="title"
          label="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          value={title}
        />
        <TextInputWithLabel
          elementId="description"
          label="Description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.currentTarget.value)
          }
          value={description}
        />

        <label>Date:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEvent_date(e.currentTarget.value)
          }
          value={event_date}
        ></input>

        <Link className={buttonStyling} to="/dashboard">
          Cancel
        </Link>
        <button className={buttonStyling} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;
