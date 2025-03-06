const express = require('express');
const { Pool } = require('pg');
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

const cors = require('cors');
app.use(cors());

// Endpoint para registrar usuarios
app.post('/register', async (req, res) => {
  let { fullName, email, username, phone, password, isAdmin } = req.body;
  const isAdminBool = (isAdmin === 'true');

  try {
    const result = await pool.query(
      `INSERT INTO usuario (nombre_usu, email_usu, username_usu, tlf_usu, contra_usu, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [fullName, email, username, phone, password, isAdminBool]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});