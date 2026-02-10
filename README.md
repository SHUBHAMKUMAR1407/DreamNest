# DreamNest - Premium Real Estate Platform

![DreamNest Banner](https://images.unsplash.com/photo-1600596542815-22b48533f418?q=80&w=2500&auto=format&fit=crop)

DreamNest is a modern, full-stack real estate application designed to connect buyers, sellers, and agents. It features a stunning, responsive frontend for users to browse listings and a powerful admin dashboard for managing properties and inquiries.

## 🚀 Live Demo

- **Main Website:** [https://dream-nest-rr14.vercel.app](https://dream-nest-rr14.vercel.app)
- **Admin Panel:** [https://dream-nest-fbf8.vercel.app](https://dream-nest-fbf8.vercel.app)
- **Backend API:** [https://dream-nest-jlxd7ki7k-shubhamkumar1407s-projects.vercel.app](https://dream-nest-jlxd7ki7k-shubhamkumar1407s-projects.vercel.app)

## ✨ Features

### User Features (Main Website)
- **Property Listings:** Browse a wide range of properties with advanced filtering options.
- **Property Details:** View detailed information, high-quality images, and location maps.
- **Inquiry System:** Contact agents directly through the platform.
- **User Authentication:** Secure signup and login functionality.
- **Add Property:** Users can list their own properties (pending admin approval).
- **Profile Management:** Update personal details and manage listed properties.
- **Responsive Design:** Optimized for seamless experience on desktop, tablet, and mobile.

### Admin Features (Admin Dashboard)
- **Dashboard Overview:** Real-time statistics on users, listings, and inquiries.
- **Property Management:** Approve, reject, or delete property listings.
- **User Management:** View registered users and their roles.
- **Inquiry Tracking:** Monitor and manage customer inquiries.
- **Secure Access:** Protected routes ensuring only authorized admins can access the panel.

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Deployment:** Vercel (Frontend & Admin), Render/Vercel (Backend)

## 📂 Project Structure

```
DreamNest/
├── real-estate-frontend/   # Main User Website
├── real-estate-admin/      # Admin Dashboard Management
└── real-estate-backend/    # Node.js API Server
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamkumar1407/DreamNest.git
   cd DreamNest
   ```

2. **Backend Setup**
   ```bash
   cd real-estate-backend
   npm install
   # Create a .env file and add:
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # CLOUDINARY_CLOUD_NAME=your_cloud_name
   # CLOUDINARY_API_KEY=your_api_key
   # CLOUDINARY_API_SECRET=your_api_secret
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../real-estate-frontend
   npm install
   # Create a .env file and add:
   # VITE_API_URL=http://localhost:5000 (or your live backend URL)
   npm run dev
   ```

4. **Admin Panel Setup**
   ```bash
   cd ../real-estate-admin
   npm install
   # Create a .env file and add:
   # VITE_API_URL=http://localhost:5000 (or your live backend URL)
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---
Developed with ❤️ by [Shubham Kumar](https://github.com/shubhamkumar1407)
