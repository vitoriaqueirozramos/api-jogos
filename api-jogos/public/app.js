// Funções para Jogos
async function carregarJogos() {
  try {
    const response = await fetch('/api/jogos');
    const jogos = await response.json();
    const lista = document.getElementById('listaJogos');
    lista.innerHTML = '';
    jogos.forEach(jogo => {
      const li = document.createElement('li');
      li.textContent = `${jogo.id}: ${jogo.titulo} - ${jogo.genero} (${jogo.ano}) - ${jogo.disponivel ? 'Disponível' : 'Indisponível'}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar jogos:', error);
  }
}

document.getElementById('carregarJogos').addEventListener('click', carregarJogos);

document.getElementById('formJogo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const genero = document.getElementById('genero').value;
  const ano = parseInt(document.getElementById('ano').value);
  const disponivel = document.getElementById('disponivel').checked;

  try {
    const response = await fetch('/api/jogos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, genero, ano, disponivel })
    });
    const result = await response.json();
    const msg = document.getElementById('mensagemJogo');
    if (response.ok) {
      msg.textContent = 'Jogo cadastrado com sucesso!';
      msg.className = 'mensagem-sucesso';
      document.getElementById('formJogo').reset();
      carregarJogos();
    } else {
      msg.textContent = result.error;
      msg.className = 'mensagem-erro';
    }
  } catch (error) {
    console.error('Erro ao cadastrar jogo:', error);
  }
});

// Funções para Empréstimos
async function carregarEmprestimos() {
  try {
    const response = await fetch('/api/emprestimos');
    const emprestimos = await response.json();
    const lista = document.getElementById('listaEmprestimos');
    lista.innerHTML = '';
    emprestimos.forEach(emprestimo => {
      const li = document.createElement('li');
      li.textContent = `${emprestimo.id}: Jogo ${emprestimo.jogoId} - ${emprestimo.usuario} (${emprestimo.dataEmprestimo}) - ${emprestimo.devolvido ? 'Devolvido' : 'Emprestado'}`;
      lista.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar empréstimos:', error);
  }
}

document.getElementById('carregarEmprestimos').addEventListener('click', carregarEmprestimos);

document.getElementById('formEmprestimo').addEventListener('submit', async (e) => {
  e.preventDefault();
  const jogoId = parseInt(document.getElementById('jogoId').value);
  const usuario = document.getElementById('usuario').value;
  const dataEmprestimo = document.getElementById('dataEmprestimo').value;
  const devolvido = document.getElementById('devolvido').checked;

  try {
    const response = await fetch('/api/emprestimos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jogoId, usuario, dataEmprestimo, devolvido })
    });
    const result = await response.json();
    const msg = document.getElementById('mensagemEmprestimo');
    if (response.ok) {
      msg.textContent = 'Empréstimo cadastrado com sucesso!';
      msg.className = 'mensagem-sucesso';
      document.getElementById('formEmprestimo').reset();
      carregarEmprestimos();
    } else {
      msg.textContent = result.error;
      msg.className = 'mensagem-erro';
    }
  } catch (error) {
    console.error('Erro ao cadastrar empréstimo:', error);
  }
});