import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './src/routes/authRoute.js';
import bookingRoute from './src/routes/bookingRoute.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoute);
app.use('/booking', bookingRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});