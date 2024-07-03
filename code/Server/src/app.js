import express from 'express';
import cors from 'cors';
import serviceRoutes from './facilities/routes/service.js';
import path from 'path';
import bodyParser from 'body-parser';
import LoginRoutes from './user/routes/login.js';
import SignUpRoutes from './user/routes/signUp.js';
import reservationRoutes from './reserves/routes/reservation.js';
import AccountsRoutes from './accounts/routes/accounts.js';
import MyAccountRoutes from './user/routes/myAccount.js';
import ForgotPasswordRoutes from './user/routes/forgotPassword.js';

import { fileURLToPath } from 'url';
import RoomsRoutes from './rooms/routes/rooms.js';



const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create express app
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
app.use('/myAccount', MyAccountRoutes);
app.use('/forgot-password', ForgotPasswordRoutes);

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