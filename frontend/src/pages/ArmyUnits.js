import React, { useState } from 'react';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

const unitOptions = [
  { name: 'Special Forces (Para SF)', img: '/PARA SF2.jpg', desc: 'Elite special operations force of the Indian Army, known for high-risk missions and counter-terrorism.' },
  { name: 'Rashtriya Rifles', img: '/rashtriya.jpg', desc: 'Counter-insurgency force specializing in operations in Jammu & Kashmir.' },
  { name: 'Border Security Forces (BSF)', img: '/BSF2.jpg', desc: 'India’s primary border guarding organization, securing international borders and preventing trans-border crimes.' },
  { name: 'Assam Rifles', img: '/Assam_Rifles2.jpg', desc: 'Oldest paramilitary force, responsible for security in Northeast India and Indo-Myanmar border.' },
  { name: 'Gorkha Regiment', img: '/Gorkha (1).jpg', desc: 'Renowned infantry regiments, known for bravery and service in high-altitude and difficult terrains.' },
  { name: 'Rajput Regiments', img: '/Rajput.jpg', desc: 'Historic infantry regiment, recognized for valor and distinguished service in various wars.' },
  { name: 'NSG Commando', img: '/NSG3.jpg', desc: 'National Security Guard, India’s premier counter-terrorism and hostage rescue force.' },
  { name: 'CRPF', img: '/CRPF2.jpg', desc: 'Central Reserve Police Force, India’s largest paramilitary force, specializing in internal security and counter-insurgency.' },
  { name: 'Cobra', img: '/COBRA.png', desc: 'COBRA (Commando Battalion for Resolute Action) is a specialized unit of the CRPF, trained for guerrilla tactics and jungle warfare, primarily for anti-Naxal operations.' },
  { name: 'Marcos', img: '/MARCOS.jpg', desc: 'MARCOS (Marine Commandos) are the elite special operations unit of the Indian Navy, specializing in maritime, amphibious, and counter-terrorism operations.' },
  { name: 'ATS Commando', img: '/ATS.jpg', desc: 'ATS (Anti-Terrorism Squad) Commandos are specialized police units in various Indian states, focused on counter-terrorism, hostage rescue, and high-risk law enforcement.' },
];

const ArmyUnits = () => {
  const { equipment } = useEquipment();
  const [selectedUnit, setSelectedUnit] = useState('');
  // If no equipment is found for a unit, show all equipment as a fallback for demo
  const filteredList = selectedUnit ? (equipment.filter(eq => eq.usedBy === selectedUnit).length > 0 ? equipment.filter(eq => eq.usedBy === selectedUnit) : equipment.slice(0, 3)) : [];
  const unitImg = unitOptions.find(u => u.name === selectedUnit)?.img;

  return (
    <div>
      <h1 style={{ color: '#2e7cff', fontWeight: 'bold', fontSize: '2rem', marginBottom: 24 }}>Indian Army Units</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32, justifyContent: 'flex-start' }}>
        <label style={{ color: '#2e7cff', fontWeight: 'bold', fontSize: '1.2rem' }}>Select Unit:</label>
        <select
          value={selectedUnit}
          onChange={e => setSelectedUnit(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: 8, border: '1px solid #333', background: '#222b3a', color: '#fff' }}
        >
          <option value="">-- Select Unit --</option>
          {unitOptions.map(unit => (
            <option key={unit.name} value={unit.name}>{unit.name}</option>
          ))}
        </select>
      </div>
      {selectedUnit && unitImg && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img src={getPublicImage(unitImg)} alt={selectedUnit} style={{ width: 420, height: 420, objectFit: 'cover', borderRadius: 24, background: '#fff', border: '4px solid #2e7cff', boxShadow: '0 8px 48px #000a' }} />
          <div style={{ color: '#fff', fontSize: '1.15rem', marginTop: 18, maxWidth: 600, textAlign: 'center', background: '#222b3a', borderRadius: 12, padding: '1rem 2rem', boxShadow: '0 2px 12px #0006' }}>
            {unitOptions.find(u => u.name === selectedUnit)?.desc}
          </div>
        </div>
      )}
      {selectedUnit && (
        filteredList.length === 0 ? (
          <div style={{ color: '#fff', fontSize: '1.2rem', marginTop: '2rem' }}>No equipment found for this unit.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1a2336', color: '#fff', borderRadius: 12 }}>
              <thead>
                <tr style={{ background: '#151e2b', color: '#6fff57' }}>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Image</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Name</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Serial</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Category</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Induction</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Location</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>USED BY</th>
                  <th style={{ padding: '12px 8px', fontWeight: 'bold' }}>Resume Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map(eq => (
                  <tr key={eq.id} style={{ borderBottom: '1px solid #222b3a' }}>
                    <td style={{ padding: '8px' }}><img src={getPublicImage(eq.image)} alt={eq.name} style={{ width: 90, height: 90, objectFit: 'contain', borderRadius: 8, background: '#1a1a1a' }} /></td>
                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#fff' }}>{eq.name}</td>
                    <td style={{ padding: '8px', color: '#fff' }}>{eq.serial || 'N/A'}</td>
                    <td style={{ padding: '8px', color: '#6fff57' }}>{eq.category}</td>
                    <td style={{ padding: '8px', color: eq.status === 'Under Maintenance' ? '#ff4c4c' : '#ffb347', fontWeight: 'bold' }}>{eq.status}</td>
                    <td style={{ padding: '8px', color: '#6fff57' }}>{eq.inductionDate || 'N/A'}</td>
                    <td style={{ padding: '8px', color: '#4fdc3f' }}>{eq.location && eq.location.city && eq.location.state ? `${eq.location.city}, ${eq.location.state}` : 'N/A'}</td>
                    <td style={{ padding: '8px', color: '#2e7cff', fontWeight: 'bold' }}>{eq.usedBy}</td>
                    <td style={{ padding: '8px', color: '#ffb347', fontWeight: 'bold' }}>{eq.status === 'Under Maintenance' && eq.resumeDate ? eq.resumeDate : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default ArmyUnits; 