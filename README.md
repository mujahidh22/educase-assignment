# PopX - Mobile-First Full-Stack Application

PopX is a fully functional, mobile-first web application featuring a pixel-perfect, centered UI. It includes a robust authentication system using JWT (Access & Refresh tokens), form validation, and protected routing. The project is split into two distinct parts: a **React + Vite** frontend styled with **Tailwind CSS v3**, and a **Node.js + Express** backend powered by **MongoDB**.

**Live Demo:** [https://educase-popx-assign.netlify.app/](https://educase-popx-assign.netlify.app/)

## Features

### Frontend (React + Vite + Tailwind CSS)
- **Pixel-Perfect Mobile UI:** Renders as a strictly centered mobile viewport on desktop, with fluid responsiveness on mobile devices.
- **Routing & Protection:** Utilizes `react-router-dom` for navigation (Welcome, Login, Register, Account Settings) and protects private routes contextually.
- **Auth Context:** Global state management for user sessions relying on Axios interceptors for seamless token refreshing in the background.
- **Form Handling & Validation:** Implements `react-hook-form` to provide instantaneous feedback, coupled with custom regex validation for emails and phone numbers.
- **Environment Driven:** Uses Vite environment variables (`.env`) for simple local-to-production deployment toggling.

### Backend (Node.js + Express + MongoDB)
- **Secure Authentication:** Passwords hashed with `bcryptjs`. Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d) generated via `jsonwebtoken`.
- **Validation:** Strict server-side validation using `joi` ensuring data integrity before hitting the database.
- **Database:** Fully integrated with MongoDB using `mongoose` for flexible document modeling (Users, Refresh Tokens).
- **CORS Configured:** Dynamically configured to accept cross-origin requests securely.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or a cloud URI like MongoDB Atlas)
- npm or yarn

---

## Project Setup & Installation

The project contains two separate directories: `backend` and `educase` (frontend).

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Create the environment file:
   - Copy the `.env.example` file and rename it to `.env`.
   - Update the `MONGO_URI` with your actual MongoDB connection string.
   - Update the `JWT_SECRET` and `JWT_REFRESH_SECRET` with secure random strings.
   ```bash
   cp .env.example .env
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start, typically on `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a **new** terminal window and navigate to the frontend directory:
   ```bash
   cd educase
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Create the environment file:
   - Copy the `.env.example` file and rename it to `.env`.
   - By default, it is configured to point to your local backend (`http://localhost:5000/api/auth`).
   ```bash
   cp .env.example .env
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:3000`.*

---

## Production Deployment

### Backend
When hosting the backend (e.g., on Render, Heroku, or cyclic), make sure to input your environment variables securely in your hosting provider's dashboard:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`

### Frontend
When hosting the frontend (e.g., on Vercel, Netlify), update the `VITE_BASE_API_URL` environment variable in your deployment settings to point to your live, deployed backend URL (e.g., `https://my-deployed-backend.com/api/auth`).

Vite will automatically embed this URL during the build step (`npm run build`).
