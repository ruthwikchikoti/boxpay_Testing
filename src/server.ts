import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import paymentRoutes from './routes/payment.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/payments', paymentRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Success route
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/success.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 