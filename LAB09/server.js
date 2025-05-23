const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Porta 80
app.listen(80, () => {
  console.log('Servidor rodando na porta 80');
});

// Rota padrão -> Projects.html
app.get('/', (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) return res.status(500).send('Erro no banco de dados.');
    res.render('blog', { posts: rows });
  });
});


// Página do blog
app.get('/blog', (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) return res.status(500).send('Erro no banco de dados.');
    res.render('blog', { posts: rows });
  });
});

// Página de cadastro
app.get('/cadastrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'cadastrar_post.html'));
});

// Submissão de post
app.post('/cadastrar', (req, res) => {
  const { titulo, resumo, conteudo } = req.body;
  db.run('INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)', 
    [titulo, resumo, conteudo], 
    (err) => {
      if (err) return res.status(500).send('Erro ao cadastrar.');
      res.redirect('/blog');
    });
});
