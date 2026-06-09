import './dashboardlayout.css';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';
import { Link } from 'react-router-dom';
import AllEvents from '../components/features/AllEvents.tsx';

export default function DashboardLayout() {
  const buttonStyling =
    'bg-[#e4d1ff] hover:bg-white text-[#5200c5] p-2 mt-7px ml-5  text-center rounded-xl';
  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <main className="dashboard-main">
        <div className="last-hangout-banner">
          <StatsGrid />
        </div>

        <div className="main-grid">
          <div className="left-column">
            <div className="card-events">
              <Link className={buttonStyling} to="/create-event">
                Create Event
              </Link>
              <h2 className="card-title">Events</h2>

              <hr className="pb-3 text-white" />
              <div className="card-content">
                <AllEvents />
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="card-members">
              
              <h2 className="card-title">Group Members</h2>
              <hr className="pb-3  text-white" />
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
