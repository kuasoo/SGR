// components/AdminCrearUsuario.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCrearUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('colaborador');
  const [secciones, setSecciones] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3001/api/secciones', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setSecciones(res.data));
  }, []);

  const toggleSeccion = (id) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3001/api/usuarios/crear', {
        username,
        password,
        rol,
        secciones: seleccionadas
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Usuario creado');
      setUsername('');
      setPassword('');
      setSeleccionadas([]);
    } catch (err) {
      alert('Error al crear usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Crear usuario</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required className="input" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required className="input" />
      <select value={rol} onChange={e => setRol(e.target.value)} className="input">
        <option value="colaborador">Colaborador</option>
        <option value="admin">Administrador</option>
      </select>

      <h3 className="mt-3 mb-1 font-semibold">Secciones asignadas:</h3>
      <div className="max-h-40 overflow-y-auto border p-2 rounded">
        {secciones.map(sec => (
          <label key={sec.id} className="block text-sm">
            <input
              type="checkbox"
              checked={seleccionadas.includes(sec.id)}
              onChange={() => toggleSeccion(sec.id)}
            /> {sec.numero} - {sec.titulo}
          </label>
        ))}
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
    </form>
  );
}

export default AdminCrearUsuario;
