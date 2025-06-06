const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener subsecciones
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subsecciones ORDER BY orden');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener subsecciones:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Crear subsección
router.post('/', async (req, res) => {
  const { seccion_id, titulo, numero, orden, contenido } = req.body;
  try {
    await db.query('INSERT INTO subsecciones (seccion_id, titulo, numero, contenido, orden) VALUES (?, ?, ?, ?, ?)',
      [seccion_id, titulo, numero, contenido || '', orden]);
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
    res.status(500).json({ error: 'Error al actualizar contenido' });
  }
});

// Actualizar título
router.put('/:id/titulo', async (req, res) => {
  const { titulo } = req.body;
  const id = req.params.id;
  try {
    await db.query('UPDATE subsecciones SET titulo = ? WHERE id = ?', [titulo, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al actualizar título de subsección:', err);
    res.status(500).json({ error: 'Error al actualizar título' });
  }
});

module.exports = router;
