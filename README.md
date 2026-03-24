# Job App — Arnifi Intern Assignment

A full-stack Job Application platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Role-based access** — Admin (`@arnifi.com` emails) and User (all others)
- **Admin**: Post, edit, delete jobs. View own job listings
- **User**: Browse all jobs, filter/search, apply, and track applications
- **JWT authentication** with auto role detection from email domain
- **Redux Toolkit** with `createAsyncThunk` for all API calls
- **Responsive design** with Zepto-inspired interaction system

## Tech Stack

**Backend:** Express, Mongoose, bcryptjs, jsonwebtoken, dotenv, cors  
**Frontend:** React, React Router, Redux Toolkit, Axios, React Hot Toast

## Setup Instructions

### Backend

```bash
cd server
npm install
cp .env.example .env  # Fill in MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd client
npm install
cp .env.example .env  # Fill in VITE_API_URL
npm run dev
```

## Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default: 5000) |

### Frontend (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (e.g., `http://localhost:5000`) |

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/signup` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/jobs` | Public |
| GET | `/api/jobs/my-jobs` | Admin |
| POST | `/api/jobs` | Admin |
| PUT | `/api/jobs/:id` | Admin |
| DELETE | `/api/jobs/:id` | Admin |
| POST | `/api/jobs/:id/apply` | User |
| GET | `/api/applications` | User |

## Deployed Links

- Frontend: <your-vercel-link>
- Backend: <your-render-link>
