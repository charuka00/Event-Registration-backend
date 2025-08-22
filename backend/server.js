// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { expressjwt } from 'express-jwt';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config(); // ✅ must be at the top

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Check JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined in .env');
  process.exit(1);
}

// JWT middleware applied globally
const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
}).unless({
  path: [
    '/api/users/register',
    '/api/users/login'
  ], // public routes
});

app.use(auth);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

// Error handler for unauthorized requests
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
