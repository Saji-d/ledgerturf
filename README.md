<div align="center">
  <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=200" alt="LedgerTurf Logo" width="120" />
  <h1>🏟️ LedgerTurf</h1>
  <p><strong>Dhaka's Premier MERN-Stack Turf Booking Ecosystem</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>

  <h4>
    <a href="#-key-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Installation</a> •
    <a href="#-api-overview">API</a> •
    <a href="#-screenshots">Showcase</a>
  </h4>
</div>

---

## 📖 Overview

LedgerTurf is a high-performance, production-ready MERN (MongoDB, Express, React, Node) application tailored for the sports community in Dhaka, Bangladesh. It bridges the gap between turf owners and athletes by providing a seamless, real-time booking experience, advanced management dashboards, and intelligent discovery tools.

Built with a focus on **concurrency safety**, **spatial search**, and **modern UI/UX**, LedgerTurf transforms how sports venues are discovered and reserved.

---

## 🚀 Key Features

### ⚽ For Players
- **Smart Discovery**: Advanced filtering by area (Uttara, Banani, Gulshan, etc.), sport type, and price range.
- **Real-Time Booking**: Slot-based management with dynamic time validation (Bangladesh Time UTC+6).
- **Night Owl Mode**: Specialized interface for venues open until 6:00 AM with elite floodlighting.
- **Interactive Maps**: Integrated Google Maps for precision location finding and one-click navigation.
- **Reviews & Ratings**: Share feedback and verify facility quality through a community-driven review system.

### 💼 For Turf Owners
- **Business Hub**: Comprehensive dashboard to manage multiple listings and track reservations.
- **Revenue Analytics**: Real-time insights into confirmed revenue and performance metrics.
- **Listing Management**: Dynamic listing creation with image uploads and map pinning.
- **Automated Scheduling**: Streamlined booking management with status tracking.

### 🛡️ For Administrators
- **Control Panel**: Centralized hub for platform-wide user moderation (Players & Owners).
- **Venue Approval System**: Robust review queue for new turf listings with live previews and spatial verification.
- **Platform Analytics**: Global stats on users, revenue, and active venues.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Usage |
| :--- | :--- |
| **React (Vite)** | High-performance UI library and build tool |
| **Redux Toolkit** | Centralized state management for Auth & Data |
| **Tailwind CSS** | Utility-first styling for a premium modern look |
| **Framer Motion** | Fluid animations and interactive transitions |
| **Lucide React** | Consistent, beautiful iconography |
| **Axios** | Optimized API communication |

### Backend & Database
| Technology | Usage |
| :--- | :--- |
| **Node.js** | Scalable server-side execution environment |
| **Express.js** | Serverless-ready RESTful API framework |
| **MongoDB Atlas** | NoSQL database with GeoJSON spatial indexing |
| **Mongoose** | Elegant object modeling for MongoDB |
| **JWT** | Secure, stateless authentication and authorization |

---

## 🏗️ Architecture Overview

LedgerTurf follows a decoupled, monorepo-style architecture optimized for serverless deployment.

- **Frontend**: A Single Page Application (SPA) that communicates with the API via a centralized service layer.
- **Backend**: A modular REST API organized into Controllers, Models, Middleware, and Routes.
- **Security Layer**: Role-based Access Control (RBAC) ensuring only authorized users (Players, Owners, Admins) can access specific resources.
- **Spatial Layer**: Utilizing MongoDB's `$geoWithin` and `$centerSphere` for location-based discovery.

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="assets/homepage.png" alt="Homepage" /><br />
        <sub><b>Home: Discover Venues</b></sub>
      </td>
      <td width="50%">
        <img src="assets/listing.png" alt="Turf Listing" /><br />
        <sub><b>Listings: Advanced Filters</b></sub>
      </td>
    </tr>
    <tr>
      <td width="50%">
        <img src="assets/dashboard.png" alt="Owner Dashboard" /><br />
        <sub><b>Business Hub: Analytics</b></sub>
      </td>
      <td width="50%">
        <img src="assets/admin.png" alt="Admin Panel" /><br />
        <sub><b>Control Panel: Approvals</b></sub>
      </td>
    </tr>
  </table>
</div>

---

## ⚙️ Getting Started

### 📋 Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google Maps API Key

### 🔧 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Saji-d/ledgerturf.git
   cd ledgerturf
   ```

2. **Install Dependencies**
   ```bash
   # Root directory (installs both frontend & backend)
   npm install
   ```

3. **Configure Environment Variables**

   **Backend (`/backend/.env`)**
   ```env
   PORT=5002
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

   **Frontend (`/frontend/.env`)**
   ```env
   VITE_API_URL=http://localhost:5002/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Seed Database (Optional)**
   ```bash
   cd backend
   node seeder.js
   ```

5. **Run Locally**
   ```bash
   # Root directory
   npm run start-backend    # Starts backend on :5002
   npm run dev --prefix frontend # Starts frontend on :3010
   ```

---

## 📁 Folder Structure

```text
X:\Ledger Turf\
├── api\                # Vercel Serverless entry point
├── backend\            # Express API
│   └── src\
│       ├── config\     # Database connection
│       ├── controllers\# Business logic
│       ├── middleware\ # Auth & Error handling
│       ├── models\     # Mongoose schemas
│       ├── routes\     # API endpoints
│       └── utils\      # Helpers & Constants
├── frontend\           # React Vite Application
│   └── src\
│       ├── components\ # Reusable UI atoms
│       ├── pages\      # View components
│       ├── services\   # API communication layer
│       └── store\      # Redux Toolkit slices
├── vercel.json         # Deployment configuration
└── package.json        # Root workspace config
```

---

## ☁️ Deployment

LedgerTurf is optimized for **Vercel** deployment with a unified routing configuration.

- **Frontend Build**: Vite generates static assets in `frontend/dist`.
- **Backend Build**: Express app is exported for Vercel Serverless Functions.
- **Routing**: `vercel.json` ensures that `/api/*` routes are handled by the backend while all other routes serve the SPA.

---

## 🧩 Challenges & Solutions

- **Timezone Synchronization**: Solved by forcing `UTC+6` calculations on the backend for consistent slot availability regardless of server location.
- **Concurrency in Bookings**: Implemented atomic MongoDB updates and availability checks before confirming payments.
- **SPA Routing on Vercel**: Configured custom rewrites to prevent 404s on page refresh.

---

## 🔮 Future Improvements

- [ ] **Push Notifications**: Real-time alerts for booking confirmations.
- [ ] **Payment Gateway**: Full SSLCommerz or Stripe integration for automated payments.
- [ ] **Team Management**: Allow users to create teams and invite friends to matches.
- [ ] **Chat System**: Direct communication between players and turf owners.

---

## 👥 Contributors

- **Sajidur Rahman Sajid** - *Lead Developer* - [GitHub](https://github.com/Saji-d)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Built with ❤️ for Dhaka's Sports Community</p>
</div>
