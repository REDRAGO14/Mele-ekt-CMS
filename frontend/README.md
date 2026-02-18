# Mele-ekt CMS Frontend

A modern React frontend for the Mele-ekt CMS blogging platform, built with Vite, React, and Tailwind CSS.

## Features

- **Blog Feed**: Displays all blogs sorted by engagement, with author information and comments
- **Admin Dashboard**: Table view showing user statistics and blog counts
- **Substack-esque Design**: Clean, minimalist UI with serif fonts for titles and sans-serif for body text

## Tech Stack

- **Vite**: Fast build tool and dev server
- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Configuration

The frontend is configured to connect to the backend API at `http://localhost:3000/api`. Make sure your backend server is running on port 3000.

### Endpoints Used

- `GET /api/home` - Fetch all blogs (public)
- `GET /api/admin_dashboard` - Fetch admin dashboard data (requires authentication)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── BlogFeed.jsx       # Main blog feed component
│   │   ├── AdminDashboard.jsx # Admin dashboard table
│   │   └── Navigation.jsx     # Navigation bar
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

## Routes

- `/` - Blog Feed (default route)
- `/dashboard` - Admin Dashboard

## Authentication

The Admin Dashboard requires authentication. Make sure you have a valid JWT token stored in `localStorage` with the key `token` for the dashboard to work properly.
