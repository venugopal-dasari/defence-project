import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useEquipment } from '../EquipmentContext';
import { getPublicImage } from '../utils/imageLoader';

// List of all available models with their details
const modelOptions = [
  { name: 'Arjun MBT', category: 'Main Battle Tanks', type: 'Tank', image: '/ArjunMBT_Mk1.jpg' },
  { name: 'T-90 Bhishma', category: 'Main Battle Tanks', type: 'Tank', image: '/T-90 Bhishma.jpg' },
  { name: 'BMP-2 Sarath', category: 'APCs / IFVs', type: 'IFV', image: '/BMP-2 Sarath.jpg' },
  { name: 'NAMICA', category: 'APCs / IFVs', type: 'Missile Carrier', image: '/NAMICA.jpg' },
  { name: 'BRDM-2', category: 'Recon Vehicles', type: 'Recon Vehicle', image: '/BRDM-2.jpg' },
  { name: 'Carrier Command Post Tracked (CCPT)', category: 'Recon Vehicles', type: 'Command Post', image: '/Carrier Command Post Tracked (CCPT).jpg' },
  { name: 'Pinaka MBRL', category: 'Missile Platforms', type: 'Rocket Launcher', image: '/Pinaka MBRL.png' },
  { name: 'Akash SAM Launcher', category: 'Missile Platforms', type: 'SAM Launcher', image: '/Akash SAM Launcher.jpg' },
  { name: 'Bridge Layer Tank (BLT)', category: 'Engineering & Logistics', type: 'Bridge Layer', image: '/Bridge Layer Tank (BLT).jpg' },
  { name: 'Armored Recovery Vehicle (ARV)', category: 'Engineering & Logistics', type: 'Recovery Vehicle', image: '/Armored Recovery Vehicle (ARV).jpg' },
  { name: 'Mine Protected Vehicles (MPVs)', category: 'Engineering & Logistics', type: 'MPV', image: '/Mine Protected Vehicles (MPVs).jpg' },
  { name: 'Tata MPV', category: 'MRAP Vehicles', type: 'MRAP', image: '/Tata Safari Storme GS800.jpg' },
  { name: 'Kalyani M4', category: 'MRAP Vehicles', type: 'MRAP', image: '/Kalyani M4.jpg' },
  { name: 'Mahindra Marksman', category: 'Light Utility Vehicles', type: 'Patrol Vehicle', image: '/Mahindra Marksman.jpg' },
  { name: 'Tata Safari Storme GS800', category: 'Light Utility Vehicles', type: 'Utility Vehicle', image: '/Tata Safari Storme GS800.jpg' },
  { name: 'INSAS Rifle', category: 'Infantry Weapons', type: 'Rifle', image: '/INSAS Rifle (Indian Small Arms System).jpg' },
  { name: 'AK-203', category: 'Infantry Weapons', type: 'Rifle', image: '/AK-203 (Replacing INSAS, Indo-Russian).jpg' },
  { name: 'AK-47', category: 'Infantry Weapons', type: 'Rifle', image: '/AK-47.jpg' },
  { name: 'INSAS LMG', category: 'Infantry Weapons', type: 'LMG', image: '/INSAS LMG (being phased out).jpg' },
  { name: 'Barrett M95 / M107', category: 'Infantry Weapons', type: 'Anti-materiel Rifle', image: '/Barrett M95  M107.jpg' },
  { name: 'M4 Carbine', category: 'Infantry Weapons', type: 'Carbine', image: '/M4 Carbine (Special Forces).jpg' },
  { name: 'Zittara SMG', category: 'Infantry Weapons', type: 'SMG', image: '/Zittara SMG (India).jpg' },
  { name: 'Brugger & Thomet APC9', category: 'Infantry Weapons', type: 'SMG', image: '/Brugger & Thomet APC9.jpg' },
  { name: 'Glock 17', category: 'Infantry Weapons', type: 'Pistol', image: '/Glock 17.jpg' },
  { name: 'Pistol Auto 9mm 1A', category: 'Infantry Weapons', type: 'Pistol', image: '/Pistol Auto 9mm 1A.jpg' },
  { name: 'Multi-Mode Hand Grenade (MMHG)', category: 'Hand Grenades & Launchers', type: 'Hand Grenade', image: '/Multi-Mode Hand Grenade (MMHG).jpg' },
  { name: 'UBGL', category: 'Hand Grenades & Launchers', type: 'Grenade Launcher', image: '/UBGL (Under Barrel Grenade Launcher).jpg' },
  { name: 'S-400', category: 'Missile Platforms', type: 'Air Defense System', image: '/S-4002.jpg' },
];

