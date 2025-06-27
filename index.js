const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let livros = [
    { id: 1, titulo: "A arte da Guerra", autor: "Sun Tzu" },
    { id: 2, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { id: 3, titulo: "1984", autor: "George Orwell" },
    { id: 4, titulo: "Dom Quixote", autor: "Miguel de Cervantes" },
    { id: 5, titulo: "Orgulho e Preconceito", autor: "Jane Austen" },
    { id: 6, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    { id: 7, titulo: "O que o sol faz com as flores", autor: "Rupi Kaur" }
];

// Rota GET /livros - Retornar a lista completa de livros
app.get("/livros", (req, res) => {
    res.json(livros);
});

// Rota GET /livros/:id - Retornar um livro específico pelo ID
app.get("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: "Livro não encontrado" });
    }
});

// Rota POST /livros - Adicionar um novo livro
app.post("/livros", (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ message: "Título e autor são obrigatórios." });
    }

    const newId = livros.length > 0 ? livros[livros.length - 1].id + 1 : 1;
    const novoLivro = { id: newId, titulo, autor };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});

// Rota PUT /livros/:id - Atualizar um livro existente
app.put("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ message: "Título e autor são obrigatórios." });
    }

    const livro = livros.find(l => l.id === id);

    if (!livro) {
        return res.status(404).json({ message: "Livro não encontrado" });
    }

    livro.titulo = titulo;
    livro.autor = autor;

    res.status(200).json(livro);
});



// Rota DELETE /livros/:id - Remover um livro da coleção
app.delete("/livros/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Livro não encontrado" });
    }

    livros.splice(index, 1);

    res.status(200).json({ message: "Livro deletado com sucesso" });
});





// Rota para a página inicial
app.get("/", (req, res) => {
    res.send("Bem-vindo à API de Livros!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
