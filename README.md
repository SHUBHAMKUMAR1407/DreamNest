# 🏡 DreamNest - Premium Real Estate Platform

![DreamNest Banner](https://images.unsplash.com/photo-1600596542815-22b48533f418?q=80&w=2500&auto=format&fit=crop)

<div align="center">

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 🚀 Overview

**DreamNest** is a cutting-edge real estate platform designed to seamlessly connect buyers, sellers, and agents. Built with a modern tech stack, it offers a premium user experience for browsing properties and a powerful admin dashboard for managing the platform's ecosystem.

### 🌟 Key Features

#### 🏠 For Users
*   **Property Discovery**: Advanced search and filtering to find the perfect home.
*   **Interactive Details**: High-quality image galleries, location maps, and comprehensive property info.
*   **Direct Inquiry**: Seamless communication with agents via integrated inquiry forms.
*   **User Dashboard**: Manage profiles, list properties (with approval workflow), and track favorite listings.
*   **Responsive Design**: A fluid experience across mobile, tablet, and desktop devices.

#### 🛡️ For Admins
*   **Centralized Dashboard**: Real-time analytics on users, listings, and platform activity.
*   **Content Moderation**: Approve, reject, or edit property listings to ensure quality.
*   **User Management**: Monitor interactions and manage user roles/permissions.
*   **Inquiry Tracking**: oversee all communications to ensure timely responses.

---

## 🔗 Live Demo

| Application | URL |
| :--- | :--- |
| **User Website** | [https://dream-nest-rr14.vercel.app](https://dream-nest-rr14.vercel.app) |
| **Admin Panel** | [https://dream-nest-fbf8.vercel.app](https://dream-nest-fbf8.vercel.app) |

---

## 📂 Project Structure

The project is organized as a monorepo containing the frontend, backend, and admin panel.

```bash
DreamNest/
├── real-estate-frontend/   # 🎨 React Client Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application routes/pages
│   │   └── assets/         # Static assets (images, icons)
│   └── ...
├── real-estate-admin/      # 🔐 Admin Dashboard Application
│   ├── src/
│   │   ├── components/     # Admin-specific components
│   │   └── pages/          # Admin routes (Dashboard, Users, Properties)
│   └── ...
└── real-estate-backend/    # ⚙️ Node.js/Express API
    ├── config/             # Database connection config
    ├── models/             # Mongoose schemas (User, Property, Inquiry)
    ├── routes/             # API endpoints
    ├── controllers/        # Request logic handlers
    ├── middleware/         # Auth & validation middleware
    └── server.js           # Entry point
```

---

## 🛠️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14 or higher)
*   MongoDB Atlas Account
*   Cloudinary Account

### 1. Clone the Repository
```bash
git clone https://github.com/shubhamkumar1407/DreamNest.git
cd DreamNest
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd real-estate-backend
npm install
```

Create a `.env` file in `real-estate-backend` with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.
```bash
cd ../real-estate-frontend
npm install
```

Create a `.env` file in `real-estate-frontend`:
```env
VITE_API_URL=http://localhost:5000  # Or your deployed backend URL
```

Start the development server:
```bash
npm run dev
```

### 4. Admin Panel Setup
Open a new terminal, navigate to the admin directory, and install dependencies.
```bash
cd ../real-estate-admin
npm install
```

Create a `.env` file in `real-estate-admin`:
```env
VITE_API_URL=http://localhost:5000  # Or your deployed backend URL
```

Start the admin server:
```bash
npm run dev
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Developed with ❤️ by <a href="https://github.com/shubhamkumar1407">Shubham Kumar</a>
</div>
