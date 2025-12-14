# BookCycle - Complete Setup Guide

## Project Overview

BookCycle is a full-stack web application for book exchange between users. Built with:

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + Tailwind CSS

## Backend Structure (Server)

```
server/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   └── exchange.controller.js # Exchange logic
│   ├── features/
│   │   ├── books/
│   │   │   ├── book.controller.js
│   │   │   └── book.routes.js
│   │   ├── exchange/
│   │   │   ├── exchange.controller.js
│   │   │   ├── exchange.routes.js
│   │   │   └── exchange.service.js
│   │   └── profile/
│   ├── middlewares/
│   │   └── auth.js               # JWT authentication
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Exchange.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── utils/
│   │   └── upload.js             # Multer file upload
│   ├── app.js                    # Express app setup
│   └── server.js                 # Entry point
├── .env                          # Environment variables
└── package.json
```

## Frontend Structure (Client)

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   ├── BookCard.jsx          # Book display card
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── contexts/
│   │   └── AuthContext.jsx       # Authentication context
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Books.jsx             # Browse books
│   │   ├── MyBooks.jsx           # User's books
│   │   ├── AddBook.jsx           # Add new book
│   │   ├── Exchanges.jsx         # Exchange management
│   │   └── Profile.jsx           # User profile
│   ├── services/
│   │   ├── api.js                # Axios instance
│   │   ├── authService.js        # Auth API calls
│   │   ├── bookService.js        # Book API calls
│   │   └── exchangeService.js   # Exchange API calls
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
├── .env                          # Environment variables
├── tailwind.config.js            # Tailwind configuration
└── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to server folder:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Configure `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookcycle
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

4. Start server:

```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to client folder:

```bash
cd client
```

2. Install dependencies (already done):

```bash
npm install
```

3. Configure `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:

```bash
npm run dev
```

Frontend will run on http://localhost:5173

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books

- `GET /api/books` - Get all books / user's books
- `POST /api/books` - Add new book (with image upload)
- `DELETE /api/books/:id` - Delete book

### Exchanges

- `POST /api/exchanges` - Create exchange request
- `GET /api/exchanges/incoming` - Get incoming exchanges
- `GET /api/exchanges/outgoing` - Get outgoing exchanges
- `PATCH /api/exchanges/:id/accept` - Accept exchange
- `PATCH /api/exchanges/:id/reject` - Reject exchange
- `PATCH /api/exchanges/:id/cancel` - Cancel exchange

### Profile

- `GET /api/profile` - Get user profile

## Key Features Implemented

### Backend

✅ User authentication with JWT
✅ Book CRUD operations
✅ Image upload with Multer
✅ Exchange request system
✅ MongoDB models and relationships
✅ Middleware for authentication
✅ Error handling
✅ CORS configuration

### Frontend

✅ React Router v6 routing
✅ Authentication context
✅ Protected routes
✅ Login/Register pages
✅ Book browsing with search & filter
✅ Book management (add/delete)
✅ Exchange management (incoming/outgoing)
✅ User profile page
✅ Responsive design with Tailwind
✅ Modern UI components
✅ API integration with Axios

## Important Notes

### Backend

- `req.userId` is used by auth middleware (not `req.user.id`)
- MongoDB transactions removed for development (doesn't support standalone mode)
- JWT token stored in localStorage on frontend

### Frontend

- Token auto-refresh not yet implemented
- File upload using FormData
- Image preview available when adding book
- Real-time updates via API polling (can be improved with WebSocket)

## Next Steps / Improvements

1. **Backend**:

   - Implement pagination untuk books
   - Add book search/filter di backend
   - Setup MongoDB replica set untuk transactions
   - Add email notifications
   - Implement refresh token
   - Add rate limiting

2. **Frontend**:

   - Add loading states
   - Implement toast notifications
   - Add image compression before upload
   - Implement real-time updates with WebSocket
   - Add dark mode toggle
   - Improve error handling UI
   - Add book detail modal
   - Add user reviews/ratings

3. **DevOps**:
   - Setup CI/CD pipeline
   - Docker containerization
   - Deploy to cloud (Vercel/Netlify + Railway/Render)
   - Add monitoring and logging

## Troubleshooting

### Common Issues

1. **CORS Error**: Make sure backend CORS is configured correctly
2. **401 Unauthorized**: Token might be expired, login again
3. **MongoDB Connection**: Make sure MongoDB is running on localhost:27017
4. **File Upload**: Make sure `uploads/` folder exists in backend
5. **Port Already in Use**: Change port in .env file

## Running Both Servers

Open 2 terminals:

Terminal 1 (Backend):

```bash
cd server
npm run dev
```

Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

Access the application at: http://localhost:5173

## Production Build

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run build
npm run preview
```

---