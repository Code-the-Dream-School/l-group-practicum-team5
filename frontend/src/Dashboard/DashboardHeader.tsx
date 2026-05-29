export default function DashboardHeader() {
    return (
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-logo">G</div>
  
            <div>
              <h1 className="header-title">Gatherly</h1>
              <p className="header-subtitle">Plan together, hang together</p>
            </div>
          </div>
  
          <div className="header-right">
            <button className="button-primary">+ Invite</button>
          </div>
        </div>
      </header>
    );
  }