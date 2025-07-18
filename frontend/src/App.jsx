import { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Login from './login';
import './app.css';
import AdminCrearUsuario from './components/AdminCrearUsuario';

import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/skins/ui/oxide/skin.min.css';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [secciones, setSecciones] = useState([]);
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
  const [contenidoHTML, setContenidoHTML] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUsuario(JSON.parse(userData));
      cargarSecciones();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    setSecciones([]);
    setContenidoSeleccionado(null);
  };

  const cargarSecciones = () => {
    axios.get('http://localhost:3001/api/contenido')
      .then(res => setSecciones(res.data))
      .catch(err => console.error('Error al cargar contenido:', err));
  };

  const handleSelect = (seccion) => {
    setContenidoSeleccionado(seccion);
    setContenidoHTML(seccion.contenido || '');
  };

 const handleSave = () => {
  if (!contenidoSeleccionado) return;

  const ruta =
    contenidoSeleccionado.tipo === 'subseccion'
      ? `http://localhost:3001/api/subsecciones/${contenidoSeleccionado.id}`
      : `http://localhost:3001/api/secciones/${contenidoSeleccionado.id}`;

  axios
    .post(ruta, { contenido: contenidoHTML })
    .then(() => alert('Contenido guardado'))
    .catch(() => alert('Error al guardar contenido'));
};


  const handleVistaPrevia = () => {
    const contenidoPlano = (nodos) => nodos.map(n => {
      const texto = `${n.numero || ''} ${n.titulo}\n${n.contenido?.replace(/<[^>]+>/g, '') || ''}`;
      const hijos = n.children ? contenidoPlano(n.children) : [];
      return [texto, ...hijos].join('\n\n');
    }).join('\n\n');

    const ventana = window.open('', '_blank');
    ventana.document.write(`<pre style="font-family: sans-serif; white-space: pre-wrap;">${contenidoPlano(secciones)}</pre>`);
  };

  const handleGenerarWord = () => {
    window.open('http://localhost:3001/api/exportar-docx', '_blank');
  };

  const TreeNode = ({ node }) => {
    const [editando, setEditando] = useState(false);
    const [tituloEditado, setTituloEditado] = useState(node.titulo);

    const guardarTitulo = () => {
      axios.put(`http://localhost:3001/api/secciones/${node.id}/titulo`, { titulo: tituloEditado })
        .then(() => {
          alert('Título actualizado');
          cargarSecciones();
          setEditando(false);
        })
        .catch(() => alert('Error al actualizar título'));
    };

    return (
      <li className="relative pl-4 border-l-2 border-gray-300">
        <div className="flex items-center justify-between py-1">
          {editando ? (
            <div className="flex gap-1">
              <input
                type="text"
                value={tituloEditado}
                onChange={(e) => setTituloEditado(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              />
              <button onClick={guardarTitulo} className="text-green-600">💾</button>
              <button onClick={() => setEditando(false)} className="text-gray-500">❌</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelect(node)}
                className="text-left text-sm font-medium text-gray-800 dark:text-white hover:underline"
              >
                <span className="font-bold">{node.numero}</span> {node.titulo}
              </button>
              <button onClick={() => setEditando(true)} className="text-blue-500 hover:text-blue-700">✏️</button>
            </div>
          )}
        </div>
        {node.children && node.children.length > 0 && (
          <ul className="ml-4 pl-2 border-l border-gray-200">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  if (!usuario) return <Login onLogin={setUsuario} />;

  return (
    <>
      <div className="topbar">
        <div className="topbar-content">
          <div className="topbar-left">
            <img src="/imagenes/TECNM-ITESG AZUL_Mesa de trabajo 1.png" alt="Logo" className="topbar-logo" />
            <span className="topbar-title">Sistema de Reportes Trimestrales</span>
          </div>
          <div className="topbar-right">
            <div className="topbar-user">
              <img src="/imagenes/icon_user.png" alt="Usuario" className="user-avatar" />
              <span className="user-name">{usuario?.username}</span>
            </div>
            <div className="topbar-buttons">
              <button onClick={handleVistaPrevia} className="bg-blue-500 text-white px-3 py-2 rounded">Vista previa</button>
              <button onClick={handleGenerarWord} className="bg-green-500 text-white px-3 py-2 rounded">Generar Documento</button>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {usuario?.rol === 'admin' && (
          <div className="my-8">
            <AdminCrearUsuario />
          </div>
        )}

        <div className="flex gap-6">
          <div className="w-1/3 pr-4 border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Índice</h2>
            <ul>
              {secciones.map(node => (
                <TreeNode key={node.id} node={node} />
              ))}
            </ul>
          </div>

          <div className="w-2/3">
            {contenidoSeleccionado ? (
              <>
                <h2 className="text-xl font-semibold mb-2">Editar: {contenidoSeleccionado.titulo}</h2>
                <Editor
                  value={contenidoHTML}
                  onEditorChange={(content) => setContenidoHTML(content)}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: ['link', 'table', 'lists', 'code', 'image'],
                    toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table code',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <div className="save-button">
                  <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Selecciona una sección del índice para editar el contenido.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
