// // import cors from "cors";

// // app.use(cors({
// //   origin: "http://localhost:5173", // if you're running frontend with Vite or React dev
// //   credentials: true,
// // }));
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from "cors";
// import { connectDB } from './src/config/db.js';
// import doctorRoutes from './src/routes/doctorRoutes.js';
// import authRoutes from './src/routes/authRoutes.js';
// import appoinmentRoutes from './src/routes/appoinmentRoutes.js';




// // let tackel cors

// const corsOptions = {
//   origin:"http://localhost:5173",
//   method:"GET, POST,DELETE,PATCH,HEAD",
//   credentials:true,
// }
// app.use(cors(corsOptions));

// const app = express();
// dotenv.config();
// connectDB();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// const PORT = process.env.PORT || 3000;



// app.use("/api/doctors", doctorRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/appoinment",appoinmentRoutes);


// app.get('/', (req, res) => {
//   res.send('Welcome to MEDIBOT!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve frontend build files
// app.use(express.static(path.join(__dirname, '../frontend/dist'))); // or ../frontend/build for React

// // Catch-all route to serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { connectDB } from './src/config/db.js';
import doctorRoutes from './src/routes/doctorRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import appoinmentRoutes from './src/routes/appoinmentRoutes.js';

// Initialize app first
const app = express();

dotenv.config();
connectDB();

// Configure CORS after app is created
const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET, POST,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appoinment", appoinmentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to MEDIBOT!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build files
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // or ../frontend/build for React

// Catch-all route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});
