const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const livroRoutes = require('./routes/livroRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
require ('dotenv').config();

// Middleware para parse de JSON
app.use(express.json());

app.use(cors());

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch(err => {
    console.log('Erro ao conectar ao MongoDB:', err);
});

// Usando rotas
app.use('/api/cliente', clienteRoutes);
app.use('/api/livro', livroRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});