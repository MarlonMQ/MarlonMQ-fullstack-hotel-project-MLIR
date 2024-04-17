import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { // preguntar al profe
  res.json({
    name: 'Mi API',
    version: '1.0.0',
    description: 'Esta es una descripción de mi API'
  });
  console.log('GET /');
});

export default router;