import express from 'express';
import cors from 'cors';
import UserRoutes from './user/routes/user.route.js';
import servceRoutes from './user/routes/serviceRoutes.js';

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

// rutas
app.use('/users', UserRoutes);
app.use('/services', servceRoutes);


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