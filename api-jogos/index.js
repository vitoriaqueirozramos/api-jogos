const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const jogosRoutes = require('./routes/jogos');
const emprestimosRoutes = require('./routes/emprestimos');

app.use('/api/jogos', jogosRoutes);
app.use('/api/emprestimos', emprestimosRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});