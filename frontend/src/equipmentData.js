// Helper arrays for locations
const operationalCities = ['Udhampur', 'Srinagar', 'Leh', 'Jammu', 'Nagrota', 'Kupwara', 'Baramulla', 'Rajouri', 'Poonch', 'Kargil', 'Samba'];
const maintenanceCities = ['Delhi', 'Jabalpur', 'Bangalore', 'Pune', 'Ludhiana'];

const operationalCityState = {
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
};
const maintenanceCityState = {
  'Delhi': 'Delhi',
  'Jabalpur': 'Madhya Pradesh',
  'Bangalore': 'Karnataka',
  'Pune': 'Maharashtra',
  'Ludhiana': 'Punjab',
};

function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function assignLocation(item) {
  let city, state;
  if (item.status === 'Operational' || item.status === 'In Service') {
    city = getRandom(operationalCities);
    state = operationalCityState[city];
    return { ...item, location: { city, state } };
  }
  if (item.status === 'Under Maintenance' || item.status === 'Being Phased Out') {
    city = getRandom(maintenanceCities);
    state = maintenanceCityState[city];
    return { ...item, location: { city, state } };
  }
  return item;
}

const rawEquipmentList = [
  { id: 1, name: 'Arjun MBT', category: 'Main Battle Tanks', status: 'Operational', image: '/ArjunMBT_Mk1.jpg', details: 'Indigenous Indian main battle tank.', serial: 'ARJUN-2025-001', location: { city: 'Jammu', state: 'Jammu & Kashmir' }, usedBy: 'Rajput Regiments' },
  { id: 2, name: 'T-90 Bhishma', category: 'Main Battle Tanks', status: 'Under Maintenance', image: '/T-90 Bhishma.jpg', details: 'Russian-origin, customized for Indian needs.', inductionDate: '2025-03-15', serial: 'T90B-IND-302', location: { city: 'Pune', state: 'Maharashtra' }, usedBy: 'Gorkha Regiment', resumeDate: '2025-01-24' },
  { id: 4, name: 'BMP-2 Sarath', category: 'APCs / IFVs', status: 'Operational', image: '/BMP-2 Sarath.jpg', details: 'Soviet-designed IFV produced in India.', serial: 'BMP2-IFV-789', location: { city: 'Srinagar', state: 'Jammu & Kashmir' }, usedBy: 'Assam Rifles' },
  { id: 5, name: 'NAMICA', category: 'APCs / IFVs', status: 'Operational', image: '/NAMICA.jpg', details: 'Nag Missile Carrier variant of BMP-2.', location: { city: 'Leh', state: 'Ladakh' }, usedBy: 'Rashtriya Rifles' },
  { id: 6, name: 'BRDM-2', category: 'Recon Vehicles', status: 'Retired', image: '/BRDM-2.jpg', details: 'Soviet-origin recon vehicle.', location: { city: 'Delhi', state: 'Delhi' }, usedBy: 'CRPF' },
  { id: 7, name: 'Carrier Command Post Tracked (CCPT)', category: 'Recon Vehicles', status: 'Operational', image: '/Carrier Command Post Tracked (CCPT).jpg', details: 'Used for command and control.', location: { city: 'Nagrota', state: 'Jammu & Kashmir' }, usedBy: 'NSG Commando' },
  { id: 8, name: 'Pinaka MBRL', category: 'Missile Platforms', status: 'Operational', image: '/Pinaka MBRL.png', details: 'Multi-barrel rocket launcher system.', location: { city: 'Baramulla', state: 'Jammu & Kashmir' }, usedBy: 'Rajput Regiments' },
  { id: 9, name: 'Akash SAM Launcher', category: 'Missile Platforms', status: 'Operational', image: '/Akash SAM Launcher.jpg', details: 'Surface-to-air missile system.', location: { city: 'Kupwara', state: 'Jammu & Kashmir' }, usedBy: 'BSF' },
  { id: 10, name: 'Bridge Layer Tank (BLT)', category: 'Engineering & Logistics', status: 'Operational', image: '/Bridge Layer Tank (BLT).jpg', details: 'Deploys bridges quickly.', location: { city: 'Rajouri', state: 'Jammu & Kashmir' }, usedBy: 'Gorkha Regiment' },
  { id: 11, name: 'Armored Recovery Vehicle (ARV)', category: 'Engineering & Logistics', status: 'Operational', image: '/Armored Recovery Vehicle (ARV).jpg', details: 'Used for towing damaged vehicles.', location: { city: 'Jammu', state: 'Jammu & Kashmir' }, usedBy: 'Rashtriya Rifles' },
  { id: 12, name: 'Mine Protected Vehicles (MPVs)', category: 'Engineering & Logistics', status: 'Operational', image: '/Mine Protected Vehicles (MPVs).jpg', details: 'Used in counter-insurgency operations.', location: { city: 'Poonch', state: 'Jammu & Kashmir' }, usedBy: 'Cobra' },
  { id: 13, name: 'Tata MPV', category: 'MRAP Vehicles', status: 'Operational', image: '/Tata Safari Storme GS800.jpg', details: 'Mine-resistant ambush protected vehicle.', location: { city: 'Samba', state: 'Jammu & Kashmir' }, usedBy: 'Cobra' },
  { id: 14, name: 'Kalyani M4', category: 'MRAP Vehicles', status: 'Operational', image: '/Kalyani M4.jpg', details: 'New generation MRAP vehicle.', location: { city: 'Kargil', state: 'Ladakh' }, usedBy: 'Special Forces (Para SF)' },
  { id: 15, name: 'Mahindra Marksman', category: 'Light Utility Vehicles', status: 'Operational', image: '/Mahindra Marksman.jpg', details: 'Bulletproof patrol vehicle.', location: { city: 'Udhampur', state: 'Jammu & Kashmir' }, usedBy: 'Marcos' },
  { id: 16, name: 'Tata Safari Storme GS800', category: 'Light Utility Vehicles', status: 'Operational', image: '/Tata Safari Storme GS800.jpg', details: 'Used as light utility vehicle.', location: { city: 'Samba', state: 'Jammu & Kashmir' }, usedBy: 'Marcos' },
  { id: 17, name: 'INSAS Rifle', category: 'Infantry Weapons', status: 'In Service', image: '/INSAS Rifle (Indian Small Arms System).jpg', details: 'Indian Small Arms System.', location: { city: 'Baramulla', state: 'Jammu & Kashmir' }, usedBy: 'Rashtriya Rifles' },
  { id: 18, name: 'AK-203', category: 'Infantry Weapons', status: 'In Service', image: '/AK-203 (Replacing INSAS, Indo-Russian).jpg', details: 'Replacing INSAS, Indo-Russian.', location: { city: 'Kupwara', state: 'Jammu & Kashmir' }, usedBy: 'Special Forces (Para SF)' },
  { id: 19, name: 'AK-47', category: 'Infantry Weapons', status: 'Under Maintenance', image: '/AK-47.jpg', details: 'Widely used assault rifle.', inductionDate: '2025-07-01', serial: 'AK47-IND-007', location: { city: 'Delhi', state: 'Delhi' }, usedBy: 'Cobra', resumeDate: '2025-01-24' },
  { id: 20, name: 'INSAS LMG', category: 'Infantry Weapons', status: 'Being Phased Out', image: '/INSAS LMG (being phased out).jpg', details: 'Light Machine Gun, being phased out.', location: { city: 'Jabalpur', state: 'Madhya Pradesh' }, usedBy: 'Gorkha Regiment' },
  { id: 21, name: 'Barrett M95 / M107', category: 'Infantry Weapons', status: 'Under Maintenance', image: '/Barrett M95  M107.jpg', details: 'Anti-materiel rifle.', inductionDate: '2025-11-20', serial: 'BM95-2025-021', location: { city: 'Bangalore', state: 'Karnataka' }, usedBy: 'NSG Commando', resumeDate: '2025-01-24' },
  { id: 23, name: 'M4 Carbine', category: 'Infantry Weapons', status: 'In Service', image: '/M4 Carbine (Special Forces).jpg', details: 'Used by Special Forces.', location: { city: 'Leh', state: 'Ladakh' }, usedBy: 'Marcos' },
  { id: 24, name: 'Zittara SMG', category: 'Infantry Weapons', status: 'In Service', image: '/Zittara SMG (India).jpg', details: 'Indian submachine gun.', location: { city: 'Rajouri', state: 'Jammu & Kashmir' }, usedBy: 'Marcos' },
  { id: 25, name: 'Brugger & Thomet APC9', category: 'Infantry Weapons', status: 'In Service', image: '/Brugger & Thomet APC9.jpg', details: 'Submachine gun.', location: { city: 'Poonch', state: 'Jammu & Kashmir' }, usedBy: 'BSF' },
  { id: 26, name: 'Glock 17', category: 'Infantry Weapons', status: 'In Service', image: '/Glock 17.jpg', details: 'Pistol.', location: { city: 'Nagrota', state: 'Jammu & Kashmir' }, usedBy: 'Marcos' },
  { id: 27, name: 'Pistol Auto 9mm 1A', category: 'Infantry Weapons', status: 'In Service', image: '/Pistol Auto 9mm 1A.jpg', details: 'Standard issue pistol.', location: { city: 'Samba', state: 'Jammu & Kashmir' }, usedBy: 'Marcos' },
  { id: 28, name: 'Multi-Mode Hand Grenade (MMHG)', category: 'Hand Grenades & Launchers', status: 'In Service', image: '/Multi-Mode Hand Grenade (MMHG).jpg', details: 'Indigenous hand grenade.', location: { city: 'Baramulla', state: 'Jammu & Kashmir' }, usedBy: 'Rashtriya Rifles' },
  { id: 29, name: 'UBGL', category: 'Hand Grenades & Launchers', status: 'In Service', image: '/UBGL (Under Barrel Grenade Launcher).jpg', details: 'Under Barrel Grenade Launcher.', location: { city: 'Kupwara', state: 'Jammu & Kashmir' }, usedBy: 'Special Forces (Para SF)' },
  { id: 26, name: 'Glock 17', category: 'Infantry Weapons', status: 'In Service', image: '/Glock 17.jpg', details: 'Pistol.', location: { city: 'Nagrota', state: 'Jammu & Kashmir' }, usedBy: 'ATS Commando' },
  { id: 27, name: 'Pistol Auto 9mm 1A', category: 'Infantry Weapons', status: 'In Service', image: '/Pistol Auto 9mm 1A.jpg', details: 'Standard issue pistol.', location: { city: 'Samba', state: 'Jammu & Kashmir' }, usedBy: 'ATS Commando' },
  { id: 15, name: 'Mahindra Marksman', category: 'Light Utility Vehicles', status: 'Operational', image: '/Mahindra Marksman.jpg', details: 'Bulletproof patrol vehicle.', location: { city: 'Udhampur', state: 'Jammu & Kashmir' }, usedBy: 'ATS Commando' },
  { id: 16, name: 'Tata Safari Storme GS800', category: 'Light Utility Vehicles', status: 'Operational', image: '/Tata Safari Storme GS800.jpg', details: 'Used as light utility vehicle.', location: { city: 'Samba', state: 'Jammu & Kashmir' }, usedBy: 'ATS Commando' },
  { id: 30, name: 'S-400', category: 'Missile Platforms', status: 'Operational', image: '/S-4002.jpg', details: 'Russian-made advanced air defense missile system.', serial: 'S400-IND-001', inductionDate: '2024-12-01', location: { city: 'Leh', state: 'Ladakh' }, usedBy: 'Special Forces (Para SF)' },
];

export const equipmentList = rawEquipmentList.map(eq => eq.status === 'Under Maintenance' && !eq.resumeDate ? { ...eq, resumeDate: '2025-02-15' } : eq); 