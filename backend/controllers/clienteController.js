const Cliente = require('../models/cliente');
const bcrypt = require('bcryptjs');

// Criar novo cliente
exports.createCliente = async (req, res) => {
    try {
        const { name, password, cpf } = req.body;
        const cliente = new Cliente({ name, password, cpf });
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar um cliente específico por ID
exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json(cliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Fazer login
exports.login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ name });
        if (!cliente) return res.status(400).json({ message: 'Cliente não encontrado' });

        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

        res.status(200).json({ message: 'Login bem-sucedido', cliente });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar cliente
exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        const updatedCliente = await Cliente.findByIdAndUpdate(id, { name, password }, { new: true });
        if (!updatedCliente) return res.status(404).json({ message: 'Cliente não encontrado' });

        res.status(200).json(updatedCliente);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir cliente
exports.deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCliente = await Cliente.findByIdAndDelete(id);
        if (!deletedCliente) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.status(200).json({ message: 'Cliente excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
