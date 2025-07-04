const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los capítulos con sus secciones y subsecciones
router.get('/', async (req, res) => {
  try {
    const [capitulos] = await db.query('SELECT * FROM capitulos ORDER BY orden');
    for (const cap of capitulos) {
      const [secciones] = await db.query('SELECT * FROM secciones WHERE capitulo_id = ? ORDER BY orden', [cap.id]);
      for (const sec of secciones) {
        const [subsecciones] = await db.query('SELECT * FROM subsecciones WHERE seccion_id = ? ORDER BY orden', [sec.id]);
        sec.subsecciones = subsecciones;
      }
      cap.secciones = secciones;
    }
    res.json(capitulos);
  } catch (err) {
    console.error('Error al cargar capítulos:', err);
    res.status(500).json({ error: 'Error al obtener capítulos' });
  }
});

// Agregar nuevo capítulo
router.post('/', async (req, res) => {
  const { titulo, numero, orden } = req.body;
  try {
    await db.query('INSERT INTO capitulos (titulo, numero, orden) VALUES (?, ?, ?)', [titulo, numero, orden]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al agregar capítulo:', err);
    res.status(500).json({ error: 'Error al agregar capítulo' });
  }
});

module.exports = router;
