// backend/routes/contenido.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener capítulos con sus secciones y subsecciones
router.get('/', async (req, res) => {
  try {
    const [capitulos] = await db.query('SELECT * FROM capitulos ORDER BY orden');
    const [secciones] = await db.query('SELECT * FROM secciones ORDER BY orden');
    const [subsecciones] = await db.query('SELECT * FROM subsecciones ORDER BY orden');

    const estructura = capitulos.map(cap => ({
      ...cap,
      tipo: 'capitulo',
      children: secciones
        .filter(sec => sec.capitulo_id === cap.id)
        .map(sec => ({
          ...sec,
          tipo: 'seccion',
          children: subsecciones
            .filter(sub => sub.seccion_id === sec.id)
            .map(sub => ({ ...sub, tipo: 'subseccion' }))
        }))
    }));

    res.json(estructura);
  } catch (error) {
    console.error('Error al cargar contenido estructurado:', error);
    res.status(500).json({ error: 'Error al cargar estructura' });
  }
});

module.exports = router;
