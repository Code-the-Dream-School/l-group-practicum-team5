import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch from backend');
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">Frontend ↔ Backend Test</h1>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="card">
          <h2 className="card-title">API Status</h2>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!error && (
            <p>
              Message from API: <strong>{message || 'Loading...'}</strong>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;