// Mapping from category to group
const categoryToGroup = category => {
  if ([
    'Infantry Weapons',
    'Hand Grenades & Launchers'
  ].includes(category)) return 'Weapon';
  if ([
    'Main Battle Tanks',
    'APCs / IFVs',
    'Recon Vehicles',
    'Missile Platforms',
    'MRAP Vehicles',
    'Light Utility Vehicles'
  ].includes(category)) return 'Vehicle';
  if ([
    'Engineering & Logistics'
  ].includes(category)) return 'Machine';
  return '';
};

const cityToState = {
  'Udhampur': 'Jammu & Kashmir',
  'Srinagar': 'Jammu & Kashmir',
  'Leh': 'Ladakh',
  'Jammu': 'Jammu & Kashmir',
  'Nagrota': 'Jammu & Kashmir',
  'Kupwara': 'Jammu & Kashmir',
  'Baramulla': 'Jammu & Kashmir',
  'Rajouri': 'Jammu & Kashmir',
  'Poonch': 'Jammu & Kashmir',
  'Kargil': 'Ladakh',
  'Samba': 'Jammu & Kashmir',
  'Delhi': 'Delhi',
  'Jabalpur': 'Madhya Pradesh',
  'Bangalore': 'Karnataka',
  'Pune': 'Maharashtra',
  'Ludhiana': 'Punjab',
};

const operationalCities = ['Udhampur', 'Srinagar', 'Leh', 'Jammu', 'Nagrota', 'Kupwara', 'Baramulla', 'Rajouri', 'Poonch', 'Kargil', 'Samba'];
const maintenanceCities = ['Delhi', 'Jabalpur', 'Bangalore', 'Pune', 'Ludhiana'];

const unitOptions = [
  'Special Forces (Para SF)',
  'Rashtriya Rifles',
  'Border Security Forces (BSF)',
  'Assam Rifles',
  'Gorkha Regiment',
  'Rajput Regiments',
  'NSG Commando',
  'CRPF',
  'Cobra',
  'MARCOS',
  'ATS Commando',
];

