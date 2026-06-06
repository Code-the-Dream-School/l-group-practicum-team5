import { useState, useEffect } from 'react';
import { getEvents } from '../../services/eventService';
import type { GroupEvent } from '../../services/eventService';


const AllEvents = () => {
  const [allEvents, setAllEvents] = useState<GroupEvent[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await getEvents();
        setAllEvents(response.data);
      } catch {
        console.log('get all events failed');
      }
    };
    getAllEvents();
  }, []);

  return allEvents.length > 0 ? (
    <div className="grid grid-cols-2">
      {allEvents.map((x) => (
        <div className="p-3 m-2 bg-[#e9cfff] text-[#110029] rounded-lg text-center shadow-sm">
          <p className="pb-2 text-lg text-[#110029]">{x.title}</p>
          <hr className="pb-1 text-[#110029]" />
          <div className="p-2">
            <p className="p-1 pb-3 text-">{x.description}</p>
            <div className="flex flex-row justify-center">
              <p className="pl-2 pr-2 text-sm">
                {' '}
                Date: {x.event_date.split('T')[0]}
              </p>
              <p className="pl-2 pr-2 text-sm">
                At:{' '}
                {x.event_date.split('T')[1].split(':')[0] +
                  ' hrs ' +
                  [1] +
                  ' mins '}
              </p>
            </div>
            <p className="text-sm"> Status: {x.status}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>no events</p>
  );
};
export default AllEvents;
