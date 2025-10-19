import React from 'react';
import ArjunMBT from '../assets/ArjunMBT_Mk1.jpg';
import { getPublicImage } from '../utils/imageLoader';

const ImageTest = () => {
  const testImages = [
    { path: '/ArjunMBT_Mk1.jpg', name: 'Direct Path - Arjun MBT', method: 'direct' },
    { path: ArjunMBT, name: 'Imported Module - Arjun MBT', method: 'import' },
    { path: getPublicImage('/ArjunMBT_Mk1.jpg'), name: 'PUBLIC_URL - Arjun MBT', method: 'public_url' },
    { path: '/T-90 Bhishma.jpg', name: 'Direct Path - T-90', method: 'direct' },
    { path: '/BMP-2 Sarath.jpg', name: 'Direct Path - BMP-2', method: 'direct' },
    { path: '/india.png', name: 'Direct Path - India Flag', method: 'direct' },
    { path: '/army_logo.png', name: 'Direct Path - Army Logo', method: 'direct' }
  ];

  return (
    <div style={{ padding: '20px', background: '#1a2336', minHeight: '100vh', color: '#fff' }}>
      <h1>Image Loading Test</h1>
      <p>Testing different methods of loading images...</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {testImages.map((image, index) => (
            <div key={index} style={{ border: '2px solid #6fff57', borderRadius: '10px', padding: '10px' }}>
              <h3>{image.name}</h3>
              <p><strong>Method:</strong> {image.method}</p>
              <p><strong>Path:</strong> {typeof image.path === 'string' ? image.path : 'Imported module'}</p>
              <img 
                src={image.path} 
                alt={image.name}
                style={{ width: '100%', height: '200px', objectFit: 'contain', background: '#333' }}
                onLoad={() => console.log(`✅ Image loaded successfully: ${image.name} (${image.method})`)}
                onError={(e) => {
                  console.error(`❌ Failed to load image: ${image.name} (${image.method})`);
                  console.error('Path:', image.path);
                  console.error('Error details:', e);
                }}
              />
            </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#333', borderRadius: '5px' }}>
        <h3>Console Instructions:</h3>
        <p>1. Open Developer Tools (F12)</p>
        <p>2. Go to Console tab</p>
        <p>3. Look for ✅ success or ❌ error messages</p>
        <p>4. Check Network tab to see if image requests are being made</p>
      </div>
    </div>
  );
};

export default ImageTest; 