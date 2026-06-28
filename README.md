# Cotton Dome LDA | Website Institucional Premium

Este repositório contém o código-fonte do website institucional da empresa **Cotton Dome LDA**, desenvolvido com tecnologias modernas de alto desempenho. O design do site segue um estilo escuro com destaques dourados, transmitindo confiança, profissionalismo e sofisticação técnica.

## Tecnologias Utilizadas

- **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/) (Vite v6)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilo**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações**: [Motion](https://motion.dev/) (anteriormente Framer Motion)
- **Ícones**: [Lucide React](https://lucide.dev/)

## Estrutura do Projeto

```text
├── assets/                 # Imagens e recursos estáticos do site
├── src/
│   ├── components/         # Componentes React reutilizáveis (Hero, About, etc.)
│   ├── data.ts             # Conteúdo estruturado do site (soluções, ambientes, parceiros)
│   ├── types.ts            # Definições de tipos TypeScript
│   ├── index.css           # Estilização global e tokens do Tailwind CSS v4
│   ├── main.tsx            # Ponto de entrada da aplicação
│   └── App.tsx             # Componente raiz da aplicação
├── index.html              # HTML principal com tags SEO configuradas
├── package.json            # Ficheiro de configuração de dependências npm
├── tsconfig.json           # Configurações do compilador TypeScript
└── vite.config.ts          # Ficheiro de configuração do Vite
```

## Como Executar Localmente

### Pré-requisitos
- Node.js instalado (v18 ou superior recomendado)
- npm instalado

### Passos para Execução:

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

3. **Gerar a Build de Produção**:
   Para gerar os ficheiros otimizados prontos para alojamento estático:
   ```bash
   npm run build
   ```
   Os ficheiros serão gerados na pasta `dist/`.

## Configuração de Contactos

Todos os dados de contacto, incluindo Telefone, WhatsApp, E-mail, Morada e Horários, podem ser facilmente alterados e editados no topo do ficheiro `src/data.ts`, dentro do objeto `CONTACT_INFO`.

---
Desenvolvido exclusivamente para a **Cotton Dome LDA**.
