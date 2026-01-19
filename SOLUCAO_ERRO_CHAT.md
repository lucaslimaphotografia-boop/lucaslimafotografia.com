# 🔧 Solução: Erro no Assistente Virtual

## ⚠️ Erro Atual

O chat está mostrando: "Desculpe, ocorreu um erro. Por favor, tente novamente."

## ✅ Solução Passo a Passo

### Passo 1: Verificar API Key no Vercel

**CRÍTICO:** A API Key precisa estar configurada no Vercel!

1. Acesse: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Verifique se existe `ANTHROPIC_API_KEY`

**Se NÃO existir:**

1. Vá em **Add New**
2. Configure:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Sua API Key da Anthropic (obtenha em [console.anthropic.com](https://console.anthropic.com))
   - **Environments:** Marque TODAS (Production, Preview, Development)
3. Clique em **Save**
4. **IMPORTANTE:** Faça um novo deploy (Settings → Deployments → Redeploy)

### Passo 2: Obter API Key da Anthropic (se não tiver)

1. Acesse: [https://console.anthropic.com](https://console.anthropic.com)
2. Faça login
3. Vá em **Settings** → **API Keys**
4. Clique em **Create Key**
5. **Copie a chave** (ela só aparece uma vez!)

### Passo 3: Verificar se a API Route Existe

Verifique se o arquivo existe:
- ✅ `api/claude-chat.ts` (deve existir)

Se não existir, o arquivo foi criado. Certifique-se de fazer commit:

```bash
git add api/claude-chat.ts
git commit -m "Add Claude chat API"
git push origin main
```

### Passo 4: Verificar Logs no Vercel

1. Acesse o Vercel Dashboard
2. Vá em seu projeto
3. Clique em **Deployments**
4. Clique no deployment mais recente
5. Clique em **Functions**
6. Procure por `api/claude-chat`
7. Veja os logs para identificar o erro

### Passo 5: Instalar Dependência

Execute no terminal:

```bash
npm install @vercel/node
```

Depois faça commit:

```bash
git add package.json package-lock.json
git commit -m "Add @vercel/node dependency"
git push origin main
```

### Passo 6: Redeploy

Depois de configurar a API Key e instalar dependências:

1. No Vercel Dashboard
2. Vá em **Deployments**
3. Clique nos 3 pontos do deployment mais recente
4. Selecione **Redeploy**
5. Aguarde o deploy finalizar (~2 minutos)

## 🔍 Diagnóstico

### Abra o Console do Navegador

1. Pressione **F12** no navegador
2. Vá na aba **Console**
3. Envie uma mensagem no chat
4. Veja qual erro aparece

**Erros comuns:**

- ❌ `Failed to fetch` → API route não encontrada ou erro de rede
- ❌ `API key not configured` → API Key não configurada no Vercel
- ❌ `Authentication failed` → API Key inválida
- ❌ `404 Not Found` → Arquivo `api/claude-chat.ts` não existe

### Teste a API Manualmente

Abra o navegador e teste diretamente:

```
https://seu-site.vercel.app/api/claude-chat
```

Ou use curl:

```bash
curl -X POST https://seu-site.vercel.app/api/claude-chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Olá"}]}'
```

## ✅ Checklist

- [ ] API Key configurada no Vercel (Environment Variables)
- [ ] API Key válida (testada no console.anthropic.com)
- [ ] Arquivo `api/claude-chat.ts` existe
- [ ] Dependência `@vercel/node` instalada
- [ ] Deploy realizado após configurar API Key
- [ ] Logs verificados no Vercel
- [ ] Console do navegador verificado

## 🆘 Se Ainda Não Funcionar

1. **Verifique os logs do Vercel:**
   - Deployments → Seu deployment → Functions → api/claude-chat
   - Veja qual erro específico está aparecendo

2. **Teste a API Key:**
   - Use o console da Anthropic para testar se a chave funciona

3. **Verifique o formato da API Key:**
   - Deve começar com `sk-ant-`
   - Não deve ter espaços extras
   - Deve estar completa

4. **Confirme que a variável está no ambiente correto:**
   - Marque todas as opções: Production, Preview, Development

## 📞 Próximos Passos

Depois de seguir todos os passos:

1. Aguarde o deploy finalizar
2. Limpe o cache do navegador (Ctrl+Shift+R)
3. Teste o chat novamente
4. Se ainda der erro, verifique o console do navegador (F12)

---

**A causa mais comum do erro é a API Key não estar configurada no Vercel!** ⚠️
