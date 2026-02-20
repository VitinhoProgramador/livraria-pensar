# Livraria Pensar - Frontend

## Descrição do Projeto

Este repositório contém o código-fonte do frontend da aplicação **Livraria Pensar**, uma interface de usuário interativa para gerenciar uma livraria online. Ele foi desenvolvido para consumir uma API backend (provavelmente em .NET) e oferece funcionalidades completas para usuários, incluindo autenticação, navegação por livros e autores, e um sistema de carrinho de compras.

## Tecnologias Utilizadas

O frontend da Livraria Pensar é construído com tecnologias modernas para garantir uma experiência de usuário rápida e responsiva.

*   **Framework**: [React](https://react.dev/) (versão 18.3.1)
*   **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (versão ~5.9.3)
*   **Ferramenta de Build**: [Vite](https://vitejs.dev/) (versão 7.2.4)
*   **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (versão 3.4.19) com PostCSS e Autoprefixer
*   **Roteamento**: [React Router DOM](https://reactrouter.com/en/main) (versão 6.30.3)
*   **Gerenciamento de Estado**: React Context API (para autenticação e carrinho de compras)
*   **Requisições HTTP**: [Axios](https://axios-http.com/docs/intro) (para comunicação com a API backend)
*   **Ícones**: [Lucide React](https://lucide.dev/) (versão 0.563.0)
*   **Linter**: [ESLint](https://eslint.org/)

## Funcionalidades

O frontend da Livraria Pensar oferece as seguintes funcionalidades principais:

*   **Autenticação de Usuários**: Registro, login e confirmação de e-mail. Inclui rotas protegidas que exigem autenticação.
*   **Navegação**: Páginas dedicadas para Home, Livros, Autores, Login, Registro, Carrinho e Perfil do Usuário.
*   **Listagem de Livros**: Exibição de livros com detalhes como título, descrição, preço, imagem de capa e estoque.
*   **Detalhes do Livro**: Página individual para cada livro, mostrando informações completas e o autor associado.
*   **Listagem de Autores**: Exibição de autores com seus detalhes.
*   **Carrinho de Compras**: Adicionar, remover e ajustar a quantidade de livros no carrinho, com cálculo de total de itens e valor total.
*   **Gerenciamento de Perfil**: Acesso a informações do usuário (requer autenticação).
*   **Rotas Protegidas**: Garante que certas páginas (e.g., Perfil) só possam ser acessadas por usuários autenticados.
*   **Tratamento de Erros**: Página 404 para rotas inexistentes.

## Estrutura de Diretórios

A estrutura de arquivos do projeto é organizada de forma modular para facilitar a manutenção e o desenvolvimento:

```
livraria-frontend/
├── public/                     # Arquivos estáticos (e.g., vite.svg)
├── src/                        # Código-fonte da aplicação
│   ├── api/                    # Configuração do cliente Axios
│   │   └── axios.ts
│   ├── assets/                 # Ativos estáticos (e.g., imagens)
│   │   └── react.svg
│   ├── components/             # Componentes React reutilizáveis
│   │   ├── BookCard.tsx
│   │   ├── ConfirmarEmail.tsx
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/               # Contextos React para gerenciamento de estado global
│   │   ├── AuthContext.tsx
│   │   └── CartContext.tsx
│   ├── layouts/                # Layouts da aplicação
│   │   └── MainLayout.tsx
│   ├── pages/                  # Páginas principais da aplicação
│   │   ├── Autores.tsx
│   │   ├── Carrinho.tsx
│   │   ├── DetalhesLivro.tsx
│   │   ├── Home.tsx
│   │   ├── Livros.tsx
│   │   ├── Login.tsx
│   │   ├── Perfil.tsx
│   │   └── Register.tsx
│   ├── services/               # Serviços para interação com a API backend
│   │   ├── authService.ts
│   │   ├── autorService.ts
│   │   └── livroService.ts
│   ├── types/                  # Definições de tipos TypeScript
│   │   ├── Autor.ts
│   │   ├── Livro.ts
│   │   └── ResponseModel.ts
│   ├── App.css                 # Estilos globais da aplicação
│   ├── App.tsx                 # Componente principal da aplicação e configuração de rotas
│   ├── index.css               # Estilos base (Tailwind CSS)
│   └── main.tsx                # Ponto de entrada da aplicação React
├── .gitignore
├── eslint.config.js            # Configuração do ESLint
├── index.html                  # Arquivo HTML principal
├── package.json                # Dependências e scripts do projeto
├── postcss.config.js           # Configuração do PostCSS
├── tailwind.config.js          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
└── vite.config.ts              # Configuração do Vite
```

## Configuração e Execução

Para colocar o frontend da Livraria Pensar em funcionamento, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

*   [Node.js](https://nodejs.org/en/download/) (versão 18 ou superior recomendada)
*   [npm](https://www.npmjs.com/get-npm) ou [Yarn](https://yarnpkg.com/)

### Instalação

1.  Clone este repositório (se ainda não o fez) ou navegue até o diretório `livraria-frontend`.
2.  Instale as dependências do projeto usando npm ou yarn:
    ```bash
    npm install
    # ou yarn install
    ```

### Configuração da API

O frontend espera se comunicar com uma API backend. Por padrão, a URL base da API está configurada em `src/api/axios.ts` como `https://localhost:7029/api`.

```typescript
export const api = axios.create({
  baseURL: "https://localhost:7029/api",
});
```

Certifique-se de que seu backend esteja em execução e acessível nesta URL, ou atualize `baseURL` para o endereço correto da sua API.

### Execução

Para iniciar o servidor de desenvolvimento do frontend:

```bash
npm run dev
# ou yarn dev
```

Após a execução, a aplicação estará disponível em `http://localhost:5173` (ou em uma porta similar, conforme configurado pelo Vite).

### Build para Produção

Para gerar uma versão otimizada para produção da aplicação:

```bash
npm run build
# ou yarn build
```

Os arquivos de build serão gerados no diretório `dist/`.

### Linting

Para verificar problemas de estilo e qualidade de código com ESLint:

```bash
npm run lint
# ou yarn lint
```

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir para o projeto, por favor, siga os seguintes passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/minha-feature`).
3.  Faça suas alterações e commit-as (`git commit -am 'Adiciona nova feature'`).
4.  Envie para a branch (`git push origin feature/minha-feature`).
5.  Abra um Pull Request.




