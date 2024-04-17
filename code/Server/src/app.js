import express from 'express';
import cors from 'cors';
import router from './routes/route.js';

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
app.use('/', router);
// app.use('/users', userRouter);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;