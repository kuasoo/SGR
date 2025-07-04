const { Document, Packer, Paragraph, HeadingLevel, TextRun } = require("docx");
const fs = require("fs");
const path = require("path");
const db = require("./db");
const router = require("./routes/auth");

function getHeadingLevel(tipo) {
  switch (tipo) {
    case "capitulo": return HeadingLevel.HEADING_1;
    case "seccion": return HeadingLevel.HEADING_2;
    case "subseccion": return HeadingLevel.HEADING_3;
    default: return HeadingLevel.HEADING_4;
  }
}

function getIndentation(tipo) {
  switch (tipo) {
    case "capitulo": return { left: 0 };
    case "seccion": return { left: 400 };
    case "subseccion": return { left: 800 };
    default: return { left: 1200 };
  }
}

async function generarDocumentoWord() {
  const [secciones] = await db.query("SELECT * FROM secciones ORDER BY orden");

  const children = [];

  const buildDoc = (items, parentId = null) => {
    const ramas = items.filter(item => item.id_padre === parentId);
    ramas.forEach(rama => {
      const heading = new Paragraph({
        text: `${rama.numero} ${rama.titulo}`,
        heading: getHeadingLevel(rama.tipo),
        indent: getIndentation(rama.tipo),
      });
      children.push(heading);

      if (rama.contenido) {
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: rama.contenido.replace(/<[^>]+>/g, ""),
              break: 1,
            }),
          ],
          indent: getIndentation(rama.tipo),
        }));
      }

      buildDoc(items, rama.id);
    });
  };

  buildDoc(secciones);

  
  const doc = new Document({
    creator: "SGR Luis",
    title: "Reporte Generado",
    description: "Reporte estructurado con jerarquía",
    sections: [
      {
        children: children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = path.join(__dirname, "reporte.docx");
  fs.writeFileSync(filename, buffer);
  return filename;
}

module.exports = router;
