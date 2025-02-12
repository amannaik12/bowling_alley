import express from 'express';
import authRoute from './src/routes/authRoute.js'; // Import the authRoute
import cors from 'cors';
import dotenv from 'dotenv';
import bookSlotRoute from './src/routes/bookSlotRoute.js';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoute); // Use the authRoute

app.use('/book', bookSlotRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.listen(port, () => {    
    console.log(`Server running on port ${port}`);
});