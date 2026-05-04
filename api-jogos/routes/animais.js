const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const animaisFile = path.join(__dirname, '../data/animais.json');

// Função auxiliar para ler animais
function lerAnimais() {
  const data = fs.readFileSync(animaisFile, 'utf8');
  return JSON.parse(data);
}

// Função auxiliar para escrever animais
function escreverAnimais(animais) {
  fs.writeFileSync(animaisFile, JSON.stringify(animais, null, 2));
}

// GET /animais - listar todos
router.get('/', (req, res) => {
  try {
    const animais = lerAnimais();
    res.json(animais);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler animais' });
  }
});

// GET /animais/:id - buscar por ID
router.get('/:id', (req, res) => {
  try {
    const animais = lerAnimais();
    const animal = animais.find(a => a.id == req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    res.json(animal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar animal' });
  }
});

// POST /animais - criar novo
router.post('/', (req, res) => {
  try {
    const { nome, especie, preco, disponivel } = req.body;
    if (!nome || !especie || !preco) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, especie, preco' });
    }
    const animais = lerAnimais();
    const novoId = animais.length > 0 ? Math.max(...animais.map(a => a.id)) + 1 : 1;
    const novoAnimal = { id: novoId, nome, especie, preco, disponivel: disponivel !== undefined ? disponivel : true };
    animais.push(novoAnimal);
    escreverAnimais(animais);
    res.status(201).json(novoAnimal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar animal' });
  }
});

// PUT /animais/:id - atualizar
router.put('/:id', (req, res) => {
  try {
    const animais = lerAnimais();
    const index = animais.findIndex(a => a.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    const { nome, especie, preco, disponivel } = req.body;
    if (!nome || !especie || !preco) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, especie, preco' });
    }
    animais[index] = { ...animais[index], nome, especie, preco, disponivel: disponivel !== undefined ? disponivel : animais[index].disponivel };
    escreverAnimais(animais);
    res.json(animais[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
});

// DELETE /animais/:id - remover
router.delete('/:id', (req, res) => {
  try {
    const animais = lerAnimais();
    const index = animais.findIndex(a => a.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    animais.splice(index, 1);
    escreverAnimais(animais);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover animal' });
  }
});

module.exports = router;