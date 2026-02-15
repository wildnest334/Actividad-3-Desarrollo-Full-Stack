require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

// =========================
// 🔹 CONFIGURACIÓN
// =========================

const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET;

// =========================
// 🔹 CONEXIÓN A MONGODB
// =========================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// =========================
// 🔹 MIDDLEWARES
// =========================

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =========================
// 🔹 MODELOS (temporalmente aquí, luego los movemos a /models)
// =========================

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['normal', 'especial'], default: 'normal' }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// =========================
// 🔹 RUTAS DE AUTENTICACIÓN
// =========================

// Registro
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;

    const existeUsuario = await Usuario.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contraseña: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });

  } catch (error) {
    res.status(500).json({ error: 'Error en el registro' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
});

// =========================
// 🔹 INICIAR SERVIDOR
// =========================

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
