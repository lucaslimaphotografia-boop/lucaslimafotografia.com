# 🚀 Guia de Deploy

## Enviar código para o GitHub

O repositório Git já está configurado. Para enviar o código para o GitHub, você precisa autenticar-se.

### Opção 1: Usando HTTPS (Recomendado para iniciantes)

1. **Configure suas credenciais Git (se ainda não fez):**
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu-email@exemplo.com"
   ```

2. **Faça o push:**
   ```bash
   git push -u origin main
   ```

   Quando solicitado, use:
   - **Username**: seu usuário do GitHub
   - **Password**: use um Personal Access Token (não sua senha normal)
   
   Para criar um token: https://github.com/settings/tokens

### Opção 2: Usando SSH (Mais seguro)

1. **Gere uma chave SSH (se ainda não tem):**
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
   ```

2. **Adicione a chave ao GitHub:**
   - Copie o conteúdo de `~/.ssh/id_ed25519.pub`
   - Vá em GitHub → Settings → SSH and GPG keys → New SSH key
   - Cole a chave e salve

3. **Altere o remote para SSH:**
   ```bash
   git remote set-url origin git@github.com:lucaslimaphotografia-boop/lucaslimafotografia.com.git
   ```

4. **Faça o push:**
   ```bash
   git push -u origin main
   ```

## 📦 Deploy na Vercel (Recomendado)

A Vercel é a forma mais fácil de fazer deploy de sites React/Vite.

### Passo a passo:

1. **Instale a Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure variáveis de ambiente:**
   - Acesse o dashboard da Vercel
   - Vá em Settings → Environment Variables
   - Adicione `ANTHROPIC_API_KEY` com sua chave

5. **Crie a API route:**
   - Crie o arquivo `api/claude-chat.js` baseado em `api/claude-chat.example.js`
   - A Vercel detectará automaticamente e criará a função serverless

### Ou conecte diretamente ao GitHub:

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure o projeto:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Adicione as variáveis de ambiente
5. Deploy!

## 🌐 Deploy no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Adicione variáveis de ambiente
5. Crie `netlify/functions/claude-chat.js` baseado no exemplo

## 📝 Status Atual

✅ Repositório Git inicializado
✅ Remote configurado: `https://github.com/lucaslimaphotografia-boop/lucaslimafotografia.com.git`
✅ Commits locais criados
⏳ Aguardando push para GitHub (requer autenticação)

## 🔗 Links Úteis

- [GitHub Repository](https://github.com/lucaslimaphotografia-boop/lucaslimafotografia.com.git)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Anthropic Console](https://console.anthropic.com)
