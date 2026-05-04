# API Jogos

Este projeto é uma aplicação full-stack para gerenciamento de jogos e empréstimos, desenvolvida com Node.js, Express e front-end em HTML/CSS/JavaScript.

## Tecnologias Usadas

- **Back-End**: Node.js + Express
- **Persistência**: Arquivos JSON
- **Front-End**: HTML, CSS, JavaScript (Fetch API)

## Instalação e Execução

1. Clone o repositório:
   ```
   git clone https://github.com/vitoriaqueirozramos/api-jogos.git
   cd api-jogos
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Execute o servidor:
   ```
   npm start
   ```

4. Abra o navegador em `http://localhost:3000`

## Endpoints da API

### Jogos
- `GET /api/jogos` - Listar todos os jogos
- `GET /api/jogos/:id` - Buscar jogo por ID
- `POST /api/jogos` - Criar novo jogo (campos: titulo, genero, ano, disponivel)
- `PUT /api/jogos/:id` - Atualizar jogo
- `DELETE /api/jogos/:id` - Remover jogo

### Empréstimos
- `GET /api/emprestimos` - Listar todos os empréstimos
- `GET /api/emprestimos/:id` - Buscar empréstimo por ID
- `POST /api/emprestimos` - Criar novo empréstimo (campos: jogoId, usuario, dataEmprestimo, devolvido)
- `PUT /api/emprestimos/:id` - Atualizar empréstimo
- `DELETE /api/emprestimos/:id` - Remover empréstimo

## Estrutura do Projeto

```
api-jogos/
├── index.js
├── routes/
│   ├── jogos.js
│   └── emprestimos.js
├── data/
│   ├── jogos.json
│   └── emprestimos.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── README.md
└── .gitignore
```