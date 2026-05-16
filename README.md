# LedgerTurf - Turf Booking Platform for Dhaka

LedgerTurf is a professional, production-ready fullstack MERN application designed for discovering and booking football and cricket turfs in Dhaka, Bangladesh. Optimized for performance and seamless deployment on Vercel.

## 🚀 Key Features

- **Smart Discovery**: Search by area (Uttara, Banani, etc.), sport type, and price range.
- **Dedicated Night Booking**: A focused interface for late-night venues open until 6:00 AM.
- **Google Maps Integration**:
  - Precision location picking for owners during registration.
  - Interactive maps on turf details and admin approval queue.
  - One-click Google Maps navigation/directions for players.
- **Robust Booking Engine**: Slot-based management with dynamic time validation (Bangladesh Time UTC+6) and concurrency protection.
- **Advanced Dashboards**:
  - **Players**: Manage bookings, track history, and leave facility reviews.
  - **Turf Owners**: Route-based management hub for listings, reservations, and real-time revenue analytics.
  - **SuperAdmins**: Centralized control panel for user moderation and venue approvals with live previews.
- **Modern UI/UX**: Premium dark-themed design built with Framer Motion, featuring password visibility toggles and disabled browser autofill for secure authentication.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: Node.js, Express.js (Serverless-ready), JWT, Mongoose.
- **Database**: MongoDB Atlas (GeoJSON spatial indexing).
- **Deployment**: Vercel (Fullstack Monorepo configuration).

## 📦 Project Structure

```text
/api             # Vercel Serverless entry point
/backend         # Express API source code
  /src/config    # Database configuration
  /src/models    # Mongoose Schemas
  /src/routes    # API Endpoints
/frontend        # React Vite application
  /src/pages     # Feature-driven UI
  /src/components # Reusable UI atoms
vercel.json      # Unified deployment configuration
package.json     # Root workspace configuration
```

## ⚙️ Local Setup

1. **Clone the repo**
2. **Install Dependencies**:
   - `npm install` (Installs both frontend and backend using workspaces)
3. **Environment Variables**:
   - Create `.env` in the `backend` folder with:
     - `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=development`
   - Create `.env` in the `frontend` folder with:
     - `VITE_GOOGLE_MAPS_API_KEY`
4. **Seed Data**:
   - `cd backend`
   - `node seeder.js` (Populates 25 realistic Dhaka turfs)
5. **Run Locally**:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

## ☁️ Vercel Deployment

LedgerTurf is pre-configured for a **zero-config fullstack deployment** on Vercel.

1. Connect your repository to Vercel.
2. The `vercel.json` file automatically handles:
   - Routing all `/api/*` requests to the serverless backend.
   - Building and serving the React frontend as a Single Page Application (SPA).
3. Set your Production Environment Variables in the Vercel dashboard:
   - `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.
