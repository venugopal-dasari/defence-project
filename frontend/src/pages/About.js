import React from 'react';

const About = () => (
  <div style={{ maxWidth: 900, margin: '0 auto', background: '#1a2336', borderRadius: 18, padding: '2.5rem 2rem', boxShadow: '0 4px 32px #000a', color: '#fff' }}>
    <h1 style={{ color: '#6fff57', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: 18 }}>About: Defence Equipment Maintenance & Lifecycle Tracker</h1>
    <p style={{ fontSize: '1.15rem', marginBottom: 18 }}>
      <b>Defence Equipment Maintenance & Lifecycle Tracker</b> is a comprehensive web application designed to help defence organizations, units, and administrators efficiently manage, track, and analyze the maintenance, deployment, and lifecycle of weapons, vehicles, and other critical equipment.
    </p>
    <h2 style={{ color: '#ffb347', fontSize: '1.3rem', marginTop: 24 }}>Project Purpose</h2>
    <ul style={{ fontSize: '1.08rem', marginBottom: 18 }}>
      <li>Ensure every asset (weapon, vehicle, machine) is registered, tracked, and maintained on time.</li>
      <li>Reduce unexpected failures and improve operational readiness.</li>
      <li>Enable predictive maintenance and lifecycle planning.</li>
      <li>Provide real-time analytics and reporting for decision-makers.</li>
    </ul>
    <h2 style={{ color: '#6fff57', fontSize: '1.3rem', marginTop: 24 }}>How to Use</h2>
    <ul style={{ fontSize: '1.08rem', marginBottom: 18 }}>
      <li><b>Dashboard:</b> Get a quick overview of total equipment, maintenance status, alerts, and health analytics. Click cards for detailed breakdowns.</li>
      <li><b>Equipment:</b> Browse, search, and filter all registered equipment and vehicles. Click any card for full details.</li>
      <li><b>Add Equipment:</b> Register new assets with images, details, location, status, and more. The form adapts to the type of asset.</li>
      <li><b>Weapons & Vehicles:</b> Explore all weapons and vehicles in a modern, interactive gallery with images and real-world descriptions.</li>
      <li><b>Indian Army Units:</b> Select a unit to see its image, description, and all equipment/vehicles assigned to it.</li>
      <li><b>About:</b> Learn about the project, its features, and how to use each section.</li>
    </ul>
    <h2 style={{ color: '#ffb347', fontSize: '1.3rem', marginTop: 24 }}>Key Features</h2>
    <ul style={{ fontSize: '1.08rem', marginBottom: 18 }}>
      <li><b>Asset Registration:</b> Register every asset with unique ID, image, specs, and deployment history.</li>
      <li><b>Maintenance Scheduling:</b> Schedule and track maintenance tasks (time-based, usage-based, or condition-based).</li>
      <li><b>Lifecycle Tracking:</b> Log repairs, upgrades, part replacements, and view complete asset history.</li>
      <li><b>Image Management:</b> Upload, store, and display images for every asset.</li>
      <li><b>Alerts & Notifications:</b> Get reminders for upcoming maintenance or overdue tasks.</li>
      <li><b>Reports & Analytics:</b> Visualize readiness, usage stats, service frequency, and costs.</li>
      <li><b>User Roles & Permissions:</b> Admin, technician, and viewer roles with access control.</li>
      <li><b>Interactive UI:</b> Modern, responsive design with interactive galleries, modals, and analytics.</li>
      <li><b>Unit-Based Views:</b> See equipment by Indian Army unit, with images and descriptions.</li>
      <li><b>Real-Time Updates:</b> All changes are reflected instantly across the app.</li>
    </ul>
    <h2 style={{ color: '#6fff57', fontSize: '1.3rem', marginTop: 24 }}>Why This Project?</h2>
    <p style={{ fontSize: '1.08rem', marginBottom: 0 }}>
      This project is designed to showcase best practices in full-stack web development, modern UI/UX, and real-world problem solving for defence logistics and asset management. It is ideal for campus interviews, portfolio demonstrations, and as a foundation for more advanced, production-ready systems.
    </p>
  </div>
);

export default About; 