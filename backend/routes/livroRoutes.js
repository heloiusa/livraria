const express = require('express');
const router = express.Router();
const { createLivro, getLivros, updateLivro, deleteLivro, getLivroById } = require('../controllers/livroController');

// Rotas de livro
router.post('/', createLivro);
router.get('/', getLivros);
router.get('/:id', getLivroById);
router.put('/:id', updateLivro); // Rota para atualizar Livro
router.delete('/:id', deleteLivro); // Rota para deletar livro

module.exports = router;
