# 🤖 Como Configurar o Assistente Virtual - Guia Rápido

Guia passo a passo para configurar o assistente virtual Claude no seu site.

## ⚡ Configuração Rápida (5 minutos)

### Passo 1: Obter API Key da Anthropic

1. Acesse: [https://console.anthropic.com](https://console.anthropic.com)
2. Crie uma conta (se ainda não tiver)
3. Vá em **Settings** → **API Keys**
4. Clique em **Create Key**
5. **Copie a chave** (ela só aparece uma vez!)
6. Guarde em local seguro

### Passo 2: Criar API Route no Vercel

1. No seu projeto, crie o arquivo: `api/claude-chat.ts`

2. Cole este código:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { messages } = req.body;

    // Personalize esta mensagem com informações sobre você
    const systemMessage = `Você é um assistente virtual do Lucas Lima Photography, um fotógrafo de casamentos especializado em fotografia atemporal e elegante. 
    
Informações sobre o Lucas Lima:
- 15 anos de experiência em fotografia de casamentos
- Estilo: Fotografia Atemporal, elegante e documental
- Trabalha em casamentos no Brasil e internacionalmente
- Especializado em capturar emoções autênticas e momentos verdadeiros
- Oferece álbums impressos premium e galerias online
- Contato: contato@lucaslimafotografia.com | +55 11 98492-0048

Seja profissional, amigável e ajude os visitantes com informações sobre serviços, orçamentos, estilos de fotografia e disponibilidade.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemMessage,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    });

    const content = response.content[0].text;

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ 
      error: 'Failed to get response',
      message: error.message 
    });
  }
}
```

### Passo 3: Configurar API Key no Vercel

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Clique em **Add New**
5. Configure:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Cole a API Key que você copiou
   - **Environments:** Marque todas (Production, Preview, Development)
6. Clique em **Save**

### Passo 4: Instalar Dependência (se necessário)

Se ainda não tiver instalado:

```bash
npm install @anthropic-ai/sdk
```

### Passo 5: Fazer Deploy

1. Faça commit e push das alterações:
```bash
git add api/claude-chat.ts
git commit -m "Add Claude chat API route"
git push origin main
```

2. Aguarde o deploy no Vercel (~1-2 minutos)

3. Teste o chat no site!

## ✅ Verificação

1. Acesse seu site
2. Procure pelo ícone de chat (geralmente no canto inferior direito)
3. Clique e teste uma mensagem
4. Se funcionar, está configurado! 🎉

## 🎨 Personalizar o Assistente

### Editar System Prompt

Edite a variável `systemMessage` no arquivo `api/claude-chat.ts`:

```typescript
const systemMessage = `Você é um assistente virtual do Lucas Lima Photography...
    
[Adicione aqui informações sobre você:
- Experiência
- Estilo de fotografia
- Localização
- Serviços oferecidos
- Preços (opcional)
- Contato]
`;
```

### Exemplo de Personalização:

```typescript
const systemMessage = `Você é o assistente virtual do Lucas Lima, fotógrafo de casamentos premium.

SOBRE O LUCAS:
- Fotógrafo profissional há 15 anos
- Especializado em casamentos elegantes e sofisticados
- Estilo: Fotografia editorial e documental
- Trabalha em: São Paulo, Rio de Janeiro, e internacionalmente
- Oferece: Cobertura completa, álbuns premium, galeria online
- Pacotes a partir de R$ 8.000 para casamentos

SERVIÇOS:
- Cobertura completa do casamento (10-12 horas)
- Ensaios pré-wedding
- Álbuns impressos de luxo
- Galeria online privada
- Entrega em até 30 dias

ESTILO:
- Fotografia atemporal e elegante
- Foco em emoções e momentos autênticos
- Composição artística
- Iluminação natural

Seja acolhedor, profissional e ajude os noivos com informações sobre pacotes, disponibilidade, processos e qualquer dúvida sobre o trabalho do Lucas.

Sempre ofereça agendar uma conversa para orçamentos detalhados.`;
```

## 🔧 Resolução de Problemas

### ❌ "Failed to get response"

**Possíveis causas:**
- API Key não configurada no Vercel
- API Key inválida ou expirada
- Erro na API Route

**Solução:**
1. Verifique se a variável `ANTHROPIC_API_KEY` está configurada no Vercel
2. Verifique se o valor está correto (sem espaços extras)
3. Verifique os logs do Vercel (Settings → Logs)
4. Teste a API Key manualmente

### ❌ Chat não aparece

**Solução:**
1. Verifique se o componente `ClaudeChat` está importado no `App.tsx`
2. Abra o console do navegador (F12) e veja se há erros
3. Verifique se a API route foi deployada

### ❌ Erro de CORS

**Solução:**
Não deve acontecer com Vercel Serverless Functions, mas se acontecer:
- Certifique-se de que está usando a URL correta
- A rota deve estar em `/api/claude-chat`

## 💰 Custos

O Claude API é pago por uso. Modelo recomendado:

- **Claude 3.5 Sonnet:**
  - Input: $3 por milhão de tokens
  - Output: $15 por milhão de tokens

**Estimativa de custo:**
- 100 conversas/dia (10 mensagens cada): ~$5-10/mês
- 500 conversas/dia: ~$25-50/mês

**Dicas para economizar:**
- Use `claude-3-haiku` para respostas mais simples (mais barato)
- Limite o `max_tokens` se não precisar de respostas longas
- Implemente rate limiting no futuro

## 🚀 Melhorias Futuras

1. **Rate Limiting:** Limitar mensagens por usuário
2. **Histórico:** Salvar conversas no localStorage
3. **Multi-idioma:** Suporte automático PT/EN
4. **Analytics:** Rastrear perguntas frequentes
5. **Agendamento:** Integração com calendário

## 📝 Checklist de Configuração

- [ ] Conta criada na Anthropic
- [ ] API Key obtida
- [ ] Arquivo `api/claude-chat.ts` criado
- [ ] Variável `ANTHROPIC_API_KEY` configurada no Vercel
- [ ] System prompt personalizado
- [ ] Deploy realizado
- [ ] Teste no site funcionando

## 🆘 Precisa de Ajuda?

Se tiver problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste a API Key diretamente no console da Anthropic
3. Verifique o console do navegador para erros

---

**Pronto!** Seu assistente virtual está configurado! 🎉
