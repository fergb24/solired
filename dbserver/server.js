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

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});