# 🔐 Corrigir Erro de Autenticação - API Key Inválida

## ⚠️ Erro Atual

```
Authentication failed. Please check your API key in Vercel settings.
```

Este erro significa que **a API Key está configurada, mas está incorreta ou inválida**.

## ✅ Solução Passo a Passo

### Passo 1: Verificar API Key Atual no Vercel

1. Acesse: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Procure por `ANTHROPIC_API_KEY`
5. **Veja o valor** (deve começar com `sk-ant-`)

**Verifique:**
- ✅ Começa com `sk-ant-`
- ✅ Tem aproximadamente 40-50 caracteres
- ✅ Não tem espaços extras no início/fim
- ✅ Está completa (não truncada)

### Passo 2: Obter Nova API Key da Anthropic

1. Acesse: [https://console.anthropic.com](https://console.anthropic.com)
2. Faça login
3. Vá em **Settings** → **API Keys**
4. Veja suas chaves existentes

**Se já tem uma chave:**
- Verifique se ela está ativa
- Veja se não expirou
- Copie a chave completa

**Se não tem ou quer criar nova:**
1. Clique em **Create Key**
2. Dê um nome (ex: "Lucas Lima Site")
3. **Copie a chave** imediatamente (ela só aparece uma vez!)

### Passo 3: Atualizar API Key no Vercel

1. No Vercel Dashboard
2. Vá em **Settings** → **Environment Variables**
3. Encontre `ANTHROPIC_API_KEY`
4. Clique nos **3 pontos** → **Edit**
5. **Cole a nova chave** (certifique-se de que está correta)
6. **Verifique** que todas as opções estão marcadas:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
7. Clique em **Save**

**OU** se não existir:
1. Clique em **Add New**
2. Configure:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Cole a chave
   - **Environments:** Marque todas
3. Clique em **Save**

### Passo 4: Fazer Redeploy OBRIGATÓRIO

⚠️ **CRÍTICO:** Sempre faça redeploy após alterar variáveis de ambiente!

**Opção 1: Redeploy no Vercel Dashboard**

1. No Vercel Dashboard
2. Vá em **Deployments**
3. Clique nos **3 pontos** do deployment mais recente
4. Selecione **Redeploy**
5. Aguarde o deploy finalizar (~2 minutos)

**Opção 2: Trigger via Git**

```bash
git commit --allow-empty -m "Trigger redeploy after API key update"
git push origin main
```

### Passo 5: Verificar se Funcionou

1. Aguarde o deploy finalizar (~2 minutos)
2. Recarregue o site (Ctrl+Shift+R para limpar cache)
3. Tente usar o chat novamente
4. Deve funcionar! ✅

## 🔍 Verificar se a API Key Está Correta

### Teste Manual da API Key

1. Acesse: [https://console.anthropic.com](https://console.anthropic.com)
2. Vá em **API Keys**
3. Verifique se a chave está **Active**
4. Veja se não está marcada como **Revoked** ou **Expired**

### Formato Correto

A API Key deve:
- Começar com: `sk-ant-`
- Ter cerca de: 40-50 caracteres
- Exemplo: `sk-ant-api03-xxxxx...`

### Erros Comuns

❌ **Espaços extras:**
- Errado: ` sk-ant-... ` (espaços no início/fim)
- Correto: `sk-ant-...`

❌ **Chave incompleta:**
- Verifique se copiou toda a chave
- Não deve estar truncada

❌ **Chave de outro projeto:**
- Certifique-se de usar a chave da Anthropic
- Não misture com outras APIs

## 📋 Checklist de Verificação

- [ ] API Key obtida da Anthropic Console
- [ ] Formato correto (`sk-ant-...`)
- [ ] Chave completa (40-50 caracteres)
- [ ] Sem espaços extras
- [ ] Atualizada no Vercel (Environment Variables)
- [ ] Todas as opções marcadas (Production, Preview, Development)
- [ ] Redeploy feito APÓS atualizar
- [ ] Deploy finalizado com sucesso
- [ ] Cache do navegador limpo (Ctrl+Shift+R)
- [ ] Teste no chat funcionando

## 🆘 Se Ainda Não Funcionar

### 1. Verifique os Logs no Vercel

1. Vercel Dashboard → **Deployments**
2. Clique no deployment mais recente
3. Vá em **Functions**
4. Clique em `api/claude-chat`
5. Veja os **Logs**

Procure por:
- `ANTHROPIC_API_KEY not configured` → Não está configurada
- `Authentication failed` → Chave inválida
- `401 Unauthorized` → Chave incorreta
- `Invalid API key` → Chave inválida

### 2. Teste a API Key Manualmente

Use curl para testar:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: SUA_CHAVE_AQUI" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Olá"}]
  }'
```

Se retornar erro 401, a chave está inválida.

### 3. Crie uma Nova API Key

Se a chave atual não funciona:
1. Na Anthropic Console
2. Revogue a chave antiga
3. Crie uma nova
4. Atualize no Vercel
5. Faça redeploy

## 💡 Dica Importante

**Sempre após modificar Environment Variables:**
1. ✅ Salvar no Vercel
2. ✅ Fazer redeploy
3. ✅ Aguardar deploy finalizar
4. ✅ Limpar cache do navegador
5. ✅ Testar novamente

---

**O erro de autenticação geralmente é resolvido atualizando a API Key e fazendo redeploy!** 🔄
