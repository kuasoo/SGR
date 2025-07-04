const express = require('express');
const router = express.Router();
const db = require('../db');

// Agregar nueva sección
router.post('/', async (req, res) => {
  const { capitulo_id, titulo, numero, orden, contenido } = req.body;
  try {
    await db.query('INSERT INTO secciones (capitulo_id, titulo, numero, orden, contenido) VALUES (?, ?, ?, ?, ?)',
      [capitulo_id, titulo, numero, orden, contenido || null]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al agregar sección:', err);
    res.status(500).json({ error: 'Error al agregar sección' });
  }
});

// Editar contenido
router.post('/:id', async (req, res) => {
  const { contenido } = req.body;
  const id = req.params.id;
  try {
    await db.query('UPDATE secciones SET contenido = ? WHERE id = ?', [contenido, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al actualizar contenido de sección:', err);
    res.status(500).json({ error: 'Error al actualizar sección' });
  }
});

module.exports = router;
