import TextInputWithLabel from '../shared/TextInputWithLabel.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CreateGroupFormProps {
  onCreateGroup: (name: string) => Promise<void>;
}

const CreateGroupForm = function ({ onCreateGroup }: CreateGroupFormProps) {
  const [name, setName] = useState('');

  const handleCreateGroup = async () => {
    await onCreateGroup(name);
    setName('');
  };

  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-2 pr-5 pl-5 rounded-4xl';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';
  const submitbuttonStyling =
    'bg-[#06ff76] hover:bg-[#8cffc0] text-black p-2 m-8 rounded-xl';

  return (
    <div className={containerStyling}>
      <h1 className="text-xl pt-3 pb-2">Create Group</h1>
      <hr className="pb-5 text-indigo-500/50" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateGroup();
        }}
      >
        <TextInputWithLabel
          elementId="name"
          label="Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.currentTarget.value)
          }
          value={name}
        />

        <Link className={buttonStyling} to="/dashboard">
          Cancel
        </Link>
        <button className={submitbuttonStyling} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
