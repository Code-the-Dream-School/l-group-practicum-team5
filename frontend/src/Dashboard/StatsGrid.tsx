import { useState, useEffect } from 'react';
import { getEvents } from './../services/eventService';



export default function StatsGrid() {
    const [eventTotal, setEventTotal] = useState<number>(0);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const response = await getEvents();
        setEventTotal(response.data.length);
      } catch {
        console.log('get event total failed');
      }
    };
    getAllEvents();
  }, []);

    return eventTotal > 0 ? (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon purple" />
            <div>
              <div className="stat-value">{eventTotal}</div>
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
    ) : (
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
              <div className="stat-value">5</div>
              <div className="stat-label">Ideas</div>
            </div>
          </div>
        </div>
  
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon green" />
            <div>
              <div className="stat-value">8</div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>
      </div>
  );
  }