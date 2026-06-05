import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';
import { useState } from 'react';
import { Link } from 'react-router';

interface CreateEventFormProps {
  onCreateEvent: (
    group_id: string,
    title: string,
    description: string,
    event_date: string,
    status: 'planned' | 'completed' | 'cancelled',
  ) => Promise<void>;
}

const CreateEventForm = function ({ onCreateEvent }: CreateEventFormProps) {
  const [group_id, setGroup_id] = useState('10');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [event_date, setEvent_date] = useState('');

  const handleCreateEvent = () => {
    onCreateEvent(group_id, title, description, event_date, 'planned');
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-2 pr-5 pl-5 rounded-4xl';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';
  const inputStyling =
    'bg-white border-2 border-indigo-500/50 hover:border-[#d1b1ff] mb-3 rounded-3xl p-1';

  const descStyling =
    'bg-white border-2 border-indigo-500/50 hover:border-[#d1b1ff] mb-3 rounded-3xl p-1 h-20 w-60';

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
          elementId="group_id"
          label="Group id"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGroup_id(e.currentTarget.value)
          }
          value={group_id}
        />
        <TextInputWithLabel
          elementId="title"
          label="Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.currentTarget.value)
          }
          value={title}
        />

        <div>
          <label>Description</label>
          <br />
          <textarea
            className={descStyling}
            id="description"
            name="description"
            onInput={(e) => setDescription(e.currentTarget.value)}
            value={description}
          ></textarea>
          <br />
        </div>

        <div>
          <label>Date and time</label>
          <br />
          <input
            className={inputStyling}
            type="datetime-local"
            id="date"
            name="date"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEvent_date(e.currentTarget.value)
            }
            value={event_date}
          ></input>
          <br />
        </div>

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
