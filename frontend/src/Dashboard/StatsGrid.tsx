import { useState, useEffect } from 'react';
import { getEvents } from './../services/eventService';

export default function StatsGrid() {
  const [totalEvents, setTotalEvents] = useState<number>(0);
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await getEvents();
        setTotalEvents(response.data.length);
      } catch {
        console.log('get total events failed');
      }
    };
    getAllEvents();
  }, []);

    return totalEvents > 0?(
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon purple" />
            <div>
              <div className="stat-value">{totalEvents}</div>
              <div className="stat-label">Events</div>
            </div>
          </div>
        </div>
  
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon amber" />
            <div>
              <div className="stat-value">0</div>
              <div className="stat-label">Ideas</div>
            </div>
          </div>
        </div>
  
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon green" />
            <div>
              <div className="stat-value">0</div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>
      </div>
    ):(
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon purple" />
            <div>
              <div className="stat-value">0</div>
              <div className="stat-label">Events</div>
            </div>
          </div>
        </div>
  
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon amber" />
            <div>
              <div className="stat-value">0</div>
              <div className="stat-label">Ideas</div>
            </div>
          </div>
        </div>
  
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon green" />
            <div>
              <div className="stat-value">0</div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>
      </div>
    );
  }