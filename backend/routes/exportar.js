const express = require('express');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, HeadingLevel, TextRun } = require('docx');
const { JSDOM } = require('jsdom'); // ✅ Importar jsdom
const db = require('../db');

const router = express.Router();

async function obtenerSecciones() {
  const [rows] = await db.query('SELECT * FROM secciones ORDER BY orden ASC');
  return rows;
}

// Generar número jerárquico recursivamente
function generarNumeracion(seccion, todas) {
  const camino = [];
  let actual = seccion;

  while (actual.id_padre) {
    const padre = todas.find(s => s.id === actual.id_padre);
    if (!padre) break;
    camino.unshift(padre);
    actual = padre;
  }

  const indices = camino.map(p => {
    const hijos = todas
      .filter(s => s.id_padre === p.id)
      .sort((a, b) => a.orden - b.orden);
    return hijos.findIndex(s => s.id === camino[camino.indexOf(p) + 1]) + 1;
  });

  const hermanos = todas
    .filter(s => s.id_padre === seccion.id_padre)
    .sort((a, b) => a.orden - b.orden);

  const miPos = hermanos.findIndex(s => s.id === seccion.id) + 1;
  indices.push(miPos);

  return indices.join('.') + '.';
}

router.get('/', async (req, res) => {
  try {
    const secciones = await obtenerSecciones();
    const children = [];

    for (const seccion of secciones) {
      const numeracion = generarNumeracion(seccion, secciones);
      const titulo = `${numeracion} ${seccion.titulo}`;

      // Agregar el título jerárquico
      children.push(
        new Paragraph({
          text: titulo,
          heading: HeadingLevel[`HEADING_${Math.min(seccion.nivel + 1, 6)}`],
          spacing: { after: 200 },
        })
      );

      // Convertir HTML a texto plano
      const contenidoHTML = seccion.contenido?.trim() || '';
      const dom = new JSDOM(contenidoHTML);
      const textoPlano = dom.window.document.body.textContent?.trim() || '[Contenido vacío]';

      children.push(
        new Paragraph({
          children: [new TextRun(textoPlano)],
          spacing: { after: 200 },
        })
      );
    }

    // Crear el documento
    const doc = new Document({
      creator: 'SGR System',
      title: 'Reporte generado',
      description: 'Documento generado automáticamente',
      sections: [{ properties: {}, children }],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `reporte_${Date.now()}.docx`;
    const filePath = path.join(__dirname, '..', 'exports', fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    fs.writeFileSync(filePath, buffer);

    res.download(filePath, fileName, err => {
      if (err) console.error('Error al descargar:', err);
      else fs.unlink(filePath, err => err && console.error('Error al borrar:', err));
    });
  } catch (error) {
    console.error('Error al exportar documento:', error);
    res.status(500).json({ error: 'No se pudo generar el documento' });
  }
});

module.exports = router;

