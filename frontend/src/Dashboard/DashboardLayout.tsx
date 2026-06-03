import './dashboardlayout.css';
import DashboardHeader from './DashboardHeader';
import StatsGrid from './StatsGrid';
import LastHangoutBanner from './LastHangoutBanner';

export default function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <DashboardHeader />

      <main className="dashboard-main">
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
