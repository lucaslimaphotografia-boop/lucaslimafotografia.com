# Configuração do Claude Chat

Este guia explica como configurar o assistente de chat com Claude no seu site.

## 📋 Pré-requisitos

1. **Conta na Anthropic**: Você precisa de uma conta na [Anthropic Console](https://console.anthropic.com)
2. **API Key**: Obtenha sua chave de API em [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
3. **Backend**: Um servidor backend para fazer as chamadas à API (por segurança, nunca exponha a API key no frontend)

## 🚀 Instalação

### 1. Instalar dependências

```bash
npm install @anthropic-ai/sdk
```

### 2. Configurar Backend

Você precisa criar um endpoint de API que fará as chamadas ao Claude. Existem várias opções:

#### Opção A: Vercel Serverless Functions (Recomendado)

1. Crie um arquivo `api/claude-chat.js` na raiz do projeto:

```javascript
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const { messages } = req.body;

  const systemMessage = `Você é um assistente virtual do Lucas Lima Photography...`;

  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: systemMessage,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))
  });

  return res.status(200).json({ content: response.content[0].text });
}
```

2. Configure a variável de ambiente no Vercel:
   - Vá em Settings → Environment Variables
   - Adicione `ANTHROPIC_API_KEY` com sua chave da API

#### Opção B: Express.js (Node.js)

1. Instale Express:
```bash
npm install express
```

2. Crie um servidor Express (ex: `server.js`):

```javascript
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/claude-chat', async (req, res) => {
  // ... código similar ao exemplo acima
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

#### Opção C: Netlify Functions

1. Crie `netlify/functions/claude-chat.js`:

```javascript
import Anthropic from '@anthropic-ai/sdk';

exports.handler = async (event) => {
  // ... implementação similar
};
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
ANTHROPIC_API_KEY=sua-chave-api-aqui
```

**⚠️ IMPORTANTE**: 
- Nunca commite o arquivo `.env` no Git
- Adicione `.env` ao `.gitignore`
- Configure as variáveis de ambiente no seu provedor de hospedagem

### 4. Atualizar URL da API (se necessário)

Se você estiver usando um backend separado, atualize a URL no componente `ClaudeChat.tsx`:

```typescript
const response = await fetch('https://seu-backend.com/api/claude-chat', {
  // ...
});
```

## 🎨 Personalização

### Modificar o System Prompt

Edite o `systemMessage` no arquivo da API para personalizar o comportamento do assistente:

```javascript
const systemMessage = `Você é um assistente virtual do Lucas Lima Photography...
  [Adicione informações específicas sobre seus serviços, estilo, etc.]
`;
```

### Ajustar Modelo

Você pode usar diferentes modelos do Claude:
- `claude-3-5-sonnet-20241022` (recomendado - melhor qualidade)
- `claude-3-opus-20240229` (mais poderoso, mais caro)
- `claude-3-haiku-20240307` (mais rápido, mais barato)

### Ajustar Tokens

Modifique `max_tokens` para controlar o tamanho das respostas:
- `512` - Respostas curtas
- `1024` - Respostas médias (padrão)
- `2048` - Respostas longas

## 🔒 Segurança

1. **Nunca exponha a API key no frontend**
2. **Use variáveis de ambiente** para armazenar a chave
3. **Implemente rate limiting** no backend para evitar abuso
4. **Valide e sanitize** as mensagens do usuário
5. **Use HTTPS** em produção

## 💰 Custos

O Claude API é cobrado por uso. Verifique os preços em:
https://www.anthropic.com/pricing

Modelo recomendado (`claude-3-5-sonnet`):
- Input: $3/million tokens
- Output: $15/million tokens

## 🐛 Troubleshooting

### Erro: "Failed to get response"
- Verifique se a API key está configurada corretamente
- Confirme que o backend está rodando
- Verifique os logs do servidor

### Erro: "CORS"
- Configure CORS no seu backend
- Verifique se a URL da API está correta

### Chat não aparece
- Verifique se o componente `ClaudeChat` está importado no `App.tsx`
- Confirme que não há erros no console do navegador

## 📚 Recursos

- [Documentação Anthropic](https://docs.anthropic.com)
- [SDK JavaScript](https://github.com/anthropics/anthropic-sdk-typescript)
- [Console Anthropic](https://console.anthropic.com)

## ✅ Checklist

- [ ] Conta criada na Anthropic
- [ ] API Key obtida
- [ ] Backend configurado
- [ ] Variáveis de ambiente configuradas
- [ ] Dependências instaladas (`@anthropic-ai/sdk`)
- [ ] Componente integrado no App
- [ ] Testado localmente
- [ ] Deploy realizado
