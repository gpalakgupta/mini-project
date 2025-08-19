import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import doctorRoutes from './src/routes/doctorRoutes.js';
import authRoutes from './src/routes/authRoutes.js';


const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;



app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to MEDIBOT!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
