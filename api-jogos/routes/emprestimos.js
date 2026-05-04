const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const emprestimosFile = path.join(__dirname, '../data/emprestimos.json');

// Função auxiliar para ler empréstimos
function lerEmprestimos() {
  const data = fs.readFileSync(emprestimosFile, 'utf8');
  return JSON.parse(data);
}

// Função auxiliar para escrever empréstimos
function escreverEmprestimos(emprestimos) {
  fs.writeFileSync(emprestimosFile, JSON.stringify(emprestimos, null, 2));
}

// GET /emprestimos - listar todos
router.get('/', (req, res) => {
  try {
    const emprestimos = lerEmprestimos();
    res.json(emprestimos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler empréstimos' });
  }
});

// GET /emprestimos/:id - buscar por ID
router.get('/:id', (req, res) => {
  try {
    const emprestimos = lerEmprestimos();
    const emprestimo = emprestimos.find(e => e.id == req.params.id);
    if (!emprestimo) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
    res.json(emprestimo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empréstimo' });
  }
});

// POST /emprestimos - criar novo
router.post('/', (req, res) => {
  try {
    const { jogoId, usuario, dataEmprestimo, devolvido } = req.body;
    if (!jogoId || !usuario || !dataEmprestimo) {
      return res.status(400).json({ error: 'Campos obrigatórios: jogoId, usuario, dataEmprestimo' });
    }
    const emprestimos = lerEmprestimos();
    const novoId = emprestimos.length > 0 ? Math.max(...emprestimos.map(e => e.id)) + 1 : 1;
    const novoEmprestimo = { id: novoId, jogoId, usuario, dataEmprestimo, devolvido: devolvido !== undefined ? devolvido : false };
    emprestimos.push(novoEmprestimo);
    escreverEmprestimos(emprestimos);
    res.status(201).json(novoEmprestimo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar empréstimo' });
  }
});

// PUT /emprestimos/:id - atualizar (opcional, mas incluído)
router.put('/:id', (req, res) => {
  try {
    const emprestimos = lerEmprestimos();
    const index = emprestimos.findIndex(e => e.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
    const { jogoId, usuario, dataEmprestimo, devolvido } = req.body;
    if (!jogoId || !usuario || !dataEmprestimo) {
      return res.status(400).json({ error: 'Campos obrigatórios: jogoId, usuario, dataEmprestimo' });
    }
    emprestimos[index] = { ...emprestimos[index], jogoId, usuario, dataEmprestimo, devolvido: devolvido !== undefined ? devolvido : emprestimos[index].devolvido };
    escreverEmprestimos(emprestimos);
    res.json(emprestimos[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar empréstimo' });
  }
});

// DELETE /emprestimos/:id - remover (opcional)
router.delete('/:id', (req, res) => {
  try {
    const emprestimos = lerEmprestimos();
    const index = emprestimos.findIndex(e => e.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }
    emprestimos.splice(index, 1);
    escreverEmprestimos(emprestimos);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover empréstimo' });
  }
});

module.exports = router;