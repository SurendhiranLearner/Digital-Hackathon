import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import dataRoutes from './routes/dataRoutes';



app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/data', dataRoutes);

// Serve static files from the client/dist directory
// Adjust path as needed based on your deployment structure
const clientBuildPath = path.join(__dirname, '../../client/dist');
console.log('Serving static files from:', clientBuildPath);
app.use(express.static(clientBuildPath));

// Catch-all route to serve index.html for client-side routing
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
