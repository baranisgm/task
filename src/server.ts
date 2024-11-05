import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Test route
app.get('/', (req, res) => res.send('Chat App API is working'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
