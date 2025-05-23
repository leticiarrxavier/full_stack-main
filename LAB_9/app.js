const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota principal
app.get('/', (req, res) => {
    res.render('projetos');
});

// Página do blog
app.get('/blog', async (req, res) => {
    const posts = await db.buscarPosts();
    res.render('blog', { posts });
});

// Página de cadastro
app.get('/cadastrar_post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastrar_post.html'));
});

// Submissão do formulário
app.post('/cadastrar', async (req, res) => {
    await db.cadastrarPost(req.body.titulo, req.body.resumo, req.body.conteudo);
    res.redirect('/blog');
});

app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
});