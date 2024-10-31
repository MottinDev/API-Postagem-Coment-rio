const express = require('express');
const mongoose = require('mongoose');
const usuarioRoutes = require('./routes/authRoutes');
const postagemRoutes = require('./routes/postRoutes');
const comentarioRoutes = require('./routes/commentRoutes');

mongoose.connect('mongodb://localhost:27017/suaBaseDeDados', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/postagens', postagemRoutes);
app.use('/comentarios', comentarioRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
