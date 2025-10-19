import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

const categories = [
  'All',
  'Main Battle Tanks',
  'APCs / IFVs',
  'Recon Vehicles',
  'Missile Platforms',
  'Engineering & Logistics',
  'MRAP Vehicles',
  'Light Utility Vehicles',
  'Infantry Weapons',
  'Hand Grenades & Launchers',
];

const Equipment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get('status');

  const { equipment } = useEquipment();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false, equipment: null });
  const [status, setStatus] = useState(statusFilter || '');

  useEffect(() => {
    setStatus(statusFilter || '');
  }, [statusFilter]);

  const isAlertsPage = status === 'alerts';
  const filteredList = equipment.filter(eq =>
    (selectedCategory === 'All' || eq.category === selectedCategory) &&
    eq.name.toLowerCase().includes(search.toLowerCase()) &&
    (
      isAlertsPage
        ? (eq.status === 'Under Maintenance' || eq.status === 'Retired')
        : (status ? eq.status === status : true)
    )
  );

  return (
    <div>
      {isAlertsPage && (
        <h1 style={{ color: '#ff4c4c', fontWeight: 'bold', fontSize: '2rem', marginBottom: 16 }}>Active Alerts</h1>
      )}
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
      <h1>Equipment & Weapons</h1>
      <label htmlFor="category-filter" style={{ color: '#6fff57', fontWeight: 'bold' }}>Filter by Category: </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
        style={{ margin: '1rem 0', padding: '0.5rem', fontSize: '1rem' }}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginLeft: 16, padding: '0.5rem', fontSize: '1rem', borderRadius: 6, border: '1px solid #333', background: '#222b3a', color: '#fff' }}
      />
      <div className="equipment-grid">
        {filteredList.length === 0 ? (
          <div style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem' }}>
            {isAlertsPage ? 'No active alerts.' : 'No equipment found for this category.'}
          </div>
        ) : (
          filteredList.map(eq => (
            <div className="equipment-card" key={eq.id} onClick={() => setModal({ open: true, equipment: eq })} style={{ cursor: 'pointer' }}>
              <img 
                src={getPublicImage(eq.image)} 
                alt={eq.name} 
                onError={(e) => {
                  console.error(`Failed to load image: ${eq.image}`);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onLoad={(e) => {
                  // Hide the fallback when image loads successfully
                  e.target.nextSibling.style.display = 'none';
                }}
              />
              <div 
                style={{ 
                  display: 'none', 
                  width: '100%', 
                  height: '200px', 
                  background: '#333', 
                  color: '#fff', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  textAlign: 'center'
                }}
              >
                {eq.name}<br/>Image not available
              </div>
              <div className="title">{eq.name}</div>
              {eq.serial && (
                <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold', marginBottom: 2 }}>Serial: {eq.serial}</div>
              )}
              <div className="category">{eq.category}</div>
              <div className="status" style={isAlertsPage && (eq.status === 'Under Maintenance' || eq.status === 'Retired') ? { color: '#ff4c4c', fontWeight: 'bold' } : {}}>
                Status: {eq.status}
              </div>
              {eq.inductionDate && (
                <div style={{ color: '#6fff57', fontSize: '0.95rem', marginBottom: 0 }}>Induction: {eq.inductionDate}</div>
              )}
              {eq.location && eq.location.city && eq.location.state ? (
                <div style={{ color: '#4fdc3f', fontSize: '0.95rem', marginBottom: 0 }}>
                  Location: {eq.location.city}, {eq.location.state}
                </div>
              ) : (
                <div style={{ color: '#4fdc3f', fontSize: '0.95rem', marginBottom: 0 }}>
                  Location: N/A
                </div>
              )}
              {eq.usedBy && (
                <div style={{ color: '#2e7cff', fontSize: '0.95rem', margin: '4px 0 0 0', fontWeight: 'bold' }}>
                  USED BY: {eq.usedBy}
                </div>
              )}
              {eq.status === 'Under Maintenance' && eq.resumeDate && (
                <div style={{ color: '#ffb347', fontSize: '0.95rem', margin: '4px 0 0 0', fontWeight: 'bold' }}>
                  Resume Date: {eq.resumeDate}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {modal.open && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}
          onClick={() => setModal({ open: false, equipment: null })}
        >
          <div style={{ background: '#1a2336', borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 400, color: '#fff', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal({ open: false, equipment: null })} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}>&times;</button>
            <img 
              src={getPublicImage(modal.equipment.image)} 
              alt={modal.equipment.name} 
              style={{ width: 180, height: 180, objectFit: 'contain', borderRadius: 12, background: '#1a1a1a', marginBottom: 16 }}
              onError={(e) => {
                console.error(`Failed to load modal image: ${modal.equipment.image}`);
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              onLoad={(e) => {
                // Hide the fallback when image loads successfully
                e.target.nextSibling.style.display = 'none';
              }}
            />
            <div 
              style={{ 
                display: 'none', 
                width: 180, 
                height: 180, 
                background: '#333', 
                color: '#fff', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.9rem',
                textAlign: 'center',
                borderRadius: 12,
                marginBottom: 16
              }}
            >
              {modal.equipment.name}<br/>Image not available
            </div>
            <div className="title" style={{ fontSize: '1.4rem' }}>{modal.equipment.name}</div>
            {modal.equipment.serial && (
              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 2 }}>Serial: {modal.equipment.serial}</div>
            )}
            <div className="category">{modal.equipment.category}</div>
            <div className="status" style={isAlertsPage && (modal.equipment.status === 'Under Maintenance' || modal.equipment.status === 'Retired') ? { color: '#ff4c4c', fontWeight: 'bold' } : {}}>
              Status: {modal.equipment.status}
            </div>
            {modal.equipment.inductionDate && (
              <div style={{ color: '#6fff57', fontSize: '1rem', marginTop: 4 }}>Induction: {modal.equipment.inductionDate}</div>
            )}
            {modal.equipment.location && modal.equipment.location.city && modal.equipment.location.state ? (
              <div style={{ color: '#4fdc3f', fontSize: '1rem', marginTop: 4 }}>
                Location: {modal.equipment.location.city}, {modal.equipment.location.state}
              </div>
            ) : (
              <div style={{ color: '#4fdc3f', fontSize: '1rem', marginTop: 4 }}>
                Location: N/A
              </div>
            )}
            {modal.equipment.usedBy && (
              <div style={{ color: '#2e7cff', fontSize: '1rem', marginTop: 4, fontWeight: 'bold' }}>
                USED BY: {modal.equipment.usedBy}
              </div>
            )}
            {modal.equipment.status === 'Under Maintenance' && modal.equipment.resumeDate && (
              <div style={{ color: '#ffb347', fontSize: '1rem', marginTop: 4, fontWeight: 'bold' }}>
                Resume Date: {modal.equipment.resumeDate}
              </div>
            )}
            <div style={{ marginTop: 16 }}>{modal.equipment.details}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment; 