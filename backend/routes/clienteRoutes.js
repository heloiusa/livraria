const express = require('express');
const router = express.Router();
const { createCliente, getClientes, login, updateCliente, deleteCliente, getClienteById } = require('../controllers/clienteController');

// Rotas de clientes
router.post('/', createCliente);
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/login', login);
router.put('/:id', updateCliente); // Rota para atualizar cliente
router.delete('/:id', deleteCliente); // Rota para deletar cliente

module.exports = router;