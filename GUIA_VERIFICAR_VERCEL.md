# 🔍 Guia Completo: Verificar e Configurar Vercel

## 📋 Passo a Passo para Verificar o Vercel

### 1️⃣ Acessar o Dashboard do Vercel

1. **Acesse:** https://vercel.com
2. **Faça login** com sua conta (GitHub, GitLab, ou email)
3. **Vá para o Dashboard:** https://vercel.com/dashboard

### 2️⃣ Verificar se o Projeto Existe

**Procure por:**
- `lucaslimafotografia.com`
- `portfólio-lucas-lima-site`
- Ou qualquer projeto relacionado

**Se NÃO encontrar o projeto:**
→ Vá para a seção "**Configurar Novo Projeto**" abaixo

**Se ENCONTRAR o projeto:**
→ Continue na seção "**Verificar Deploy Atual**"

---

## 🆕 Configurar Novo Projeto no Vercel

### Passo 1: Adicionar Novo Projeto

1. No Dashboard, clique em **"Add New Project"** ou **"New Project"**
2. Você verá uma lista de repositórios do GitHub

### Passo 2: Conectar Repositório

1. **Procure por:** `lucaslimaphotografia-boop/lucaslimafotografia.com`
2. Se não aparecer:
   - Clique em **"Adjust GitHub App Permissions"**
   - Autorize o acesso ao repositório
   - Atualize a página

### Passo 3: Configurar o Projeto

Quando o repositório aparecer, clique nele e configure:

**Framework Preset:**
- Selecione: **Vite** (ou deixe "Other" se não tiver Vite)

**Root Directory:**
- Deixe em branco (raiz do projeto)

**Build and Output Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install` (ou deixe padrão)

**Environment Variables:**
- Por enquanto, deixe vazio
- (Você pode adicionar `ANTHROPIC_API_KEY` depois se quiser usar o chat)

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (1-3 minutos)
3. Quando terminar, você verá a URL do site!

---

## ✅ Verificar Deploy Atual (Se Projeto Já Existe)

### Passo 1: Acessar o Projeto

1. No Dashboard, clique no projeto `lucaslimafotografia.com`
2. Você verá a página do projeto com todos os deploys

### Passo 2: Verificar Último Deploy

**Procure por:**
- ✅ Status: **"Ready"** (verde) = Sucesso
- ⏳ Status: **"Building"** = Ainda processando
- ❌ Status: **"Error"** = Falhou (veja logs)

**Verifique a data/hora:**
- Deve ser recente (após o push que fizemos)
- Se for antigo, precisa fazer novo deploy

### Passo 3: Verificar Logs (Se Houver Erro)

1. Clique no deploy com erro
2. Vá na aba **"Logs"**
3. Procure por erros relacionados a:
   - `images.json`
   - `build`
   - `npm install`

### Passo 4: Forçar Novo Deploy (Se Necessário)

**Opção A: Redeploy do Último**
1. Clique nos **3 pontos (...)** do último deploy
2. Selecione **"Redeploy"**
3. Aguarde o build

**Opção B: Deploy Manual**
1. No topo da página do projeto
2. Clique em **"Deployments"** → **"Create Deployment"**
3. Selecione a branch `main`
4. Clique em **"Deploy"**

---

## 🔧 Verificar Configurações do Projeto

### 1. Settings → General

**Verifique:**
- ✅ Framework: Vite (ou detectado automaticamente)
- ✅ Root Directory: `.` (raiz)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

### 2. Settings → Git

**Verifique:**
- ✅ Repositório conectado: `lucaslimaphotografia-boop/lucaslimafotografia.com`
- ✅ Branch de produção: `main`
- ✅ Auto-deploy: Habilitado (recomendado)

### 3. Settings → Environment Variables

**Se quiser usar o Claude Chat depois:**
- Adicione: `ANTHROPIC_API_KEY` = sua chave da API

---

## 🌐 Verificar o Site Deployado

### 1. Acessar a URL

1. No Dashboard do projeto, você verá a URL
2. Geralmente: `https://lucaslimafotografia.com.vercel.app`
3. Ou um domínio customizado se configurado

### 2. Testar o Site

1. **Acesse a URL** no navegador
2. **Limpe o cache:**
   - `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
   - Ou use modo anônimo: `Ctrl+Shift+N`

3. **Teste a galeria:**
   - Vá em **Portfólio**
   - Procure por **"Carol & Ricardo"**
   - Ou filtre por **"Festa"**

### 3. Verificar Console do Navegador

1. Pressione `F12` (DevTools)
2. Vá na aba **Console**
3. Procure por erros

4. Vá na aba **Network**
5. Filtre por `images.json`
6. Verifique se o arquivo está sendo carregado (status 200)

---

## 🐛 Problemas Comuns e Soluções

### ❌ "Projeto não encontrado no Vercel"

**Solução:**
- Configure um novo projeto (veja seção acima)
- Ou verifique se está logado na conta correta

### ❌ "Build falhou"

**Possíveis causas:**
- Dependências não instaladas
- Erro de TypeScript
- Erro no JSON

**Solução:**
1. Veja os logs do build
2. Verifique se `npm install` funciona localmente
3. Verifique se `npm run build` funciona localmente
4. Corrija os erros e faça novo commit

### ❌ "Site não atualiza após deploy"

**Solução:**
1. Limpe o cache do navegador
2. Use modo anônimo
3. Aguarde alguns minutos (CDN pode ter cache)
4. Force um hard refresh: `Ctrl+F5` ou `Cmd+Shift+R`

### ❌ "images.json não carrega (404)"

**Solução:**
1. Verifique se o arquivo está no GitHub
2. Verifique se não está no `.gitignore`
3. Force um novo deploy
4. Verifique os logs do build

---

## 📊 Checklist de Verificação

Use este checklist para garantir que tudo está funcionando:

### GitHub
- [ ] Código está no repositório
- [ ] `images.json` está commitado
- [ ] Último commit inclui as mudanças

### Vercel
- [ ] Projeto existe no Vercel
- [ ] Repositório está conectado
- [ ] Último deploy foi bem-sucedido
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Site
- [ ] Site está acessível
- [ ] Não há erros no console
- [ ] `images.json` carrega (Network tab)
- [ ] Fotos aparecem na galeria
- [ ] "Carol & Ricardo" aparece no portfólio

---

## 🚀 Comandos Úteis (CLI do Vercel)

Se você tiver a CLI do Vercel instalada:

```bash
# Instalar CLI (se não tiver)
npm i -g vercel

# Login
vercel login

# Verificar status
vercel ls

# Ver logs do último deploy
vercel logs

# Fazer deploy manual
vercel --prod
```

---

## 📞 Próximos Passos

1. **Acesse o Vercel** e verifique o status
2. **Se não tiver projeto:** Configure um novo
3. **Se tiver projeto:** Verifique o último deploy
4. **Teste o site** após o deploy
5. **Me informe** o que encontrou!

---

**Precisa de ajuda?** Me diga:
- O que você vê no Dashboard do Vercel?
- Há algum erro nos logs?
- O site está acessível mas as fotos não aparecem?

Posso ajudar a resolver! 🔧
