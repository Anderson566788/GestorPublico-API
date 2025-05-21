
# GestorPúblico API 🏛️

Uma API RESTful voltada à administração municipal, com funcionalidades de autenticação, controle de usuários e gerenciamento de permissões (admin/user). Ideal para sistemas internos de prefeituras e órgãos públicos.

## 📌 Funcionalidades

- Registro e login de usuários com JWT
- Hash de senhas com `bcrypt`
- Autenticação e autorização por role (`admin` ou `user`)
- Listagem de todos os usuários (somente admins)
- Promoção de usuários para admin (somente admins)
- Remoção de usuários (somente admins)

## 🛠️ Tecnologias

- Node.js
- Express.js
- MySQL
- Sequelize (`mysql2`)
- JWT (`jsonwebtoken`)
- Bcrypt

## 📁 Estrutura de Diretórios

```
├── config/
│   └── database.js          # Configuração da conexão com o MongoDB
├── controllers/
│   ├── userController.js    # Lógica de negócios para usuários
│   └── complaintController.js # Lógica de negócios para reclamações
├── middleware/
│   └── auth.js              # Middleware de autenticação JWT
├── models/
│   ├── User.js              # Modelo de dados para usuários
│   └── Complaint.js         # Modelo de dados para reclamações
├── routes/
│   ├── userRoutes.js        # Rotas relacionadas a usuários
│   └── complaintRoutes.js   # Rotas relacionadas a reclamações
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json             # Dependências e scripts do projeto
└── server.js                # Ponto de entrada da aplicação
```

## 📄 Rotas

### 🔐 Autenticação

| Método | Rota       | Descrição                        |
|--------|------------|----------------------------------|
| POST   | /register  | Cria um novo usuário             |
| POST   | /login     | Gera token JWT                   |
| POST   | /complaints| Cria uma nova reclamação         |
| GET    | /complaints| Visualizar todas as reclamações  |

### 👮‍♂️ Administração

| Método | Rota                      | Permissão | Descrição                        |
|--------|---------------------------|-----------|----------------------------------|
| GET    | /users                    | admin     | Lista todos os usuários          |
| PUT    | /users/:id/promote        | admin     | Promove um usuário a admin       |
| DELETE | /users/:id                | admin     | Deleta um usuário                | 

## 🔐 Middleware

- `autenticate`: Verifica o token JWT
- `authorizeRole(['admin'])`: Permite acesso apenas a admins

## ⚙️ Como executar

1. Clone o projeto:
   ```bash
   git clone https://github.com/Anderson566788/GestorPublico-API.git
   cd GestorPublico-API
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o `.env`:
   ```
   JWT_SECRET=seu_token_secreto
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=sua_senha
   DB_NAME=gestor_publico
   ```

4. Crie a tabela no MySQL:

   Tabela Users

   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     role ENUM('user', 'admin') DEFAULT 'user'
   );
   ```
   Tabela Complaints
   ```sql
   CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

---

Desenvolvido por Anderson Freire. 🚀