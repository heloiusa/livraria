document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api'; // Atualize para o URL correto da sua API
    const livroModal = document.getElementById('livroModal');
    const livroForm = document.getElementById('livroForm');
    const addLivroBtn = document.getElementById('addLivronBtn');
    const modalTitleLivro = document.getElementById('modalTitleLivro');
    let editLivroId = null;

    // Função para carregar livros
    const loadLivro = async () => {
        const response = await fetch(`${apiUrl}/livro`);
        const livro = await response.json();
        const tableBody = document.querySelector('#LivroTable tbody');
        tableBody.innerHTML = '';

       livros.forEach(livro  => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${livro.name}</td>
                <td>${livro.description}</td>
                <td>${livro.responsible ? livro.responsible.name : 'N/A'}</td>
                <td>
                    <button class="editLivroBtn" data-id="${livro._id}">Editar</button>
                    <button class="deleteLivroBtn" data-id="${livro._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adicionar eventos de edição e deleção
        document.querySelectorAll('.editLivroBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditLivroModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteLivroBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteLivro(e.target.dataset.id));
        });
    };

    // Função para adicionar livro
    const addLivro = async (livro) => {
        await fetch(`${apiUrl}/livros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'livro/json'
            },
            body: JSON.stringify(livro)
        });
        loadLivro();
    };

    // Função para atualizar livro
    const updateLivro = async (id, livro) => {
        await fetch(`${apiUrl}/livros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plantation)
        });
        loadLivro();
    };

    // Função para deletar livro
    const deleteLivro = async (id) => {
        await fetch(`${apiUrl}/Livro/${id}`, {
            method: 'DELETE'
        });
        loadLivro();
    };

    // Abrir modal para editar livro
    const openEditLivroModal = async (id) => {
        editLivroId = id;
        modalTitleLivro.innerText = 'Editar Livro';

        // Buscar os dados da plantação para preencher o modal
        const response = await fetch(`${apiUrl}/livros/${id}`);
        if (response.status === 404) {
            console.error('Livro não encontrado');
            return;
        }
        const livro = await response.json();

        document.getElementById('nameLivro').value = livro.name;
        document.getElementById('description').value = livro.description;
        await loadClientes(livro.responsible ? livro.responsible._id : null);

        livroModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo livro
    const openAddLivroModal = async () => {
        editLivroId = null;
        modalTitleLivro.innerText = 'Adicionar Plantação';
        livroForm.reset();
        await loadClientes(); // Carrega os usuários sem pré-selecionar nenhum
        livroModal.style.display = 'block';
    };

    // Carregar usuários para o select de responsável
    const loadClientes = async (selectedClienteId = null) => {
        const response = await fetch(`${apiUrl}/clientes`);
        const clientes = await response.json();
        const select = document.getElementById('responsible');
        select.innerHTML = ''; // Limpa o select

        livros.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente._id;
            option.text = cliente.name;
            if (cliente._id === selectedClienteId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        livroModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === livroModal) {
            livroModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    livroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const livroData = {
            name: document.getElementById('nameLivro').value,
            description: document.getElementById('description').value,
            responsible: document.getElementById('responsible').value,
            responsible: document.getElementById('value').value
        };

        if (editLivroId) {
            await updateLivro(editLivroId, livroData);
        } else {
            await addLivro(livroData);
        }

        livroModal.style.display = 'none';
        loadLivros();
    });

    // Inicializando o carregamento de plantações e eventos
    addLivroBtn.addEventListener('click', openAddLivroModal);
    loadLivros();
});
