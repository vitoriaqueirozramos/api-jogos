const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const vendasFile = path.join(__dirname, '../data/vendas.json');

// Função auxiliar para ler vendas
function lerVendas() {
  const data = fs.readFileSync(vendasFile, 'utf8');
  return JSON.parse(data);
}

// Função auxiliar para escrever vendas
function escreverVendas(vendas) {
  fs.writeFileSync(vendasFile, JSON.stringify(vendas, null, 2));
}

// GET /vendas - listar todos
router.get('/', (req, res) => {
  try {
    const vendas = lerVendas();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao ler vendas' });
  }
});

// GET /vendas/:id - buscar por ID
router.get('/:id', (req, res) => {
  try {
    const vendas = lerVendas();
    const venda = vendas.find(v => v.id == req.params.id);
    if (!venda) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    res.json(venda);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar venda' });
  }
});

// POST /vendas - criar novo
router.post('/', (req, res) => {
  try {
    const { animalId, cliente, dataVenda, quantidade } = req.body;
    if (!animalId || !cliente || !dataVenda || !quantidade) {
      return res.status(400).json({ error: 'Campos obrigatórios: animalId, cliente, dataVenda, quantidade' });
    }
    const vendas = lerVendas();
    const novoId = vendas.length > 0 ? Math.max(...vendas.map(v => v.id)) + 1 : 1;
    const novaVenda = { id: novoId, animalId, cliente, dataVenda, quantidade };
    vendas.push(novaVenda);
    escreverVendas(vendas);
    res.status(201).json(novaVenda);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar venda' });
  }
});

// PUT /vendas/:id - atualizar (opcional, mas incluído)
router.put('/:id', (req, res) => {
  try {
    const vendas = lerVendas();
    const index = vendas.findIndex(v => v.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    const { animalId, cliente, dataVenda, quantidade } = req.body;
    if (!animalId || !cliente || !dataVenda || !quantidade) {
      return res.status(400).json({ error: 'Campos obrigatórios: animalId, cliente, dataVenda, quantidade' });
    }
    vendas[index] = { ...vendas[index], animalId, cliente, dataVenda, quantidade };
    escreverVendas(vendas);
    res.json(vendas[index]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar venda' });
  }
});

// DELETE /vendas/:id - remover (opcional)
router.delete('/:id', (req, res) => {
  try {
    const vendas = lerVendas();
    const index = vendas.findIndex(v => v.id == req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    vendas.splice(index, 1);
    escreverVendas(vendas);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover venda' });
  }
});

module.exports = router;