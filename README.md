# Hospital Management System (No Authentication Required)

A simplified Hospital Management System with no login/authentication requirements, focusing on core hospital management features.

## Features

- **Patient Management**: Register and manage patient information
- **Doctor Management**: View doctor profiles, specializations, and availability
- **Appointment Scheduling**: Book, view, and manage appointments
- **Medical Records**: Store and access patient medical history
- **Billing System**: Generate and manage invoices
- **Inventory Management**: Track medicines and supplies

## Tech Stack

### Frontend
- React.js
- Material-UI for UI components
- React Router for navigation
- Axios for API requests

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- No authentication required

### Database
- MongoDB (configured for open access - no login required)

## Project Structure

```
hospital-management/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── utils/          # Utility functions
│       ├── context/        # Context providers
│       ├── hooks/          # Custom hooks
│       └── assets/         # Images, icons, etc.
└── server/                 # Backend Express application
    ├── controllers/        # Request controllers
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    ├── services/           # Business logic
    ├── utils/              # Utility functions
    └── config/             # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd hospital-management
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Create a `.env` file in the server directory with the following content:
     ```
     NODE_ENV=development
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/hospital-management-open
     ```

5. Start the development servers
   - For server:
     ```
     cd server
     npm run dev
     ```
   - For client:
     ```
     cd client
     npm start
     ```

6. Access the application at `http://localhost:3000`

## Deployment

This application can be easily deployed on:
- Frontend: Netlify, Vercel, or GitHub Pages
- Backend: Railway, Render, or Heroku
- Database: MongoDB Atlas (configured for public access)

## License

This project is licensed under the MIT License 