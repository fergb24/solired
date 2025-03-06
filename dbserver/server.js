const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'usuario',
  host: 'localhost',
  database: 'solired',
  password: 'usuario',
  port: 5432,
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { fullName, email, username, phone, password, isAdmin } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (full_name, email, username, phone, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [fullName, email, username, phone, password, isAdmin === 'true'] // Convertir a booleano
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});