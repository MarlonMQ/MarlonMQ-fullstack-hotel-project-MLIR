import express from 'express';
import cors from 'cors';
import serviceRoutes from './facilities/routes/service.js';
import path from 'path';
import LoginRoutes from './user/routes/login.js';
import SignUpRoutes from './user/routes/signUp.js';
import reservationRoutes from './reserves/routes/reservation.js';
import AccountsRoutes from './accounts/routes/accounts.js';

import { fileURLToPath } from 'url';
import RoomsRoutes from './rooms/routes/rooms.js';



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
app.use('/services', serviceRoutes);
app.use('/rooms', RoomsRoutes);
app.use('/login', LoginRoutes);
app.use('/signup', SignUpRoutes);
app.use('/reservations', reservationRoutes);
app.use('/accounts', AccountsRoutes);

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