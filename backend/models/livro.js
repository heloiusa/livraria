const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;
