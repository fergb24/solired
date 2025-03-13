const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt'); // Para encriptar y verificar contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens
const cors = require('cors');
const app = express();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'solired',
  password: 'usuario',
  port: 5432,
});

// Middleware para interpretar JSON
app.use(express.json());
app.use(cors());

// Endpoint para registrar usuarios
app.post('/register', async (req, res) => {
  let { fullName, email, username, phone, password, isAdmin } = req.body;
  const isAdminBool = (isAdmin === 'true');

  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO usuario (nombre_usu, email_usu, username_usu, tlf_usu, contra_usu, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [fullName, email, username, phone, hashedPassword, isAdminBool]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const result = await pool.query('SELECT * FROM usuario WHERE email_usu = $1', [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Verificar la contraseña
      const match = await bcrypt.compare(password, user.contra_usu);
      if (match) {
        const token = jwt.sign({ id: user.id_usu, username: user.username_usu }, 'tu_secreto', { expiresIn: '1h' });
        return res.json({ token, user });
      }
    }
    return res.status(401).json({ message: 'Credenciales inválidas' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Endpoint para obtener información del usuario
app.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'tu_secreto');
    const userId = decoded.id; // Extraer el ID del usuario del token

    // Obtener la información del usuario de la base de datos
    const result = await pool.query('SELECT * FROM usuario WHERE id_usu = $1', [userId]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Elimina la contraseña del objeto de usuario antes de enviarlo
      delete user.contra_usu;
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
});

// Endpoint para obtener todas las solicitudes
app.get('/solicitudes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM solicitud'); // Asegúrate de que el nombre de la tabla sea correcto
    res.json(result.rows); // Devuelve las filas como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las solicitudes' });
  }
});

// Endpoint para crear una nueva solicitud
app.post('/solicitudes', async (req, res) => {
  const { problema_sol, descripcion_sol, aceptada_sol } = req.body;

  // Obtener el token del encabezado
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'tu_secreto');
    const userId = decoded.id; // Extraer el ID del usuario del token

    // Insertar la nueva solicitud en la base de datos
    const result = await pool.query(
      `INSERT INTO solicitud (id_usu, problema_sol, descripcion_sol, aceptada_sol)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, problema_sol, descripcion_sol, aceptada_sol]
    );

    res.status(201).json(result.rows[0]); // Devuelve la nueva solicitud creada
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la solicitud' });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id_usu, nombre_usu, email_usu, username_usu, tlf_usu, is_admin FROM usuario');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
});

// Endpoint para actualizar la información del usuario
app.put('/user', async (req, res) => {
  const { id_usu, nombre_usu, email_usu, username_usu, tlf_usu } = req.body;

  try {
    const result = await pool.query(
      `UPDATE usuario SET nombre_usu = $1, email_usu = $2, username_usu = $3, tlf_usu = $4 WHERE id_usu = $5 RETURNING *`,
      [nombre_usu, email_usu, username_usu, tlf_usu, id_usu]
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows[0]);
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la información del usuario' });
  }
});

// Endpoint para eliminar un usuario
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Primero, eliminar las solicitudes asociadas
    await pool.query('DELETE FROM solicitud WHERE id_usu = $1', [userId]);

    // Luego, eliminar el usuario
    const result = await pool.query('DELETE FROM usuario WHERE id_usu = $1 RETURNING *', [userId]);

    if (result.rows.length > 0) {
      return res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } else {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});