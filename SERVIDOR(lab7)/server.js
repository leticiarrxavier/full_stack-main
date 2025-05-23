const express = require('express');
const path = require('path');

const app = express();

// Porta 80 (pode precisar de permissão de administrador)
const PORT = 80;

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para Home.html
app.get('/Home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});

// Rota para Project.html
app.get('/Project.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Project.html'));
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});