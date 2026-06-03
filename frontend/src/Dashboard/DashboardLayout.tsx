import './dashboardlayout.css';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';
import LastHangoutBanner from './LastHangoutBanner';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function DashboardLayout() {
  const navigate = useNavigate();
  const [group, setGroup] = useState({});
  const [error, setError] = useState('');

  let errorStyling = '';
  if (error !== '') {
    errorStyling =
      'm-auto mt-5 w-1/5 p-1 bg-[#ff2651] text-white border-3 rounded-xl text-center';
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <main className="dashboard-main">
        <p className={errorStyling}>{error}</p>
        <StatsGrid />

        <LastHangoutBanner />

        <div className="main-grid">
          <div className="left-column">
            <div className="card">
              <h2 className="card-title">Upcoming Events</h2>
              <div className="card-content">
                <p>No events yet</p>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <h2 className="card-title">Group Members</h2>
              <div className="card-content">
                <p>No members yet</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
