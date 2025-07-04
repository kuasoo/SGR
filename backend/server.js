// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const estructuraRoutes = require('./routes/estructura');
const capitulosRoutes = require('./routes/capitulos');
const seccionesRoutes = require('./routes/secciones');
const subseccionesRoutes = require('./routes/subsecciones');
const contenidoRoutes = require('./routes/contenido');
const exportarDocxRoutes = require('./routes/exportar');
const authRoutes = require('./routes/auth');
const uploadsRoutes = require('./routes/uploads');
const usuariosRoutes = require('./routes/usuarios');





// Rutas principales
app.use('/api/estructura', estructuraRoutes);
app.use('/api/capitulos', capitulosRoutes);
app.use('/api/secciones', seccionesRoutes);
app.use('/api/subsecciones', subseccionesRoutes);
app.use('/api/contenido', contenidoRoutes);
app.use('/api/exportar-docx', exportarDocxRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/elementos', require('./routes/elementos'));
app.use('/api/usuarios', require('./routes/usuarios'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
