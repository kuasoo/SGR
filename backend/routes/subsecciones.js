const express = require('express');
const router = express.Router();
const db = require('../db');

// Agregar nueva subsección
router.post('/', async (req, res) => {
  const { seccion_id, titulo, numero, orden, contenido } = req.body;
  try {
    await db.query('INSERT INTO subsecciones (seccion_id, titulo, numero, orden, contenido) VALUES (?, ?, ?, ?, ?)',
      [seccion_id, titulo, numero, orden, contenido || null]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al agregar subsección:', err);
    res.status(500).json({ error: 'Error al agregar subsección' });
  }
});

// Editar contenido
router.post('/:id', async (req, res) => {
  const { contenido } = req.body;
  const id = req.params.id;
  try {
    await db.query('UPDATE subsecciones SET contenido = ? WHERE id = ?', [contenido, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al actualizar contenido de subsección:', err);
    res.status(500).json({ error: 'Error al actualizar subsección' });
  }
});

module.exports = router;
