# 🔍 Diagnosticar Erro 500 no Chat

## ⚠️ Erro Atual

O console mostra:
```
Failed to load resource: the server responded with a status of 500
Error: Failed to get response from Claude
```

## 🔧 Passos para Resolver

### Passo 1: Verificar Logs no Vercel

1. Acesse: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Deployments**
4. Clique no deployment mais recente
5. Clique na aba **Functions**
6. Procure por `api/claude-chat`
7. Clique para ver os **Logs**

### Passo 2: Verificar API Key

**IMPORTANTE:** O erro 500 geralmente significa que a API Key não está configurada.

1. No Vercel Dashboard
2. Vá em **Settings** → **Environment Variables**
3. Verifique se existe `ANTHROPIC_API_KEY`
4. Se não existir ou estiver incorreta:

#### Obter API Key:

1. Acesse: [https://console.anthropic.com](https://console.anthropic.com)
2. Faça login
3. Vá em **Settings** → **API Keys**
4. Clique em **Create Key**
5. **Copie a chave** (ela só aparece uma vez!)

#### Configurar no Vercel:

1. **Settings** → **Environment Variables**
2. **Add New:**
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Cole a chave copiada
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
3. **Save**

### Passo 3: Redeploy Obrigatório

**CRÍTICO:** Depois de adicionar/modificar variáveis de ambiente, você DEVE fazer redeploy:

1. No Vercel Dashboard
2. Vá em **Deployments**
3. Clique nos **3 pontos** do deployment mais recente
4. Selecione **Redeploy**
5. Aguarde o deploy finalizar (~2 minutos)

**OU** faça um novo commit:

```bash
git commit --allow-empty -m "Trigger redeploy after API key configuration"
git push origin main
```

### Passo 4: Verificar Formato da API Key

A API Key deve:
- Começar com `sk-ant-`
- Ter aproximadamente 40-50 caracteres
- Não ter espaços extras no início/fim
- Estar completa (não truncada)

### Passo 5: Testar Manualmente

Depois do redeploy, teste a API diretamente:

```bash
curl -X POST https://seu-site.vercel.app/api/claude-chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Olá"}]}'
```

Ou use o navegador:
1. Abra as ferramentas de desenvolvedor (F12)
2. Vá na aba **Network**
3. Envie uma mensagem no chat
4. Clique na requisição `claude-chat`
5. Veja a resposta completa

## 📋 Erros Comuns e Soluções

### ❌ "API key not configured"

**Causa:** Variável `ANTHROPIC_API_KEY` não existe no Vercel

**Solução:**
- Adicione a variável (Passo 2)
- Faça redeploy (Passo 3)

### ❌ "Authentication failed"

**Causa:** API Key inválida ou expirada

**Solução:**
- Gere uma nova API Key na Anthropic
- Atualize no Vercel
- Faça redeploy

### ❌ "Module not found: @vercel/node"

**Causa:** Dependência não instalada

**Solução:**
```bash
npm install @vercel/node
git add package.json package-lock.json
git commit -m "Add @vercel/node dependency"
git push origin main
```

### ❌ Erro 500 sem mensagem específica

**Causa:** Erro interno na função

**Solução:**
- Verifique os logs do Vercel (Passo 1)
- Veja se há algum erro específico
- Verifique se o arquivo `api/claude-chat.ts` existe

## ✅ Checklist de Verificação

- [ ] API Key obtida da Anthropic
- [ ] Variável `ANTHROPIC_API_KEY` configurada no Vercel
- [ ] Todas as opções de environment marcadas (Production, Preview, Development)
- [ ] Redeploy feito APÓS configurar a API Key
- [ ] Logs verificados no Vercel
- [ ] Formato da API Key correto (começa com `sk-ant-`)
- [ ] Arquivo `api/claude-chat.ts` existe no projeto
- [ ] Dependência `@vercel/node` instalada

## 🆘 Se Ainda Não Funcionar

1. **Copie o erro exato dos logs do Vercel**
2. **Verifique se a API Key funciona** testando no console da Anthropic
3. **Verifique se o arquivo está no lugar certo:**
   - Deve estar em `/api/claude-chat.ts` (não em `/api/claude-chat.js`)

## 📝 Nota Importante

⚠️ **A causa mais comum do erro 500 é:**
1. API Key não configurada no Vercel
2. Redeploy não feito após configurar a API Key

Sempre faça redeploy depois de adicionar/modificar variáveis de ambiente!
