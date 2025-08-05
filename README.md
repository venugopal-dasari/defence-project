# Indian Defence Equipment Management System

A comprehensive React-based web application for managing and tracking military equipment inventory for the Indian Armed Forces.

## 🎯 Project Overview

This system provides a centralized platform for tracking, monitoring, and managing military equipment across various units of the Indian Armed Forces. It includes detailed information about weapons, vehicles, missile systems, and other defense equipment.

## 🚀 Features

### Equipment Management
- **Main Battle Tanks**: Arjun MBT, T-90 Bhishma
- **APCs/IFVs**: BMP-2 Sarath, NAMICA
- **Missile Platforms**: Pinaka MBRL, Akash SAM, S-400
- **Infantry Weapons**: INSAS, AK-203, M4 Carbine, Glock 17
- **Vehicles**: Tata MPV, Mahindra Marksman, Kalyani M4
- **Engineering Equipment**: Bridge Layer Tanks, Armored Recovery Vehicles

### Military Units Covered
- Special Forces (Para SF)
- Rashtriya Rifles
- Border Security Forces (BSF)
- Assam Rifles
- Gorkha Regiment
- Rajput Regiments
- NSG Commando
- CRPF
- Marcos
- Cobra

### Status Tracking
- **Operational**: Equipment currently in service
- **Under Maintenance**: Equipment undergoing maintenance
- **Being Phased Out**: Equipment being replaced
- **Retired**: Decommissioned equipment

### Geographic Distribution
- **Operational Locations**: Jammu & Kashmir, Ladakh
- **Maintenance Facilities**: Delhi, Jabalpur, Bangalore, Pune, Ludhiana

## 🛠️ Technology Stack

- **Frontend**: React.js
- **Routing**: React Router
- **State Management**: Context API
- **Styling**: CSS3 with military-themed design
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/defence-project.git
   cd defence-project
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets and images
│   ├── images/            # Equipment images
│   └── index.html         # Main HTML file
├── src/
│   ├── pages/             # React components for different pages
│   │   ├── Dashboard.js   # Main dashboard
│   │   ├── Equipment.js   # Equipment listing
│   │   ├── Weapons.js     # Weapons specific page
│   │   ├── Vehicles.js    # Vehicles specific page
│   │   ├── ArmyUnits.js   # Military units information
│   │   ├── AddEquipment.js # Add new equipment
│   │   ├── Reports.js     # Reports and analytics
│   │   └── About.js       # About page
│   ├── EquipmentContext.js # Context for state management
│   ├── equipmentData.js   # Equipment database
│   ├── App.js            # Main application component
│   └── index.js          # Application entry point
└── package.json          # Dependencies and scripts
```

## 🎨 Key Features

### Dashboard
- Real-time equipment statistics
- Health monitoring with pie charts
- Recent activity tracking
- Quick access to different sections

### Equipment Management
- Comprehensive equipment database
- Status tracking and updates
- Location-based filtering
- Unit-wise equipment allocation

### Reports & Analytics
- Equipment health reports
- Maintenance schedules
- Operational status overview
- Export functionality (CSV)

### User Interface
- Military-themed design
- Responsive layout
- Interactive navigation
- Professional styling with Indian Army branding

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy to GitHub Pages using the repository settings

### Netlify/Vercel
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian Armed Forces for inspiration
- React.js community for excellent documentation
- All contributors and supporters

## 📞 Contact

For any queries or suggestions, please open an issue on GitHub.

---

**कर्तव्यं शौर्यं धर्मः** - Duty, Valor, Righteousness 