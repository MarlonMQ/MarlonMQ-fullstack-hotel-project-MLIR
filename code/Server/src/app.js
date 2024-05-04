import express from 'express';
import cors from 'cors';
import UserRoutes from './user/routes/user.route.js';
import servceRoutes from './user/routes/serviceRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import RoomsRoutes from './user/routes/rooms.route.js';



const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = "C:\\Usuarios\\Marvin Lisandro\\Escritorio\\P.I\\fullstack-hotel-project-mlir\\code\\Server\\src"
console.log("Dir name",__dirname);
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
console.log("unido: ", path.join(__dirname, 'uploads'));
// rutas
app.use('/users', UserRoutes);
app.use('/services', servceRoutes);
app.use('/rooms', RoomsRoutes);


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