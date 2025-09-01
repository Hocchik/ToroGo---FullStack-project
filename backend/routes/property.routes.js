import express from 'express';
import { createProperty } from '../controllers/property.controller.js';

const router = express.Router();

router.post('/', createProperty);

// Otras rutas para obtener, actualizar, eliminar propiedades

export default router;