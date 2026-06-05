import CreateGroupForm from '../components/features/CreateGroupForm.tsx';
import HeaderWithoutInvite from '../components/shared/HeaderWithoutInvite.tsx';
import '../Dashboard/dashboardlayout.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createGroup } from '../services/groupService';
import type { Group } from '../services/groupService';

function CreateGroupPage() {
  const [error, setError] = useState('');
  const [success, setSucess] = useState(false);
  const [group, setGroup] = useState<Group>({
    id: 'n/a',
    name: 'n/a',
    invite_code: 'n/a',
    created_by: 'n/a',
    created_at: 'n/a',
    updated_at: 'n/a',
  });

  const onCreateGroup = async (name: string) => {
    try {
      const response = await createGroup({ name });

      if (response.success == true) {
        setGroup(response.data);
        setSucess(true);
      } else {
        setError('Error: Register Failed');
      }
    } catch (err) {
      if (err) {
        setError('Error');
      }
    }
  };
  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }
  const containerStyling =
    'container m-auto mt-5 max-w-4/10 text-center bg-white pt-2 pb-4 pr-5 pl-5 rounded-4xl shadow-sm';
  const buttonStyling =
    'bg-[#5200c5] hover:bg-[#8340e0] text-white p-2 m-5 rounded-xl';
  

  return success ? (
    <div className="dashboard-container">
      <HeaderWithoutInvite />
      <div className={containerStyling}>
        <h1 className="text-xl pt-3 pb-2">Group Created!</h1>
        <hr className="pb-5 text-indigo-500/50" />
        <p className='mb-2'>Group Name: {group.name}</p>
        <p className='mb-2'>Group ID: {group.id}</p>
        <p className='mb-5'>Group Invite Code: {group.invite_code}</p>
        <Link className={buttonStyling} to="/dashboard">
          Return to Dashboard check
        </Link>
      </div>
    </div>
  ) : (
    <div className="dashboard-container">
      <HeaderWithoutInvite />

      <CreateGroupForm onCreateGroup={onCreateGroup} />
      <p className={errorStyling}>{error}</p>
    </div>
  );
}

export default CreateGroupPage;
