import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

const unitOptions = [
  { name: 'Special Forces (Para SF)', img: '/PARA SF.jpg' },
  { name: 'Rashtriya Rifles', img: '/rashtriya.jpg' },
  { name: 'Border Security Forces (BSF)', img: '/BSF.jpg' },
  { name: 'Assam Rifles', img: '/Assam.jpg' },
  { name: 'Gorkha Regiment', img: '/Gorkha (1).jpg' },
  { name: 'Rajput Regiments', img: '/Rajput.jpg' },
  { name: 'NSG Commando', img: '/NSG.jpg' },
  { name: 'CRPF', img: '/CRPF.jpg' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { equipment } = useEquipment();
  const [selectedUnit, setSelectedUnit] = useState('');
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [healthTab, setHealthTab] = useState('Operational');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredEq, setHoveredEq] = useState(null);
  // Mocked recent activity with type
  const recentActivity = [
    { text: 'T-90 Bhishma moved to Under Maintenance', date: '2025-07-01', type: 'maintenance' },
    { text: 'Arjun MBT became Operational', date: '2025-06-28', type: 'operational' },
    { text: 'INSAS LMG retired', date: '2025-06-20', type: 'retired' },
  ];
  const activityIcon = type => type === 'operational' ? '🟢' : type === 'maintenance' ? '🟡' : '🔴';
  const pieRef = useRef(null);
  // For animated pie chart
  const [pieAnimated, setPieAnimated] = useState(false);

  // Calculate stats
  const totalEquipment = equipment.length;
  const typesUsed = Array.from(new Set(equipment.map(eq => eq.name)));
  const operationalCount = equipment.filter(eq => eq.status === 'Operational').length;
  const maintenanceCount = equipment.filter(eq => eq.status === 'Under Maintenance').length;
  const retiredCount = equipment.filter(eq => eq.status === 'Retired' || eq.status === 'Being Phased Out').length;
  const equipmentHealth = totalEquipment > 0 ? Math.round((operationalCount / totalEquipment) * 100) : 0;
  const dueForMaintenance = maintenanceCount;
  const activeAlerts = maintenanceCount + retiredCount;

  useEffect(() => {
    if (showHealthModal) {
      setPieAnimated(false);
      setTimeout(() => setPieAnimated(true), 100);
    }
  }, [showHealthModal]);

  // Pie chart segment calculation
  const getPieArc = (start, end, color) => {
    const r = 16, cx = 16, cy = 16;
    const startAngle = 2 * Math.PI * start;
    const endAngle = 2 * Math.PI * end;
    const x1 = cx + r * Math.sin(startAngle);
    const y1 = cy - r * Math.cos(startAngle);
    const x2 = cx + r * Math.sin(endAngle);
    const y2 = cy - r * Math.cos(endAngle);
    const largeArc = end - start > 0.5 ? 1 : 0;
    return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
  };
  const opFrac = totalEquipment ? operationalCount / totalEquipment : 0;
  const maintFrac = totalEquipment ? maintenanceCount / totalEquipment : 0;
  const retFrac = totalEquipment ? retiredCount / totalEquipment : 0;

  // Filtered equipment for current tab and search
  const filteredEquipment = equipment.filter(eq => {
    let statusMatch = false;
    if (healthTab === 'Operational') statusMatch = eq.status === 'Operational';
    if (healthTab === 'Under Maintenance') statusMatch = eq.status === 'Under Maintenance';
    if (healthTab === 'Retired/Phased Out') statusMatch = eq.status === 'Retired' || eq.status === 'Being Phased Out';
    const searchMatch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || (eq.serial && eq.serial.toLowerCase().includes(searchTerm.toLowerCase())) || (eq.usedBy && eq.usedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    return statusMatch && searchMatch;
  });
  // CSV export
  const handleExport = () => {
    const rows = [
      ['Name', 'Serial', 'Status', 'Used By', 'Induction Date', 'Location'],
      ...filteredEquipment.map(eq => [eq.name, eq.serial, eq.status, eq.usedBy, eq.inductionDate, eq.location && eq.location.city ? `${eq.location.city}, ${eq.location.state}` : 'N/A'])
    ];
    const csv = rows.map(r => r.map(x => `"${x || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `equipment_health_${healthTab.replace(/\s/g, '_').toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUnitChange = (e) => {
    const unit = e.target.value;
    setSelectedUnit(unit);
    if (unit) navigate(`/equipment?unit=${encodeURIComponent(unit)}`);
  };

  return (
    <div className="main-content">
      <h1 style={{ color: '#6fff57', fontWeight: 'bold', fontSize: '2.5rem', marginBottom: 32 }}>Welcome to Defence Equipment Tracker</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <label style={{ color: '#2e7cff', fontWeight: 'bold', fontSize: '1.2rem' }}>Indian Army Units:</label>
        <select
          value={selectedUnit}
          onChange={handleUnitChange}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: 8, border: '1px solid #333', background: '#222b3a', color: '#fff' }}
        >
          <option value="">-- Select Unit --</option>
          {unitOptions.map(unit => (
            <option key={unit.name} value={unit.name}>{unit.name}</option>
          ))}
        </select>
        {selectedUnit && (
          <img src={getPublicImage(unitOptions.find(u => u.name === selectedUnit)?.img)} alt={selectedUnit} style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 8, marginLeft: 12, background: '#fff' }} />
        )}
      </div>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div 
          className="equipment-card" 
          style={{ minWidth: 280, cursor: 'pointer' }}
          onClick={() => navigate('/equipment')}
        >
          <div className="title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Total Equipment</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#6fff57', margin: '12px 0' }}>{totalEquipment}</div>
          <div style={{ marginTop: 8, fontSize: '1.1rem', color: '#fff' }}>
            Types Used: {typesUsed.length}
          </div>
        </div>
        <div 
          className="equipment-card" 
          style={{ minWidth: 280, cursor: 'pointer' }}
          onClick={() => navigate('/equipment?status=Under%20Maintenance')}
        >
          <div className="title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Due for Maintenance</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffb347', margin: '12px 0' }}>{dueForMaintenance}</div>
        </div>
        <div 
          className="equipment-card" 
          style={{ minWidth: 280, cursor: 'pointer' }}
          onClick={() => navigate('/equipment?status=alerts')}
        >
          <div className="title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Active Alerts</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff4c4c', margin: '12px 0' }}>{activeAlerts}</div>
        </div>
        <div
          className="equipment-card"
          style={{ minWidth: 280, cursor: 'pointer', position: 'relative' }}
          onClick={() => setShowHealthModal(true)}
        >
          <div className="title" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Equipment Health</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#6fff57', margin: '12px 0' }}>{equipmentHealth}% Operational</div>
          <div style={{ width: '100%', height: 16, background: '#222b3a', borderRadius: 8, margin: '12px 0' }}>
            <div style={{ width: `${equipmentHealth}%`, height: '100%', background: '#6fff57', borderRadius: 8, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>
      {showHealthModal && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
          }}
          onClick={() => setShowHealthModal(false)}
        >
          <div
            style={{
              background: '#1a2336', borderRadius: 20, padding: 40, minWidth: 340, maxWidth: 520, color: '#fff', position: 'relative', boxShadow: '0 8px 48px #000a', width: '90vw', maxHeight: '90vh', overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowHealthModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' }}>&times;</button>
            <h2 style={{ color: '#6fff57', marginBottom: 18 }}>Equipment Health Breakdown</h2>
            {/* Animated Pie Chart */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <svg width="120" height="120" viewBox="0 0 32 32" ref={pieRef}>
                <circle r="16" cx="16" cy="16" fill="#222b3a" />
                {/* Operational */}
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="#6fff57"
                  strokeWidth="6"
                  strokeDasharray={`${(operationalCount/totalEquipment)*100} 100`}
                  strokeDashoffset={pieAnimated ? 0 : 100}
                  style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,2,.6,1)' }}
                  transform="rotate(-90 16 16)"
                />
                {/* Under Maintenance */}
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="#ffb347"
                  strokeWidth="6"
                  strokeDasharray={`${(maintenanceCount/totalEquipment)*100} 100`}
                  strokeDashoffset={pieAnimated ? (100 - (operationalCount/totalEquipment)*100) : 100}
                  style={{ transition: 'stroke-dashoffset 1s 0.3s cubic-bezier(.4,2,.6,1)' }}
                  transform={`rotate(${(operationalCount/totalEquipment)*360 - 90} 16 16)`}
                />
                {/* Retired */}
                <circle
                  r="16"
                  cx="16"
                  cy="16"
                  fill="transparent"
                  stroke="#ff4c4c"
                  strokeWidth="6"
                  strokeDasharray={`${(retiredCount/totalEquipment)*100} 100`}
                  strokeDashoffset={pieAnimated ? (100 - ((operationalCount+maintenanceCount)/totalEquipment)*100) : 100}
                  style={{ transition: 'stroke-dashoffset 1s 0.6s cubic-bezier(.4,2,.6,1)' }}
                  transform={`rotate(${((operationalCount+maintenanceCount)/totalEquipment)*360 - 90} 16 16)`}
                />
              </svg>
            </div>
            {/* Status Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              {['Operational', 'Under Maintenance', 'Retired/Phased Out'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setHealthTab(tab)}
                  style={{
                    background: healthTab === tab ? '#2e7cff' : '#222b3a',
                    color: healthTab === tab ? '#fff' : '#aaa',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 18px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: healthTab === tab ? '0 2px 8px #2e7cff44' : 'none',
                    transition: 'all 0.18s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search/Export/Activity Feed */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #333', background: '#222b3a', color: '#fff', fontSize: '1rem', minWidth: 160 }}
              />
              <button
                onClick={handleExport}
                style={{ background: '#6fff57', color: '#151e2b', fontWeight: 'bold', border: 'none', borderRadius: 8, padding: '6px 18px', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 2px 8px #6fff5733' }}
              >
                Export CSV
              </button>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 180 }}>
                <div style={{ color: '#2e7cff', fontWeight: 'bold', fontSize: '1.08rem', marginBottom: 2, borderBottom: '2px solid #2e7cff', width: '100%', paddingBottom: 2 }}>Recent Activity</div>
                <ul style={{ margin: 0, paddingLeft: 0, color: '#fff', fontSize: '0.98rem', maxHeight: 60, overflowY: 'auto', width: '100%' }}>
                  {recentActivity.map((a, i) => (
                    <li key={i} style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: 6, borderBottom: i !== recentActivity.length - 1 ? '1px solid #222b3a' : 'none', padding: '2px 0' }}>
                      <span style={{ fontSize: '1.1em' }}>{activityIcon(a.type)}</span>
                      <span>{a.text}</span>
                      <span style={{ color: '#6fff57', fontSize: '0.92em', marginLeft: 4 }}>({a.date})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Equipment List for Selected Tab with hover details and maintenance prediction */}
            <div style={{ maxHeight: 160, overflowY: 'auto', marginBottom: 18, background: '#222b3a', borderRadius: 8, padding: 8 }}>
              {filteredEquipment.length === 0 ? (
                <div style={{ color: '#aaa', textAlign: 'center' }}>No equipment found.</div>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 0 }}>
                  {filteredEquipment.map((eq, idx) => (
                    <li
                      key={eq.id}
                      style={{
                        color: '#fff',
                        fontSize: '1.04rem',
                        fontWeight: 500,
                        position: 'relative',
                        cursor: 'pointer',
                        padding: '8px 0 8px 18px',
                        borderBottom: idx !== filteredEquipment.length - 1 ? '1px solid #222b3a' : 'none',
                        background: hoveredEq === eq.id ? 'rgba(46,124,255,0.08)' : 'transparent',
                        transition: 'background 0.18s',
                      }}
                      onMouseEnter={() => setHoveredEq(eq.id)}
                      onMouseLeave={() => setHoveredEq(null)}
                    >
                      {eq.name} ({eq.serial}) - {eq.usedBy}
                      {/* Tooltip for details */}
                      {hoveredEq === eq.id && (
                        <div style={{
                          position: 'absolute', left: '100%', top: 0, background: '#151e2b', color: '#fff', borderRadius: 8, padding: '10px 16px', boxShadow: '0 2px 12px #000a', zIndex: 100, minWidth: 220, marginLeft: 12, fontSize: '0.97rem', whiteSpace: 'normal', pointerEvents: 'none'
                        }}>
                          <div><b>Induction Date:</b> {eq.inductionDate || 'N/A'}</div>
                          <div><b>Location:</b> {eq.location && eq.location.city ? `${eq.location.city}, ${eq.location.state}` : 'N/A'}</div>
                          <div><b>Status:</b> {eq.status}</div>
                          <div><b>Last Maintenance:</b> {eq.resumeDate || '2025-07-01'}</div>
                          <div style={{ color: '#ffb347', marginTop: 4 }}><b>Next likely maintenance:</b> 2025-08-01</div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Trend Indicator (mocked) */}
            <div style={{ textAlign: 'center', marginBottom: 10, color: '#6fff57', fontWeight: 'bold' }}>
              +2 equipment became operational this week
            </div>
            {/* Status Bars with Tooltips */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, gap: 8 }}>
              <div
                style={{ color: '#6fff57', cursor: 'pointer', position: 'relative' }}
                onClick={() => { setShowHealthModal(false); navigate('/equipment?status=Operational'); }}
                title="Click to view all operational equipment"
              >
                <b>Operational:</b> {operationalCount}
              </div>
              <div
                style={{ color: '#ffb347', cursor: 'pointer', position: 'relative' }}
                onClick={() => { setShowHealthModal(false); navigate('/equipment?status=Under%20Maintenance'); }}
                title="Click to view all equipment under maintenance"
              >
                <b>Under Maintenance:</b> {maintenanceCount}
              </div>
              <div
                style={{ color: '#ff4c4c', cursor: 'pointer', position: 'relative' }}
                onClick={() => { setShowHealthModal(false); navigate('/equipment?status=Retired'); }}
                title="Click to view all retired/phased out equipment"
              >
                <b>Retired/Phased Out:</b> {retiredCount}
              </div>
            </div>
            {/* Equipment Lists */}
            <div style={{ maxHeight: 120, overflowY: 'auto', marginBottom: 12, background: '#222b3a', borderRadius: 8, padding: 8 }}>
              <b style={{ color: '#6fff57' }}>Operational Equipment:</b>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {equipment.filter(eq => eq.status === 'Operational').map(eq => (
                  <li key={eq.id} style={{ color: '#fff', fontSize: '0.98rem' }}>{eq.name} ({eq.serial}) - {eq.usedBy}</li>
                ))}
              </ul>
              <b style={{ color: '#ffb347' }}>Under Maintenance:</b>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {equipment.filter(eq => eq.status === 'Under Maintenance').map(eq => (
                  <li key={eq.id} style={{ color: '#fff', fontSize: '0.98rem' }}>{eq.name} ({eq.serial}) - {eq.usedBy}</li>
                ))}
              </ul>
              <b style={{ color: '#ff4c4c' }}>Retired/Phased Out:</b>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {equipment.filter(eq => eq.status === 'Retired' || eq.status === 'Being Phased Out').map(eq => (
                  <li key={eq.id} style={{ color: '#fff', fontSize: '0.98rem' }}>{eq.name} ({eq.serial}) - {eq.usedBy}</li>
                ))}
              </ul>
            </div>
            {/* Most Common Issues (mocked) */}
            <div style={{ marginBottom: 10, color: '#ffb347', fontWeight: 'bold' }}>
              Most Common Issues: Engine Overhaul, Barrel Wear, Electronics Fault
            </div>
            <div style={{ width: '100%', height: 18, background: '#222b3a', borderRadius: 8, margin: '18px 0' }}>
              <div style={{ width: `${equipmentHealth}%`, height: '100%', background: '#6fff57', borderRadius: 8, transition: 'width 0.3s' }} />
            </div>
            <div style={{ textAlign: 'center', color: '#aaa', fontSize: '0.98rem' }}>Click anywhere to close</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 