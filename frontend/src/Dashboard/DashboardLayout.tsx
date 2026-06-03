import './dashboardlayout.css';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';

import AllEvents from '../components/features/AllEvents.tsx'

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <main className="dashboard-main">
        <StatsGrid />
        
        <div className='last-hangout-banner'></div>

        <div className="main-grid">
          <div className="left-column">
            <div className="card">
              <h2 className="card-title">Events</h2>
              <hr className="pb-3 text-[#694685b0]" />
              <div className="card-content">
                <AllEvents/>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card">
              <h2 className="card-title">Group Members</h2>
              <hr className="pb-3  text-[#694685b0]" />
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
