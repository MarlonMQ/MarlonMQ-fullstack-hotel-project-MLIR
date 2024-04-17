import app from './app.js';
// import { getConnection } from './database/connection.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
