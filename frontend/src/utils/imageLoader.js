// Utility function to get public image URLs
export const getPublicImage = (imagePath) => {
  return `${process.env.PUBLIC_URL}${imagePath}`;
};

// List of all available images for validation
export const availableImages = [
  'ArjunMBT_Mk1.jpg',
  'T-90 Bhishma.jpg',
  'BMP-2 Sarath.jpg',
  'NAMICA.jpg',
  'BRDM-2.jpg',
  'Carrier Command Post Tracked (CCPT).jpg',
  'Pinaka MBRL.png',
  'Akash SAM Launcher.jpg',
  'Bridge Layer Tank (BLT).jpg',
  'Armored Recovery Vehicle (ARV).jpg',
  'Mine Protected Vehicles (MPVs).jpg',
  'Tata Safari Storme GS800.jpg',
  'Kalyani M4.jpg',
  'Mahindra Marksman.jpg',
  'INSAS Rifle (Indian Small Arms System).jpg',
  'AK-203 (Replacing INSAS, Indo-Russian).jpg',
  'AK-47.jpg',
  'INSAS LMG (being phased out).jpg',
  'Barrett M95  M107.jpg',
  'M4 Carbine (Special Forces).jpg',
  'Zittara SMG (India).jpg',
  'Brugger & Thomet APC9.jpg',
  'Glock 17.jpg',
  'Pistol Auto 9mm 1A.jpg',
  'Multi-Mode Hand Grenade (MMHG).jpg',
  'UBGL (Under Barrel Grenade Launcher).jpg',
  'S-4002.jpg',
  'T-72 Ajeya.jpg',
  'india.png',
  'army_logo.png'
];
