import React, { useState } from 'react';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

const vehicleCategories = [
  'Main Battle Tanks',
  'APCs / IFVs',
  'Recon Vehicles',
  'Missile Platforms',
  'Engineering & Logistics',
  'MRAP Vehicles',
  'Light Utility Vehicles',
];

const vehicleDescriptions = {
  'Arjun MBT': 'The Arjun Main Battle Tank is India’s indigenous third-generation tank, featuring advanced armor, a 120mm rifled gun, and modern fire control. It is designed for high survivability and firepower.',
  'T-90 Bhishma': 'The T-90 Bhishma is a Russian-origin main battle tank, customized for Indian conditions. It is equipped with a 125mm smoothbore gun, advanced armor, and night-fighting capabilities.',
  'BMP-2 Sarath': 'The BMP-2 Sarath is an amphibious infantry fighting vehicle, produced in India under license. It transports troops and provides fire support with a 30mm cannon and anti-tank missiles.',
  'NAMICA': 'NAMICA (Nag Missile Carrier) is a tracked vehicle equipped with Nag anti-tank guided missiles, providing long-range anti-armor capability.',
  'BRDM-2': 'The BRDM-2 is a Soviet four-wheeled amphibious reconnaissance vehicle, formerly used by Indian forces for scouting and patrol duties.',
  'Carrier Command Post Tracked (CCPT)': 'The CCPT is a tracked command vehicle, providing battlefield communication and control for mechanized units.',
  'Pinaka MBRL': 'The Pinaka Multi-Barrel Rocket Launcher is an indigenous artillery system capable of rapid, long-range rocket salvos for area saturation.',
  'Akash SAM Launcher': 'The Akash Surface-to-Air Missile system provides mobile air defense, capable of engaging multiple aerial targets at medium range.',
  'Bridge Layer Tank (BLT)': 'The BLT is a modified tank chassis equipped with a bridge for rapid deployment over obstacles, enabling armored vehicle movement.',
  'Armored Recovery Vehicle (ARV)': 'The ARV is a support vehicle designed to recover, tow, and repair damaged tanks and armored vehicles on the battlefield.',
  'Mine Protected Vehicles (MPVs)': 'MPVs are armored vehicles designed to protect troops from landmines and IEDs, used in counter-insurgency and convoy protection.',
  'Tata MPV': 'The Tata MPV is a mine-resistant ambush protected vehicle, offering high troop survivability in hostile environments.',
  'Kalyani M4': 'The Kalyani M4 is a new-generation MRAP vehicle, offering high mobility, protection, and modularity for modern combat.',
  'Mahindra Marksman': 'The Mahindra Marksman is a bulletproof patrol vehicle, used for urban security, VIP protection, and counter-insurgency.',
  'Tata Safari Storme GS800': 'The Tata Safari Storme GS800 is a rugged, all-terrain light utility vehicle, widely used for troop transport and logistics.',
  'S-400': 'The S-400 is a Russian-made advanced air defense missile system, capable of tracking and neutralizing multiple aerial threats at long range. It is one of the most advanced surface-to-air missile systems in the world.',
};

const Vehicles = () => {
  const { equipment } = useEquipment();
  const vehicles = equipment.filter(eq => vehicleCategories.includes(eq.category));
  const [selected, setSelected] = useState(vehicles[0] || null);

  return (
    <div>
      <h1 style={{ color: '#6fff57', fontWeight: 'bold', fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Vehicles</h1>
      {selected && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img 
            src={getPublicImage(selected.image)} 
            alt={selected.name} 
            style={{ width: 600, height: 400, objectFit: 'cover', borderRadius: 32, background: '#1a1a1a', border: '6px solid #6fff57', boxShadow: '0 12px 64px #000a', marginBottom: 24 }}
            onError={(e) => {
              console.error(`Failed to load vehicle image: ${selected.image}`);
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
              width: 600, 
              height: 400, 
              background: '#333', 
              color: '#fff', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '1.2rem',
              textAlign: 'center',
              borderRadius: 32,
              border: '6px solid #6fff57',
              boxShadow: '0 12px 64px #000a',
              marginBottom: 24
            }}
          >
            {selected.name}<br/>Image not available
          </div>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: 6 }}>{selected.name}</div>
          <div style={{ color: '#6fff57', fontSize: '1.1rem', marginBottom: 6 }}>{selected.category}</div>
          <div style={{ color: '#fff', fontSize: '1.05rem', textAlign: 'center', marginBottom: 8 }}>{vehicleDescriptions[selected.name] || selected.details || 'No description available.'}</div>
        </div>
      )}
      <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '12px 0', margin: '0 auto', maxWidth: 1200 }}>
        {vehicles.map(eq => (
          <div
            key={eq.id}
            onClick={() => setSelected(eq)}
            style={{
              background: selected && selected.id === eq.id ? '#222b3a' : '#1a2336',
              border: selected && selected.id === eq.id ? '3px solid #6fff57' : '2px solid #222b3a',
              borderRadius: 16,
              boxShadow: selected && selected.id === eq.id ? '0 4px 24px #6fff5733' : '0 2px 8px #0006',
              padding: 16,
              minWidth: 180,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'all 0.2s',
            }}
          >
            <img 
              src={getPublicImage(eq.image)} 
              alt={eq.name} 
              style={{ width: 120, height: 80, objectFit: 'contain', borderRadius: 8, background: '#1a1a1a', marginBottom: 10 }}
              onError={(e) => {
                console.error(`Failed to load vehicle thumbnail: ${eq.image}`);
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
                width: 120, 
                height: 80, 
                background: '#333', 
                color: '#fff', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.8rem',
                textAlign: 'center',
                borderRadius: 8,
                marginBottom: 10
              }}
            >
              {eq.name}
            </div>
            <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem', marginBottom: 4, textAlign: 'center' }}>{eq.name}</div>
            <div style={{ color: '#6fff57', fontSize: '0.95rem', textAlign: 'center' }}>{eq.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles; 