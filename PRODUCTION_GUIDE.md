# LedgerTurf Production-Style MERN SaaS Overview

LedgerTurf has been upgraded from a prototype to a full-scale, production-ready MERN application. Below is a detailed overview of the system architecture and features.

## 🔑 New Role-Based Authentication System

The system is now strictly divided into three roles with dedicated dashboards and permissions:

1.  **PLAYER**: Can browse turfs, book slots, and manage their personal booking history.
    - Dashboard: `/dashboard/player`
2.  **TURF_OWNER**: Can list multiple turfs, manage availability, and track revenue.
    - Dashboard: `/dashboard/owner`
3.  **SUPER_ADMIN**: Global oversight to approve/reject turfs and manage the platform.
    - Dashboard: `/dashboard/admin`

### Authentication Flow
- **Registration**: Separate flows for Players (`/register/player`) and Owners (`/register/owner`).
- **Middleware**: `protect` ensures a valid JWT, while `authorize` guards routes based on roles.
- **Payload**: JWT now includes `id` and `role` for efficient client-side redirects.

## ⚽ Turf Management & Approval Workflow

Owners can register their business with detailed fields (Opening/Closing times, GeoJSON coordinates, multiple images).
- **Status Workflow**: New turfs are saved as `pending`.
- **Visibility**: Only `approved` turfs appear in public search.
- **Admin Control**: SuperAdmins see a queue of pending requests and can Approve/Reject them with one click.

## 📅 Slot Booking & Concurrency

A robust, real-time booking engine prevents double-bookings:
- **Transaction-Safe**: Uses MongoDB Transactions to check availability and create bookings atomically.
- **Slot Selection**: Interactive time-slot grid disables already booked times.
- **Payment Simulation**: Bookings require "payment" via bKash, Nagad, or Card before confirmation.

## 🔍 Advanced Search & Map

- **GeoJSON**: Backend uses `$centerSphere` for spatial discovery.
- **Filtering**: Search by Area (Uttara, Mirpur, etc.), Sport (Football/Cricket), Price Range, and Facility (Indoor/Outdoor).
- **UX**: Debounced search and URL search parameter synchronization.

## 🗄️ MongoDB Schema Changes

### User Model
- Added `phone` number (Required).
- Enforced `role` enums (`user`, `turfOwner`, `superAdmin`).

### Turf Model
- Added `openingTime` and `closingTime`.
- Added `status` enum (`pending`, `approved`, `rejected`).
- Enhanced `location` with GeoJSON Point and Area fields.

## 🚀 Getting Started

### Running Seeders
To populate the app with 15 realistic Dhaka turfs:
```bash
cd backend
node seeder.js
```

### Admin Account
- **Email**: `admin@ledgerturf.com`
- **Password**: `password123`

### Testing Workflow
1.  **Register as Owner**: Go to `/register/owner`, fill details, and upload images.
2.  **Login as Admin**: Go to `/dashboard/admin`, find the new turf, and click **Approve**.
3.  **Register as Player**: Go to `/register/player`.
4.  **Book Turf**: Find the approved turf, select a date/slot, and complete the simulated payment.
5.  **View Dashboard**: Check `/dashboard/player` for your ticket and `/dashboard/owner` for updated revenue.
