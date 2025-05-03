const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Usuario = require('./models/Usuario');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('🟢 Conectado a MongoDB');
})
.catch((err) => {
  console.error('🔴 Error al conectar a MongoDB:', err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.post('/api/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    console.log('📥 Datos recibidos:', req.body); // 👈 importante

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(400).json({ error: 'No se pudo registrar el usuario' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Comparar contraseña ingresada con la contraseña hasheada
    const esValida = await bcrypt.compare(password, usuario.password);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Si todo está bien, devolvemos una respuesta exitosa
    res.status(200).json({ mensaje: 'Login exitoso' });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT}`);
});
