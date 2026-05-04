# API Animais

Este projeto é uma aplicação full-stack para gerenciamento de animais e vendas, desenvolvida com Node.js, Express e front-end em HTML/CSS/JavaScript.

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

### Animais
- `GET /api/animais` - Listar todos os animais
- `GET /api/animais/:id` - Buscar animal por ID
- `POST /api/animais` - Criar novo animal (campos: nome, especie, preco, disponivel)
- `PUT /api/animais/:id` - Atualizar animal
- `DELETE /api/animais/:id` - Remover animal

### Vendas
- `GET /api/vendas` - Listar todas as vendas
- `GET /api/vendas/:id` - Buscar venda por ID
- `POST /api/vendas` - Criar nova venda (campos: animalId, cliente, dataVenda, quantidade)
- `PUT /api/vendas/:id` - Atualizar venda
- `DELETE /api/vendas/:id` - Remover venda

## Estrutura do Projeto

```
api-jogos/
├── index.js
├── routes/
│   ├── animais.js
│   └── vendas.js
├── data/
│   ├── animais.json
│   └── vendas.json
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── package.json
├── README.md
└── .gitignore
```