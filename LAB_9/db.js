const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');

// Criação da tabela
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT,
        resumo TEXT,
        conteudo TEXT
    )`);
});

function cadastrarPost(titulo, resumo, conteudo) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)`, 
            [titulo, resumo, conteudo], 
            function(err) {
                if (err) reject(err);
                else resolve();
            });
    });
}

function buscarPosts() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM posts`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { cadastrarPost, buscarPosts };