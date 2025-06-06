const express = require('express');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, HeadingLevel, TextRun, ImageRun } = require('docx');
const { JSDOM } = require('jsdom');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [capitulos] = await db.query('SELECT * FROM capitulos ORDER BY orden');

    const children = [];

    for (const [i, cap] of capitulos.entries()) {
      const capNum = `${i + 1}`;
      children.push(new Paragraph({
        text: `${capNum}. ${cap.titulo}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 }
      }));

      if (cap.contenido) {
        const texto = new JSDOM(cap.contenido).window.document.body.textContent || '';
        children.push(new Paragraph({ children: [new TextRun(texto.trim())], spacing: { after: 200 } }));
      }

      const [secciones] = await db.query('SELECT * FROM secciones WHERE capitulo_id = ? ORDER BY orden', [cap.id]);
      for (const [j, sec] of secciones.entries()) {
        const secNum = `${capNum}.${j + 1}`;
        children.push(new Paragraph({
          text: `${secNum} ${sec.titulo}`,
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200 }
        }));

        if (sec.contenido) {
          const texto = new JSDOM(sec.contenido).window.document.body.textContent || '';
          children.push(new Paragraph({ children: [new TextRun(texto.trim())], spacing: { after: 200 } }));
        }

        const [imagenes] = await db.query('SELECT * FROM imagenes WHERE seccion_id = ? ORDER BY orden', [sec.id]);
        for (const img of imagenes) {
          const imagePath = path.join(__dirname, '..', 'uploads', path.basename(img.url));
          if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            children.push(new Paragraph({
              children: [new ImageRun({ data: imageBuffer, transformation: { width: 400, height: 300 } })],
              spacing: { after: 300 }
            }));
          }
        }

        const [subsecciones] = await db.query('SELECT * FROM subsecciones WHERE seccion_id = ? ORDER BY orden', [sec.id]);
        for (const [k, sub] of subsecciones.entries()) {
          const subNum = `${secNum}.${k + 1}`;
          children.push(new Paragraph({
            text: `${subNum} ${sub.titulo}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 200 }
          }));

          if (sub.contenido) {
            const texto = new JSDOM(sub.contenido).window.document.body.textContent || '';
            children.push(new Paragraph({ children: [new TextRun(texto.trim())], spacing: { after: 200 } }));
          }

          const [subImgs] = await db.query('SELECT * FROM imagenes WHERE subseccion_id = ? ORDER BY orden', [sub.id]);
          for (const img of subImgs) {
            const imagePath = path.join(__dirname, '..', 'uploads', path.basename(img.url));
            if (fs.existsSync(imagePath)) {
              const imageBuffer = fs.readFileSync(imagePath);
              children.push(new Paragraph({
                children: [new ImageRun({ data: imageBuffer, transformation: { width: 400, height: 300 } })],
                spacing: { after: 300 }
              }));
            }
          }
        }
      }
    }

    const doc = new Document({
      creator: 'SGR System',
      title: 'Reporte Trimestral',
      sections: [{ children }]
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

  } catch (err) {
    console.error('Error generando documento:', err);
    res.status(500).json({ error: 'No se pudo generar el documento' });
  }
});

module.exports = router;