const AddEquipment = () => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    type: '',
    serial: '',
    manufacturer: '',
    origin: '',
    inductionDate: '',
    status: '',
    image: '',
    location: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);
  const { addEquipment } = useEquipment();
  const navigate = useNavigate();

  const handleModelChange = e => {
    const selected = modelOptions.find(m => m.name === e.target.value);
    setForm(prev => ({
      ...prev,
      name: selected ? selected.name : '',
      category: selected ? selected.category : '',
      type: selected ? selected.type : '',
      image: selected ? selected.image : '',
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'location') {
      setForm(prev => ({ ...prev, location: value ? { city: value, state: cityToState[value] } : '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const locationOptions =
    form.status === 'Operational' || form.status === 'In Service'
      ? operationalCities
      : form.status === 'Under Maintenance' || form.status === 'Being Phased Out'
      ? maintenanceCities
      : [];

  const isUnderMaintenance = form.status === 'Under Maintenance';
  const isWeapon = /Rifle|SMG|Pistol|Grenade|Launcher/i.test(form.type);
  const isVehicle = /Tank|Vehicle|Carrier|IFV|MRAP|Patrol|Utility/i.test(form.type);

  const isFormValid = () => {
    return (
      form.name &&
      form.category &&
      form.type &&
      form.serial &&
      form.manufacturer &&
      form.origin &&
      form.inductionDate &&
      form.status &&
      form.image &&
      form.location &&
      form.usedBy &&
      (!isUnderMaintenance || form.resumeDate) &&
      ((isWeapon && form.count) || (isVehicle && form.count) || (!isWeapon && !isVehicle))
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid()) return;
    addEquipment(form);
    setForm({
      name: '', category: '', type: '', serial: '', manufacturer: '', origin: '', inductionDate: '', status: '', image: '', location: ''
    });
    setSubmitted(false);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div>
      {toast && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          background: '#151e2b', 
          color: '#6fff57', 
          padding: '2rem 3rem', 
          borderRadius: 16, 
          fontWeight: 'bold', 
          fontSize: '2rem', 
          zIndex: 2000, 
          boxShadow: '0 4px 32px #000a',
          border: '3px solid #6fff57',
          textAlign: 'center'
        }}>
          Equipment details added!
        </div>
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
      <h1 style={{ color: '#2e7cff', fontWeight: 'bold', fontSize: '2rem', marginBottom: 24 }}>Add New Equipment</h1>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '3rem' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, flex: 1 }}>
          <label className="title">Type Group</label>
          <input
            value={form.category ? categoryToGroup(form.category) : 'Please select a model.'}
            readOnly
            style={{ width: '100%', marginBottom: 12, padding: 8, background: '#222b3a', color: '#fff', fontWeight: 'bold' }}
          />
          <label className="title">Model Name</label>
          <select name="name" value={form.name} onChange={handleModelChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }}>
            <option value="">-- Choose --</option>
            {modelOptions.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
          </select>
          <label className="title">Category</label>
          <input name="category" value={form.category} readOnly style={{ width: '100%', marginBottom: 12, padding: 8, background: '#222b3a', color: '#fff' }} />
          <label className="title">Type</label>
          <input name="type" value={form.type} readOnly style={{ width: '100%', marginBottom: 12, padding: 8, background: '#222b3a', color: '#fff' }} />
          <label className="title">Serial Number</label>
          <input name="serial" value={form.serial} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
          <label className="title">Manufacturer</label>
          <input name="manufacturer" value={form.manufacturer} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
          <label className="title">Origin</label>
          <input name="origin" value={form.origin} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
          <label className="title">Date of Induction</label>
          <input 
            type="date" 
            name="inductionDate" 
            value={form.inductionDate} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', marginBottom: 12, padding: 8 }} 
          />
          <label className="title">Current Status</label>
          <select name="status" value={form.status} onChange={handleChange} required style={{ width: '100%', marginBottom: 12, padding: 8 }}>
            <option value="">-- Choose --</option>
            <option value="Operational">Operational</option>
            <option value="In Service">In Service</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Retired">Retired</option>
          </select>
          <label className="title">Location</label>
          <select
            name="location"
            value={form.location ? form.location.city : ''}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
            disabled={locationOptions.length === 0}
          >
            <option value="">-- Choose --</option>
            {locationOptions.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <label className="title">USED BY</label>
          <select
            name="usedBy"
            value={form.usedBy || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 12, padding: 8 }}
          >
            <option value="">-- Choose --</option>
            {unitOptions.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          {isUnderMaintenance && (
            <>
              <label className="title">Resume Date</label>
              <input
                type="date"
                name="resumeDate"
                value={form.resumeDate || ''}
                onChange={handleChange}
                required
                style={{ width: '100%', marginBottom: 12, padding: 8 }}
              />
            </>
          )}
          {isWeapon && (
            <>
              <label className="title">No. of Equipments</label>
              <select
                name="count"
                value={form.count || ''}
                onChange={handleChange}
                required
                style={{ width: '100%', marginBottom: 12, padding: 8 }}
              >
                <option value="">-- Choose --</option>
                <option value="150">150</option>
                <option value="175">175</option>
                <option value="200">200</option>
              </select>
            </>
          )}
          {isVehicle && (
            <>
              <label className="title">No. of Vehicles</label>
              <select
                name="count"
                value={form.count || ''}
                onChange={handleChange}
                required
                style={{ width: '100%', marginBottom: 12, padding: 8 }}
              >
                <option value="">-- Choose --</option>
                <option value="25">25</option>
                <option value="35">35</option>
                <option value="50">50</option>
              </select>
            </>
          )}
          {submitted && !isFormValid() && (
            <div style={{ color: '#ff4c4c', marginBottom: 12 }}>Please fill all fields and select a model.</div>
          )}
          <button type="submit" disabled={!isFormValid()} style={{ background: isFormValid() ? '#6fff57' : '#888', color: '#151e2b', fontWeight: 'bold', padding: '0.7rem 1.5rem', border: 'none', borderRadius: 8, cursor: isFormValid() ? 'pointer' : 'not-allowed' }}>Save Equipment</button>
        </form>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16 }}>
          {form.image && (
            <>
              <img src={getPublicImage(form.image)} alt="Preview" style={{ width: 600, height: 400, objectFit: 'contain', borderRadius: 12, background: '#1a1a1a', marginBottom: 12 }} />
              <div style={{ color: '#6fff57', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center' }}>{form.name}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEquipment; 