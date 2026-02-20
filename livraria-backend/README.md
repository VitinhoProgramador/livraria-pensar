# Livraria Pensar - Backend

## Descrição do Projeto

O **Livraria Pensar - Backend** é a API RESTful que serve como a espinha dorsal da aplicação Livraria Pensar. Desenvolvido em .NET 8.0, ele gerencia a lógica de negócios, a persistência de dados e a autenticação/autorização para a plataforma de livraria online. A API expõe endpoints para a gestão de livros, autores e usuários, além de funcionalidades de segurança como registro, login e confirmação de e-mail.

## Tecnologias Utilizadas

Este backend é construído com um conjunto robusto de tecnologias da Microsoft e de código aberto, garantindo performance, segurança e manutenibilidade.

*   **Framework**: [.NET 8.0](https://dotnet.microsoft.com/)
*   **Linguagem**: C#
*   **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/) (gerenciado via [Entity Framework Core](https://learn.microsoft.com/pt-br/ef/core/))
*   **Autenticação e Autorização**: [JSON Web Tokens (JWT)](https://jwt.io/) com `Microsoft.AspNetCore.Authentication.JwtBearer` e `System.IdentityModel.Tokens.Jwt`
*   **Documentação da API**: [Swagger/OpenAPI](https://swagger.io/) com `Swashbuckle.AspNetCore` e `Swashbuckle.AspNetCore.Filters`
*   **Serviço de E-mail**: [MailKit](https://github.com/jstedfast/MailKit) para envio de e-mails (e.g., confirmação de conta)
*   **Gerenciamento de Pacotes**: [NuGet](https://www.nuget.org/)
*   **CORS**: Configurado para permitir requisições do frontend.

## Funcionalidades

A API backend oferece as seguintes funcionalidades principais:

### Autenticação e Autorização

*   **Registro de Usuários**: Permite que novos usuários criem contas, com validação de e-mail e nome de usuário únicos.
*   **Confirmação de E-mail**: Envio de um link de ativação por e-mail para verificar a conta do usuário, aumentando a segurança.
*   **Login**: Autenticação de usuários com credenciais válidas, gerando um token JWT para acesso seguro à API.
*   **Geração de Token JWT**: Emissão de tokens de acesso com tempo de expiração para sessões autenticadas.
*   **Refresh Token**: Mecanismo para renovar tokens de acesso expirados sem a necessidade de um novo login, melhorando a experiência do usuário e a segurança.

### Gestão de Livros

*   **CRUD Completo**: Operações de Criação, Leitura, Atualização e Exclusão de informações de livros.
*   **Atributos do Livro**: Gerencia título, descrição, preço, imagem de capa, quantidade em estoque e o autor associado.

### Gestão de Autores

*   **CRUD Completo**: Operações de Criação, Leitura, Atualização e Exclusão de informações de autores.
*   **Atributos do Autor**: Gerencia nome, sobrenome, biografia e a lista de livros associados a cada autor.

### Gestão de Usuários

*   **CRUD Completo**: Operações de Criação, Leitura, Atualização e Exclusão de informações de usuários.
*   **Atributos do Usuário**: Gerencia nome de usuário, e-mail, status de ativação, hashes e salts de senha, e tokens de segurança (JWT e Refresh Token).

## Estrutura de Diretórios

A estrutura do projeto segue as melhores práticas de arquitetura para aplicações .NET, promovendo a separação de responsabilidades e a modularidade:

```
livraria-backend/
├── Controllers/          # Controladores da API, responsáveis por receber requisições HTTP e retornar respostas.
│   ├── AuthController.cs
│   ├── AutorController.cs
│   ├── LivroController.cs
│   └── UsuarioController.cs
├── Data/                 # Contexto do Entity Framework Core para interação com o banco de dados.
│   └── AppDbContext.cs
├── Dto/                  # Data Transfer Objects (DTOs) para entrada e saída de dados da API.
│   ├── Autor/
│   │   ├── AutorDto.cs
│   │   └── AutorEditarDto.cs
│   ├── Livro/
│   │   ├── LivroDto.cs
│   │   └── LivroEditarDto.cs
│   └── UsuarioDto/
│       ├── UsuarioLoginDto.cs
│       ├── UsuarioRegisterDto.cs
│       ├── UsuarioReadDto.cs
│       └── UsuarioUpdateDto.cs
├── Migrations/           # Migrações do Entity Framework Core para controle de versão do esquema do banco de dados.
├── Models/               # Modelos de domínio que representam as entidades do banco de dados.
│   ├── AutorModel.cs
│   ├── LivroModel.cs
│   ├── ResponseModel.cs
│   └── UsuarioModel.cs
├── Services/             # Lógica de negócio e serviços, implementando interfaces para desacoplamento.
│   ├── Auth/
│   │   ├── AuthService.cs
│   │   ├── Email/
│   │   │   ├── EmailService.cs
│   │   │   └── IEmailInterface.cs
│   │   ├── IAuthInterface.cs
│   │   └── Senha/
│   │       ├── ISenhaInterface.cs
│   │       └── SenhaService.cs
│   ├── Autor/
│   │   ├── AutorService.cs
│   │   └── IAutorInterface.cs
│   ├── Livro/
│   │   ├── ILivroInterface.cs
│   │   └── LivroService.cs
│   └── User/
│       ├── IUsuarioInterface.cs
│       └── UsuarioService.cs
├── appsettings.json      # Arquivo de configuração principal da aplicação.
├── appsettings.Development.json # Configurações específicas para o ambiente de desenvolvimento.
├── Livraria.csproj       # Arquivo de projeto .NET que define as dependências e configurações do build.
├── Program.cs            # Ponto de entrada da aplicação, onde os serviços são configurados e o pipeline HTTP é construído.
└── Properties/           # Configurações de inicialização da aplicação.
    └── launchSettings.json
```

## Configuração e Execução

Para configurar e executar o backend da Livraria Pensar, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
*   [PostgreSQL](https://www.postgresql.org/download/)
*   Um cliente de banco de dados (e.g., pgAdmin, DBeaver) para gerenciar o PostgreSQL (opcional, mas recomendado).

### Configuração do Banco de Dados (PostgreSQL)

1.  **Crie um banco de dados PostgreSQL** com o nome `livraria-db`.
2.  **Atualize as credenciais**: No arquivo `appsettings.json`, verifique a seção `ConnectionStrings`.
    ```json
    "ConnectionStrings": {
        "DefaultConnection": "Host=localhost;Port=5432;Database=livraria-db;Username=postgres;Password=947660;"
    }
    ```
    Certifique-se de que `Username` e `Password` correspondam às suas configurações do PostgreSQL. Se o banco de dados tiver um nome diferente, atualize `Database`.

### Configuração de E-mail

No arquivo `appsettings.json`, configure as credenciais para o serviço de e-mail na seção `EmailSettings`:

```json
"EmailSettings": {
    "SmtpServer": "smtp.gmail.com",
    "Port": 587,
    "SenderName": "Cidade Alerta",
    "SenderEmail": "manoelvitor.mv21@gmail.com",
    "Password": "hvak edmb bmlx bdxq"
}
```

**Atenção**: Para ambientes de produção, é **altamente recomendável** que senhas e outras informações sensíveis sejam gerenciadas através de variáveis de ambiente ou um sistema de gerenciamento de segredos, e não diretamente no `appsettings.json`.

### Instalação e Execução

1.  Navegue até o diretório `livraria-backend`:
    ```bash
    cd livraria-backend
    ```
2.  Restaure as dependências do projeto:
    ```bash
    dotnet restore
    ```
3.  Aplique as migrações do banco de dados para criar o esquema e as tabelas necessárias:
    ```bash
    dotnet ef database update
    ```
4.  Execute a aplicação backend:
    ```bash
    dotnet run
    ```

O backend estará disponível em `https://localhost:7029` (ou uma porta similar, conforme configurado em `Properties/launchSettings.json`). A documentação interativa da API via Swagger UI estará acessível em `https://localhost:7029/swagger`.

## Endpoints da API

A documentação completa e interativa de todos os endpoints da API pode ser explorada através do Swagger UI, acessível após a execução do backend. Os principais controladores e suas rotas incluem:

*   `/api/Auth`: Gerencia o registro, login, confirmação de e-mail e renovação de tokens.
*   `/api/Autor`: Permite operações CRUD para autores.
*   `/api/Livro`: Permite operações CRUD para livros.
*   `/api/Usuario`: Permite operações CRUD para usuários.

## Variáveis de Ambiente

Embora algumas configurações estejam diretamente no `appsettings.json`, para ambientes de produção, é crucial utilizar variáveis de ambiente para as seguintes configurações sensíveis:

*   `ConnectionStrings:DefaultConnection`: String de conexão com o banco de dados.
*   `AppSettings:Token`: Chave secreta utilizada para assinar e validar os tokens JWT.
*   `EmailSettings:Password`: Senha da conta de e-mail remetente.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, por favor, siga os seguintes passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e commit-as (`git commit -am 'Adiciona nova feature'`).
4.  Envie para a branch (`git push origin feature/minha-feature`).
5.  Abra um Pull Request.
