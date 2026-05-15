# LedgerTurf - Turf Booking Platform for Dhaka

LedgerTurf is a professional, production-style MERN stack application designed for discovering and booking football and cricket turfs in Dhaka, Bangladesh.

## 🚀 Key Features

- **Advanced Discovery**: Search by area (Uttara, Banani, etc.), sport type, and spatial proximity using GeoJSON.
- **Robust Booking Engine**: Slot-based management with MongoDB Transaction-safe concurrency protection to prevent double-bookings.
- **Role-Based Access (RBAC)**:
  - **Players**: Browse, book, and manage game history.
  - **Turf Owners**: List facilities, manage images (Cloudinary), and monitor revenue.
  - **SuperAdmins**: Global oversight with a turf approval/rejection workflow.
- **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for a premium, mobile-first experience.
- **Secure Auth**: JWT-based authentication with bcrypt password hashing.
- **Payment Simulation**: Interactive UI for bKash, Nagad, and Card payment flows.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express.js, JWT, Express-Validator.
- **Database**: MongoDB Atlas (GeoJSON spatial indexing), Mongoose.
- **Storage**: Cloudinary (Image uploads).

## 📦 Project Structure

```text
/backend
  /src
    /config      # DB & Cloudinary setup
    /controllers # Logic for Auth, Turfs, Bookings
    /middleware  # Auth, Validation, Error Handling
    /models      # Mongoose Schemas (User, Turf, Booking)
    /routes      # RESTful API endpoints
    /utils       # AsyncHandler, Constants, Token Utils
/frontend
  /src
    /components  # Atomic UI components
    /pages       # Feature-driven pages (Turf Details, Dashboards)
    /services    # Axios API abstractions
    /store       # Redux Toolkit Slices
```

## ⚙️ Local Setup

1. **Clone the repo**
2. **Backend Setup**:
   - `cd backend`
   - `npm install`
   - Create `.env` from `.env.example`
   - `npm run dev`
3. **Frontend Setup**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`
4. **Seed Data**:
   - `cd backend`
   - `node seeder.js`

## ☁️ Deployment Instructions

### Backend (Render / Railway)
1. Connect your GitHub repository.
2. Set Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
3. Build Command: `npm install`
4. Start Command: `npm start`

### Frontend (Vercel / Netlify)
1. Connect your GitHub repository.
2. Set Environment Variables: `VITE_API_URL` (pointing to your deployed backend).
3. Build Command: `npm run build`
4. Output Directory: `dist`

### Database (MongoDB Atlas)
1. Create a free M0 Cluster.
2. Allow IP Access (0.0.0.0/0 for production).
3. Copy connection string to `MONGODB_URI`.
