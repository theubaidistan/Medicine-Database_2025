# Medicine Database of Pakistan

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![ASP.NET](https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)
![Web API](https://img.shields.io/badge/Web_API_2-0078D4?style=for-the-badge&logo=.net&logoColor=white)

A comprehensive React-based web application for managing and searching medicines available in Pakistan.

## 📋 Overview

This project provides a user-friendly interface to browse, search, and manage information about medicines available in Pakistan. Built with React JS, it offers a robust and scalable solution for healthcare professionals, pharmacists, and patients to access medicine information.

## ✨ Features

- **Search Functionality**: Quickly find medicines by name, generic name, or manufacturer
- **Detailed Medicine Information**: View comprehensive details including:
  - Medicine name and generic name
  - Manufacturer information
  - Dosage and strength
  - Price information
  - Availability status
- **Category Filtering**: Browse medicines by therapeutic categories
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **User-friendly Interface**: Intuitive navigation and clean design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher) for frontend
- npm or yarn package manager
- Visual Studio 2015 or higher
- .NET Framework 4.5 or higher
- SQL Server 2012 or higher
- IIS (Internet Information Services) for deployment

### Installation

#### Backend Setup (ASP.NET Web API)

1. Clone the repository:

```bash
git clone https://github.com/yourusername/medicine-database-pakistan.git
```

2. Open the backend solution in Visual Studio:

```
cd medicine-database-pakistan/backend
Open MedicineDatabaseAPI.sln in Visual Studio
```

3. Update the connection string in `Web.config`:

```xml
<connectionStrings>
  <add name="MedicineDBContext"
       connectionString="Server=your_server;Database=MedicineDB;Trusted_Connection=True;"
       providerName="System.Data.SqlClient" />
</connectionStrings>
```

4. Run database migrations:

```
Update-Database
```

5. Build and run the API project (Press F5 in Visual Studio)

The API will be available at `http://localhost:PORT/api/`

#### Frontend Setup (React)

1. Navigate to the frontend directory:

```bash
cd medicine-database-pakistan/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Update the API URL in `src/config.js`:

```javascript
export const API_BASE_URL = "http://localhost:PORT/api";
```

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## 📦 Available Scripts

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 🛠️ Built With

### Frontend

- **React JS** - Frontend framework
- **Create React App** - Project setup and build configuration
- **React Router** - Navigation and routing
- **CSS3** - Styling and responsive design
- **Axios** - HTTP client for API calls

### Backend

- **ASP.NET Web API 2** - RESTful API backend
- **C#** - Backend programming language
- **Entity Framework** - ORM for database operations
- **SQL Server** - Database management system

## 📁 Project Structure

```
medicine-database-pakistan/
├── backend/
│   ├── MedicineDatabaseAPI/
│   │   ├── Controllers/
│   │   │   ├── MedicinesController.cs
│   │   │   ├── CategoriesController.cs
│   │   │   └── ManufacturersController.cs
│   │   ├── Models/
│   │   │   ├── Medicine.cs
│   │   │   ├── Category.cs
│   │   │   └── Manufacturer.cs
│   │   ├── Data/
│   │   │   └── MedicineDBContext.cs
│   │   ├── Web.config
│   │   └── Global.asax
│   └── MedicineDatabaseAPI.sln
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.js
│   │   │   ├── MedicineList.js
│   │   │   ├── MedicineDetails.js
│   │   │   └── FilterPanel.js
│   │   ├── services/
│   │   │   └── medicineService.js
│   │   ├── utils/
│   │   │   └── searchHelper.js
│   │   ├── config.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 💾 Data Source

The medicine database includes information sourced from:

- Drug Regulatory Authority of Pakistan (DRAP)
- Official pharmaceutical company listings
- Public healthcare databases

## 🔒 Disclaimer

**IMPORTANT**: This application is intended for informational purposes only. Always consult with a qualified healthcare professional before using any medication. The information provided should not replace professional medical advice, diagnosis, or treatment.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Drug Regulatory Authority of Pakistan (DRAP)
- Pakistan Pharmaceutical Manufacturers Association
- Healthcare professionals who provided feedback
- Open source community
- Create React App team

## 📞 Support

For support and queries:

- **Email**: support@medicinedb.pk
- **Issues**: Create an issue in the [GitHub repository](https://github.com/yourusername/medicine-database-pakistan/issues)
- **Documentation**: Check the [Wiki](https://github.com/yourusername/medicine-database-pakistan/wiki)

## 🗺️ Roadmap

### Version 2.0

- [ ] User authentication and profiles
- [ ] Medicine interaction checker
- [ ] Prescription upload and analysis
- [ ] Pharmacy locator with stock availability

### Version 3.0

- [ ] Mobile application (React Native)
- [ ] Multi-language support (Urdu, English)
- [ ] Integration with pharmacy inventory systems
- [ ] AI-powered medicine recommendations

### Future Enhancements

- [ ] Telemedicine consultation booking
- [ ] Medicine reminder notifications
- [ ] Price comparison across pharmacies
- [ ] Insurance coverage information

## 📊 Version History

- **1.0.0** (2025-10-24)
  - Initial release
  - Basic search and browse functionality
  - Medicine details display
  - Category filtering
  - Responsive design implementation

## 📚 Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Additional Resources

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Troubleshooting](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## 🔧 Troubleshooting

### Common Issues

**Build fails to minify**
See [this section](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) for solutions.

**Port 3000 already in use**

```bash
# Use a different port
PORT=3001 npm start
```

**Dependencies installation fails**

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🌟 Features in Detail

### Search Capabilities

- Real-time search as you type
- Search by medicine name, generic name, or manufacturer
- Advanced filters for price range, availability, and category
- Sort results by name, price, or relevance

### Medicine Information

Each medicine entry includes:

- Brand name and generic name
- Active ingredients and composition
- Manufacturer details
- Pack size and pricing
- Prescription requirements
- Storage instructions
- Side effects and precautions

---

Made with ❤️ for better healthcare access in Pakistan

**Star ⭐ this repository if you find it helpful!**
