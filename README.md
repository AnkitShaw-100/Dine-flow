# DineFlow

A modern restaurant management system that streamlines menu management, order processing, and table operations through an intuitive admin dashboard and customer-friendly interface.

## Features

- **Authentication**: Secure user authentication with Clerk
- **Menu Management**: Create and manage restaurant menu items with categories and pricing
- **Order Management**: Process orders with real-time status tracking (New → In Kitchen → Served → Paid)
- **Table Management**: Organize and manage restaurant tables with unique table codes
- **Dashboard**: Comprehensive admin dashboard for monitoring operations
- **Payment Integration**: Stripe integration for secure payment processing
- **Security**: CORS, helmet security headers, rate limiting, and input validation with Zod

## Tech Stack

### Frontend
- **Framework**: React 19 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with Radix UI components
- **Routing**: React Router DOM
- **Authentication**: Clerk
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Validation**: Zod

### Backend
- **Runtime**: Node.js (≥20.9.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk for Express
- **Payment**: Stripe
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Zod

## Project Structure

```
DineFlow/
├── backend/                    # Node.js + Express API
│   ├── api/                   # Vercel serverless functions
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── models/           # MongoDB schemas (MenuItem, Order, Table, etc.)
│   │   ├── routes/           # API endpoints (v1)
│   │   ├── middlewares/      # Auth, error handling
│   │   ├── utils/            # Utility functions
│   │   ├── app.js            # Express app setup
│   │   └── server.js         # Server entry point
│   └── package.json
│
└── frontend/                   # React + Vite application
    ├── src/
    │   ├── components/
    │   │   ├── auth/         # Sign in/up pages
    │   │   ├── dashboard/    # Admin dashboard
    │   │   ├── landing/      # Landing page
    │   │   └── ui/           # Reusable components
    │   ├── hooks/            # Custom React hooks
    │   ├── lib/              # API client utilities
    │   ├── App.jsx           # Main app component
    │   └── main.jsx          # React entry point
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js ≥20.9.0
- npm or yarn
- MongoDB instance (local or cloud)
- Clerk account for authentication
- Stripe account for payment processing

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   CLERK_SECRET_KEY=your_clerk_secret_key
   CORS_ORIGINS=http://localhost:5173
   NODE_ENV=development
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the development server:
   ```bash
   npm run dev        # Watch mode
   npm run start      # With nodemon
   ```

The backend will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Production Deployment

Set `VITE_API_BASE_URL` in the deployed frontend to your live API origin. If it is omitted, the frontend will use a relative URL in production, which only works when the API is served from the same origin or proxied through the same host.

## Available Scripts

### Backend
- `npm run dev` - Start server in watch mode
- `npm run start` - Start with nodemon
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Endpoints

### Health Check
- `GET /health` - Health status

### V1 API
- `/v1/me` - User profile
- `/v1/categories` - Menu categories
- `/v1/menu-items` - Menu items management
- `/v1/orders` - Order management
- `/v1/tables` - Table management
- `/v1/dashboard` - Dashboard metrics

## Environment Configuration

Create `.env` files in both `backend` and `frontend` directories with necessary credentials for:
- MongoDB
- Clerk Authentication
- Stripe Payments
- CORS configuration

## Deployment

The project is configured for deployment on Vercel with serverless functions in the `api/` directory.

## Development Tools

- **Code Quality**: ESLint + Prettier for consistent code formatting
- **Input Validation**: Zod schema validation
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan HTTP request logger

## License

This project is private.

## Support

For issues or questions, please refer to the project documentation or contact the development team.
