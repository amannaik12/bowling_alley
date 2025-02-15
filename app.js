import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userauthRoute from './src/routes/userauthRoute.js';
import adminauthRoute from './src/routes/adminauthRoute.js';
import userbookingRoute from './src/routes/userbookingRoute.js';
import adminbookingRoute from './src/routes/adminbookingRoute.js';

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/userauth', userauthRoute);
app.use('/adminauth', adminauthRoute);
app.use('/userbooking', userbookingRoute);
app.use('/adminbooking', adminbookingRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});