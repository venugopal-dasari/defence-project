import React, { useState } from 'react';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

const weaponCategories = ['Infantry Weapons', 'Hand Grenades & Launchers'];

const weaponDescriptions = {
  'INSAS Rifle': 'The INSAS (Indian Small Arms System) is a 5.56mm assault rifle developed by India’s DRDO. It is the standard-issue rifle for the Indian Army, known for its reliability and use in diverse terrains.',
  'AK-203': 'The AK-203 is a modern 7.62mm assault rifle, a joint Indo-Russian project. It offers improved ergonomics, reliability, and firepower, and is set to replace the INSAS in frontline service.',
  'AK-47': 'The AK-47 is a legendary 7.62mm assault rifle, renowned for its ruggedness, simplicity, and reliability. Used globally, it is favored for its ability to function in harsh conditions.',
  'INSAS LMG': 'The INSAS Light Machine Gun is a squad automatic weapon variant of the INSAS family, providing sustained fire support. It is being phased out in favor of more modern LMGs.',
  'Barrett M95 / M107': 'The Barrett M95 and M107 are .50 caliber anti-materiel sniper rifles, capable of disabling vehicles and equipment at long range. Used by Indian Special Forces for high-value target engagement.',
  'M4 Carbine': 'The M4 Carbine is a 5.56mm, lightweight, and compact assault rifle, widely used by Indian Special Forces for close-quarters battle and urban operations.',
  'Zittara SMG': 'The Zittara is an indigenous 9mm submachine gun, designed for close-quarters combat and used by Indian paramilitary and police forces.',
  'Brugger & Thomet APC9': 'The APC9 is a Swiss 9mm submachine gun, known for its modularity, low recoil, and use by Indian Special Forces in counter-terrorism operations.',
  'Glock 17': 'The Glock 17 is a 9mm semi-automatic pistol, valued for its reliability, light weight, and widespread use among Indian police and special units.',
  'Pistol Auto 9mm 1A': 'The Pistol Auto 9mm 1A is a standard-issue sidearm for the Indian Army, based on the Browning Hi-Power design, robust and easy to maintain.',
  'Multi-Mode Hand Grenade (MMHG)': 'The MMHG is an indigenous hand grenade with both defensive and offensive modes, designed for safety and effectiveness in combat situations.',
  'UBGL': 'The Under Barrel Grenade Launcher (UBGL) is attached to rifles like INSAS and AK, providing infantry with 40mm grenade firepower for area suppression and anti-personnel use.',
};

const Weapons = () => {
  const { equipment } = useEquipment();
  const weapons = equipment.filter(eq => weaponCategories.includes(eq.category));
  const [selected, setSelected] = useState(weapons[0] || null);

  return (
    <div>
      <h1 style={{ color: '#ffb347', fontWeight: 'bold', fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>Weapons</h1>
      {selected && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <img 
            src={getPublicImage(selected.image)} 
            alt={selected.name} 
            style={{ width: 600, height: 400, objectFit: 'contain', borderRadius: 32, background: '#1a1a1a', border: '6px solid #ffb347', boxShadow: '0 12px 64px #000a', marginBottom: 24 }}
            onError={(e) => {
              console.error(`Failed to load weapon image: ${selected.image}`);
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
              border: '6px solid #ffb347',
              boxShadow: '0 12px 64px #000a',
              marginBottom: 24
            }}
          >
            {selected.name}<br/>Image not available
          </div>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', marginBottom: 6 }}>{selected.name}</div>
          <div style={{ color: '#6fff57', fontSize: '1.1rem', marginBottom: 6 }}>{selected.category}</div>
          <div style={{ color: '#fff', fontSize: '1.05rem', textAlign: 'center', marginBottom: 8 }}>{weaponDescriptions[selected.name] || selected.details || 'No description available.'}</div>
        </div>
      )}
      <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '12px 0', margin: '0 auto', maxWidth: 1200 }}>
        {weapons.map(eq => (
          <div
            key={eq.id}
            onClick={() => setSelected(eq)}
            style={{
              background: selected && selected.id === eq.id ? '#222b3a' : '#1a2336',
              border: selected && selected.id === eq.id ? '3px solid #ffb347' : '2px solid #222b3a',
              borderRadius: 16,
              boxShadow: selected && selected.id === eq.id ? '0 4px 24px #ffb34733' : '0 2px 8px #0006',
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
                console.error(`Failed to load weapon thumbnail: ${eq.image}`);
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

export default Weapons; 