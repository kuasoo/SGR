//backend/routes/usarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Crear usuario y asignar secciones
router.post('/crear', async (req, res) => {
  const { username, password, rol, secciones } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO usuarios (username, password, rol) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      rol
    ]);

    const userId = result.insertId;

    if (Array.isArray(secciones) && secciones.length > 0) {
      const values = secciones.map(id => [userId, id]);
      await db.query('INSERT INTO asignaciones (usuario_id, seccion_id) VALUES ?', [values]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error creando usuario:', err);
    res.status(500).json({ error: 'Error interno al crear usuario' });
  }
});

module.exports = router;
