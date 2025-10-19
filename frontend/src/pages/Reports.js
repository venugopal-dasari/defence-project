import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Reports = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#6fff57',
          color: '#151e2b',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: 8,
          padding: '0.7rem 1.5rem',
          marginBottom: 24,
          cursor: 'pointer',
          boxShadow: '0 2px 12px #0004',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => (e.currentTarget.style.background = '#4fdc3f')}
        onMouseOut={e => (e.currentTarget.style.background = '#6fff57')}
      >
        ← Go Back to Dashboard
      </button>
      <h1>Reports & Analytics</h1>
      <div className="equipment-card" style={{ width: 400, marginTop: 32 }}>
        <div className="title">Coming Soon</div>
        <div>Analytics and reports will be displayed here.</div>
      </div>
    </div>
  );
};

export default Reports; 