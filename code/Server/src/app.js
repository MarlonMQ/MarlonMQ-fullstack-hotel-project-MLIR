import express from 'express';
import cors from 'cors';
import servceRoutes from './user/routes/serviceRoutes.js';
import path from 'path';
import LoginRoutes from './user/routes/login.route.js';
import SignUpRoutes from './user/routes/signUp.route.js';

import { fileURLToPath } from 'url';



const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Create express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rutas
app.use('/services', servceRoutes);
app.use('/login', LoginRoutes);
app.use('/signup', SignUpRoutes);


// Start server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;