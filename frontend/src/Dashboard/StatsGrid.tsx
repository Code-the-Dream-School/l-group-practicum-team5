export default function StatsGrid() {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon purple" />
            <div>
              <div className="stat-value">12</div>
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