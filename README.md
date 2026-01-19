# Portfólio Lucas Lima Fotografia

Site portfólio profissional do fotógrafo Lucas Lima, especializado em fotografia de casamentos atemporal e elegante.

## ✨ Características

- 🎨 Design moderno e minimalista
- 🌍 Suporte bilíngue (Português/Inglês)
- 💬 Assistente virtual com Claude AI
- 📱 Totalmente responsivo
- ⚡ Construído com React + TypeScript + Vite
- 🎭 Animações suaves e transições elegantes

## 🚀 Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização (via classes utilitárias)
- **Lucide React** - Ícones
- **Anthropic Claude SDK** - Assistente virtual

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta na Anthropic (para o chat com Claude)

## 🛠️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lucaslimaphotografia-boop/lucaslimafotografia.com.git
   cd lucaslimafotografia.com
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` e adicione sua API key do Anthropic:
   ```
   ANTHROPIC_API_KEY=sua-chave-api-aqui
   ```

4. **Execute em desenvolvimento:**
   ```bash
   npm run dev
   ```

   O site estará disponível em `http://localhost:3000`

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

Para visualizar o build localmente:
```bash
npm run preview
```

## 🔧 Configuração do Claude Chat

O assistente virtual requer um backend para fazer as chamadas à API. Veja o guia completo em [CLAUDE_SETUP.md](./CLAUDE_SETUP.md).

### Opções de Deploy:

- **Vercel** (Recomendado) - Suporta serverless functions nativamente
- **Netlify** - Suporta Netlify Functions
- **Express.js** - Backend Node.js tradicional

## 📁 Estrutura do Projeto

```
├── components/          # Componentes React
│   ├── About.tsx       # Página Sobre
│   ├── ClaudeChat.tsx  # Assistente virtual
│   ├── Contact.tsx     # Formulário de contato
│   ├── FAQ.tsx         # Perguntas frequentes
│   ├── Gallery.tsx     # Galeria de fotos
│   ├── Hero.tsx        # Página inicial
│   └── ...
├── api/                # Exemplos de API backend
│   └── claude-chat.example.js
├── translations.ts     # Traduções PT/EN
├── types.ts           # Tipos TypeScript
├── App.tsx            # Componente principal
└── vite.config.ts     # Configuração do Vite
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Instale a CLI da Vercel:
   ```bash
   npm i -g vercel
   ```

2. Faça o deploy:
   ```bash
   vercel
   ```

3. Configure as variáveis de ambiente no dashboard da Vercel:
   - `ANTHROPIC_API_KEY`

4. Crie o arquivo `api/claude-chat.js` baseado no exemplo em `api/claude-chat.example.js`

### Netlify

1. Conecte o repositório no Netlify
2. Configure as variáveis de ambiente
3. Configure o build command: `npm run build`
4. Configure o publish directory: `dist`

### GitHub Pages

```bash
npm run build
# Siga as instruções do GitHub Pages para fazer deploy da pasta dist/
```

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `ANTHROPIC_API_KEY` | Chave da API do Anthropic para o chat | Sim (para chat) |

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run preview` - Preview do build de produção

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e proprietário.

## 📞 Contato

**Lucas Lima Fotografia**
- Email: contato@lucaslimafotografia.com
- WhatsApp: +55 11 98492-0048
- Site: [lucaslimafotografia.com](https://lucaslimafotografia.com)

## 🙏 Agradecimentos

- [Anthropic](https://www.anthropic.com) - Claude AI
- [Vite](https://vitejs.dev) - Build tool
- [React](https://react.dev) - Framework UI

---

Desenvolvido com ❤️ para Lucas Lima Fotografia
