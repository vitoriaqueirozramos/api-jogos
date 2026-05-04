// Funções para Animais
async function carregarAnimais() {
  try {
    const response = await fetch('/api/animais');
    const animais = await response.json();
    const lista = document.getElementById('listaAnimais');
    lista.innerHTML = '';
    animais.forEach(animal => {
      const li = document.createElement('li');
      li.textContent = `${animal.id}: ${animal.nome} - ${animal.especie} - R$ ${animal.preco} - ${animal.disponivel ? 'Disponível' : 'Indisponível'}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar animais:', error);
  }
}

document.getElementById('carregarAnimais').addEventListener('click', carregarAnimais);

document.getElementById('formAnimal').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const especie = document.getElementById('especie').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const disponivel = document.getElementById('disponivel').checked;

  try {
    const response = await fetch('/api/animais', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, especie, preco, disponivel })
    });
    const result = await response.json();
    const msg = document.getElementById('mensagemAnimal');
    if (response.ok) {
      msg.textContent = 'Animal cadastrado com sucesso!';
      msg.className = 'mensagem-sucesso';
      document.getElementById('formAnimal').reset();
      carregarAnimais();
    } else {
      msg.textContent = result.error;
      msg.className = 'mensagem-erro';
    }
  } catch (error) {
    console.error('Erro ao cadastrar animal:', error);
  }
});

// Funções para Vendas
async function carregarVendas() {
  try {
    const response = await fetch('/api/vendas');
    const vendas = await response.json();
    const lista = document.getElementById('listaVendas');
    lista.innerHTML = '';
    vendas.forEach(venda => {
      const li = document.createElement('li');
      li.textContent = `${venda.id}: Animal ${venda.animalId} - ${venda.cliente} (${venda.dataVenda}) - Qtd: ${venda.quantidade}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar vendas:', error);
  }
}

document.getElementById('carregarVendas').addEventListener('click', carregarVendas);

document.getElementById('formVenda').addEventListener('submit', async (e) => {
  e.preventDefault();
  const animalId = parseInt(document.getElementById('animalId').value);
  const cliente = document.getElementById('cliente').value;
  const dataVenda = document.getElementById('dataVenda').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);

  try {
    const response = await fetch('/api/vendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ animalId, cliente, dataVenda, quantidade })
    });
    const result = await response.json();
    const msg = document.getElementById('mensagemVenda');
    if (response.ok) {
      msg.textContent = 'Venda cadastrada com sucesso!';
      msg.className = 'mensagem-sucesso';
      document.getElementById('formVenda').reset();
      carregarVendas();
    } else {
      msg.textContent = result.error;
      msg.className = 'mensagem-erro';
    }
  } catch (error) {
    console.error('Erro ao cadastrar venda:', error);
  }
});