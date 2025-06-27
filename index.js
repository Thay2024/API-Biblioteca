const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let livros =[
    
        {id: 1, titulo:"A arte da Guerra", autor:"Sun Tzu"},
        {id: 2, titulo:"O Senhor dos Anéis", autor:"J.R.R. Tolkien"},
        {id: 3, titulo:"1984", autor:"George Orwell"},
        {id: 4, titulo:"Dom Quixote", autor:"Miguel de Cervantes"},
        {id: 5, titulo:"Orgulho e Preconceito", autor:"Jane Austen"},
        {id: 6, titulo:"O Pequeno Príncipe", autor:"Antoine de Saint-Exupéry"},
        {id: 7, titulo:"O que o sol faz com as flores", autor:"Rupi Kaur"},

];

app.get("/livros", (req, res) => {  // Rota para listar todos os livros
    res.json(livros);
});

app.get("/livros/:id", (req, res) => { // Rota para buscar um livro específico pelo ID
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ message: "Livro não encontrado" });
    }

    });

app.post("/livros", (req, res) => { // Rota para adicionar um novo livro
    const novoLivro = req.body;

    


















app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
