# DreamNest - Real Estate Application

DreamNest is a modern Real Estate platform designed to connect buyers, sellers, and agents. It features a robust backend API and a responsive React frontend.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality.
- **Property Listings**: Browse, add, and manage real estate properties.
- **Inquiries**: Contact agents directly through the platform.
- **Responsive Design**: Built with TailwindCSS for a seamless mobile and desktop experience.

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Image Handling**: Cloudinary & Multer (Dependency included)

### Frontend
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **Routing**: React Router DOM

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or AtlasURI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "REAL ESTATE"
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd real-estate-backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `real-estate-backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

**Run the Backend:**
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../real-estate-frontend
npm install
```

**Run the Frontend:**
```bash
npm run dev
```
The application will be available at `http://localhost:2173` (or the port shown in your terminal).

## 📂 Project Structure

```
REAL ESTATE/
├── real-estate-backend/   # Express API and Database logic
│   ├── config/            # Database configuration
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── server.js          # Entry point
│
└── real-estate-frontend/  # React Application
    ├── src/               # Source code
    │   ├── components/    # Reusable UI components
    │   └── pages/         # Application pages
    └── vite.config.js     # Vite configuration
```
