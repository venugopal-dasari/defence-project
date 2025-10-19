import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import AddEquipment from './pages/AddEquipment';
import { EquipmentProvider } from './EquipmentContext';
import ArmyUnits from './pages/ArmyUnits';
import Weapons from './pages/Weapons';
import Vehicles from './pages/Vehicles';
import About from './pages/About';
import ImageTest from './pages/ImageTest';
import { getPublicImage } from './utils/imageLoader';

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/weapons', label: 'Weapons' },
    { to: '/vehicles', label: 'Vehicles' },
    { to: '/add', label: 'Add Equipment' },
    { to: '/units', label: 'Indian Army Units' },
    { to: '/about', label: 'About' },
  ];
  return (
    <nav style={{
      background: 'linear-gradient(90deg, #151e2b 60%, #2e7cff 100%)',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '2.2rem',
      boxShadow: '0 2px 12px #0004',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {navLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            color: location.pathname === link.to ? '#6fff57' : '#fff',
            textDecoration: 'none',
            fontWeight: location.pathname === link.to ? 'bold' : 500,
            fontSize: '1.08rem',
            padding: '0.4rem 1.1rem',
            borderRadius: 8,
            background: location.pathname === link.to ? 'rgba(111,255,87,0.08)' : 'transparent',
            boxShadow: location.pathname === link.to ? '0 2px 8px #6fff5733' : 'none',
            transition: 'all 0.18s',
            position: 'relative',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(46,124,255,0.18)';
            e.currentTarget.style.color = '#6fff57';
            e.currentTarget.style.transform = 'scale(1.07)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = location.pathname === link.to ? 'rgba(111,255,87,0.08)' : 'transparent';
            e.currentTarget.style.color = location.pathname === link.to ? '#6fff57' : '#fff';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

function App() {
  return (
    <EquipmentProvider>
      <Router>
        <Navbar />
        <div style={{ position: 'relative', padding: '2rem' }}>
          {/* Top-right Indian flag, fixed and independent of logo */}
          <img
            src={getPublicImage("/india.png")}
            alt="Indian Flag"
            style={{
              position: 'fixed',
              top: 14,
              right: 64,
              width: 60,
              height: 40,
              objectFit: 'cover',
              borderRadius: 4,
              boxShadow: '0 2px 8px #0006',
              border: '2px solid #fff',
              zIndex: 2000,
            }}
          />
          {/* Top-right large Indian Army logo with Sanskrit shloka below */}
          <div style={{ position: 'absolute', top: 20, right: 0, width: 170, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={getPublicImage("/army_logo.png")}
              alt="Indian Army Logo"
              style={{
                width: 140,
                height: 160,
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 12px #0006)',
                marginBottom: -18,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
            <div style={{
              fontWeight: 800,
              fontSize: '1.1rem',
              textAlign: 'center',
              color: '#FFD700', // Elegant gold
              textShadow: '0 2px 8px #000a',
              background: 'rgba(21,30,43,0.60)',
              borderRadius: 8,
              padding: '10px 10px',
              marginTop: -8,
              fontFamily: 'Mukta, Noto Sans Devanagari, sans-serif',
              letterSpacing: '0.07em',
              maxWidth: 160,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              कर्तव्यं शौर्यं धर्मः
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/add" element={<AddEquipment />} />
            <Route path="/about" element={<About />} />
            <Route path="/units" element={<ArmyUnits />} />
            <Route path="/test" element={<ImageTest />} />
          </Routes>
        </div>
      </Router>
    </EquipmentProvider>
  );
}

export default App;
