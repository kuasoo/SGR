// backend/routes/imagenes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// No necesitamos 'db' para esta ruta simplificada

// Configuración de Multer para guardar el archivo en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Asegúrate de que la carpeta 'uploads' exista en la raíz de tu proyecto backend
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Crear un nombre de archivo único para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// La ruta POST que recibirá la imagen desde TinyMCE
router.post('/', upload.single('file'), (req, res) => {
  // 'file' es el nombre del campo que TinyMCE envía por defecto

  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo.' });
  }

  // Construimos la URL pública del archivo
  const fileUrl = `http://localhost:3001/uploads/${req.file.filename}`;

  // ¡IMPORTANTE! TinyMCE espera esta estructura JSON exacta: { location: 'url_de_la_imagen' }
  res.json({ location: fileUrl });
});

module.exports = router;