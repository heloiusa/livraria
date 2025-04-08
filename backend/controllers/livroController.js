const livro = require('../models/livro');

// Criar novo livro
exports.createLivro = async (req, res) => {
    try {
        const { name, description, responsible } = req.body;
        const livro = new Livro({ name, description, responsible, value });
        await livro.save();
        res.status(201).json(livro);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas os livros
exports.getLivros = async (req, res) => {
    try {
        const livros = await Livro.find().populate('responsible', 'name', 'value');
        res.status(200).json(livros);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getLivroById = async (req, res) => {
    try {
        const livro = await Livro.findById(req.params.id).populate('responsible', 'name');
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }
        res.status(200).json(livro);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar livro
exports.updateLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, responsible, value } = req.body;

        const updatedLivro = await Livro.findByIdAndUpdate(id, { name, description, responsible }, { new: true });
        if (!updatedLivro) return res.status(404).json({ message: 'Livro não encontrado' });

        res.status(200).json(updatedLivro);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir livro
exports.deleteLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLivro= await Livro.findByIdAndDelete(id);
        if (!deletedLivro) return res.status(404).json({ message: 'Plantação não encontrada' });

        res.status(200).json({ message: 'Livro excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
