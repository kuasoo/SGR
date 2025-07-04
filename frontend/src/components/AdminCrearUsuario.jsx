// components/AdminCrearUsuario.jsx
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Usamos toast para mejores notificaciones

function AdminCrearUsuario() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('colaborador');
  // Se han eliminado los estados 'secciones' y 'seleccionadas'

  // Se ha eliminado el useEffect que cargaba las secciones

  // Se ha eliminado la función toggleSeccion

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      // El payload ya no incluye el array de secciones
      await axios.post('http://localhost:3001/api/usuarios/crear', {
        username,
        password,
        rol,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`Usuario '${username}' creado con éxito.`); // Notificación mejorada
      
      // Limpiar el formulario
      setUsername('');
      setPassword('');
      setRol('colaborador');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al crear usuario';
      toast.error(errorMsg); // Notificación de error mejorada
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
      
      <div className="space-y-3">
        <input 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Nombre de usuario" 
          required 
          className="input w-full p-2 border rounded" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
          className="input w-full p-2 border rounded" 
        />
        <select 
          value={rol} 
          onChange={e => setRol(e.target.value)} 
          className="input w-full p-2 border rounded bg-white"
        >
          <option value="colaborador">Colaborador</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      {/* Se ha eliminado todo el bloque de checkboxes de las secciones */}

      <button 
        type="submit" 
        className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Crear Usuario
      </button>
    </form>
  );
}

export default AdminCrearUsuario;