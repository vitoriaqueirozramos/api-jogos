const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const jogosFile = path.join(__dirname, '../data/jogos.json');

// Função auxiliar para ler jogos
function lerJogos() {
  const data = fs.readFileSync(jogosFile, 'utf8');
  return JSON.parse(data);
}

// Função auxiliar para escrever jogos
function escreverJogos(jogos) {
  fs.writeFileSync(jogosFile, JSON.stringify(jogos, null, 2));
}

// GET /jogos - listar todos
router.get('/', (req, res) => {
  try {
    const jogos = lerJogos();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler jogos' });
  }
});

// GET /jogos/:id - buscar por ID
router.get('/:id', (req, res) => {
  try {
    const jogos = lerJogos();
    const jogo = jogos.find(j => j.id == req.params.id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogo' });
  }
});

// POST /jogos - criar novo
router.post('/', (req, res) => {
  try {
    const { titulo, genero, ano, disponivel } = req.body;
    if (!titulo || !genero || !ano) {
      return res.status(400).json({ error: 'Campos obrigatórios: titulo, genero, ano' });
    }
    const jogos = lerJogos();
    const novoId = jogos.length > 0 ? Math.max(...jogos.map(j => j.id)) + 1 : 1;
    const novoJogo = { id: novoId, titulo, genero, ano, disponivel: disponivel !== undefined ? disponivel : true };
    jogos.push(novoJogo);
    escreverJogos(jogos);
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar jogo' });
  }
});

// PUT /jogos/:id - atualizar
router.put('/:id', (req, res) => {
  try {
    const jogos = lerJogos();
    const index = jogos.findIndex(j => j.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    const { titulo, genero, ano, disponivel } = req.body;
    if (!titulo || !genero || !ano) {
      return res.status(400).json({ error: 'Campos obrigatórios: titulo, genero, ano' });
    }
    jogos[index] = { ...jogos[index], titulo, genero, ano, disponivel: disponivel !== undefined ? disponivel : jogos[index].disponivel };
    escreverJogos(jogos);
    res.json(jogos[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar jogo' });
  }
});

// DELETE /jogos/:id - remover
router.delete('/:id', (req, res) => {
  try {
    const jogos = lerJogos();
    const index = jogos.findIndex(j => j.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }
    jogos.splice(index, 1);
    escreverJogos(jogos);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover jogo' });
  }
});

module.exports = router;