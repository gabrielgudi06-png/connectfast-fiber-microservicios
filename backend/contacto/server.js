require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({
    servicio: 'ConnectFast Contact API',
    estado: 'activo',
    zona_operacion: process.env.ZONA_COBERTURA || 'Cadereyta de Montes'
  });
});

app.post('/api/contacto', (req, res) => {
  const { nombre, telefono, correo, plan, direccion } = req.body;
  if (!nombre || !telefono) {
    return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
  }
  const apiKey = process.env.API_NOTIFICACIONES_KEY;
  console.log(`[Solicitud recibida - Key activa: ${Boolean(apiKey)}]`, { nombre, telefono, correo, plan, direccion });

  res.status(201).json({
    mensaje: 'Solicitud registrada correctamente.',
    folio: `CF-${Date.now()}`
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Microservicio de contacto corriendo en puerto ${PORT}`));