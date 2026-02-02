# 🛠️ Painel de Administração - Guia Completo

Painel de administração estilo WordPress para gerenciar o conteúdo do site sem precisar editar código!

## 🚀 Como Acessar

### Método 1: Atalho de Teclado (Recomendado)

1. **Acesse o site** (qualquer página)
2. **Pressione:** `Ctrl + Shift + K` (Windows/Linux) ou `Cmd + Shift + K` (Mac)
3. **Digite a senha:** `lucaslima2024`
4. **Pronto!** Você está no painel de administração

### Método 2: Pelo Menu

1. **Abra o menu** (clique no botão de menu ou navegação vertical)
2. **Role até o final** do menu
3. **Clique em "Admin"** (no canto inferior direito)
4. **Digite a senha:** `lucaslima2024`
5. **Pronto!** Você está no painel de administração

## 🔐 Segurança

**Senha padrão:** `lucaslima2024`

⚠️ **IMPORTANTE:** Em produção, altere a senha no código!

**Para alterar a senha:**
1. Abra `components/AdminPanel.tsx`
2. Encontre: `const ADMIN_PASSWORD = 'lucaslima2024';`
3. Altere para sua senha desejada
4. Faça commit e push

## 📋 Funcionalidades

### 1. Gerenciar Galeria

**Aba: Galeria**

- ✅ **Ver todas as fotos** da galeria
- ✅ **Adicionar nova foto:**
  - URL da foto principal
  - Título
  - Categoria
  - Fotos do álbum (múltiplas URLs)
- ✅ **Editar foto existente**
- ✅ **Excluir foto**
- ✅ **Visualizar preview** de cada foto

**Como adicionar:**
1. Clique em "Adicionar Foto"
2. Cole a URL da foto principal
3. Adicione título e categoria
4. (Opcional) Adicione URLs do álbum
5. Clique em "Adicionar"

### 2. Gerenciar Página Inicial

**Aba: Página Inicial**

- ✅ **Ver todas as fotos** do background
- ✅ **Adicionar foto** ao background
- ✅ **Remover foto** do background
- ✅ **Reordenar** (arrastar e soltar - em breve)

### 3. Traduções

**Aba: Traduções**

- 📝 Visualizar estrutura de traduções
- ⚠️ Edição direta requer modificar `translations.ts`
- 💡 Em breve: editor visual de traduções

### 4. Configurações

**Aba: Configurações**

- 📊 Ver estatísticas do site
- 💾 Exportar dados
- 📖 Instruções de uso

## 💾 Como Salvar Alterações

### Opção A: Publicar direto no site (recomendado)

1. Faça as alterações na **Galeria** ou **Página Inicial**
2. Clique em **"Publicar"** (botão verde no topo)
3. O painel envia os dados para o repositório no GitHub e o Vercel faz o deploy em 1–2 minutos
4. **Nada de baixar** `images.json` nem fazer commit manual

**Requisito:** configurar **uma vez** no Vercel:

1. **GitHub — token com permissão de escrita no repo:**
   - Acesse [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
   - **Tokens (classic)** → **Generate new token (classic)**
   - Marque a permissão **repo** (acesso completo a repositórios privados e push)
   - Gere e **copie** o token (ele só aparece uma vez)
   - O token precisa ser da **mesma conta** que é dona do repositório (`lucaslimaphotografia-boop/lucaslimafotografia.com`)
2. **Vercel:** no projeto → **Settings** → **Environment Variables** → adicione:
   - **Name:** `GITHUB_TOKEN`
   - **Value:** (cole o token do GitHub)
   - **Environment:** Production (e Preview se quiser)
3. **Vercel:** em **Settings** → **Environment Variables** → marque **"Automatically expose System Environment Variables"**
4. **Redeploy:** Deployments → ⋮ no último deploy → **Redeploy** (senão a variável não vale no servidor)

Se o **Publicar** falhar (ex.: "GITHUB_TOKEN is not set"), use a Opção B abaixo.

### Opção B: Baixar e atualizar manualmente

1. Edite as fotos na aba **Galeria**
2. Adicione/remova fotos da **Página Inicial**
3. Clique em **"Publicar"** — se a API não estiver configurada, o painel oferece **baixar** o `images.json`
4. **Substitua** o arquivo `images.json` no projeto pelo arquivo baixado
5. **Commit e push:**
   ```bash
   git add images.json
   git commit -m "Update images from admin panel"
   git push origin main
   ```
6. Aguarde o deploy no Vercel

## 🎨 Interface do Painel

### Layout

- **Header:** Barra superior com título e botões de ação
- **Tabs:** Navegação entre seções (Galeria, Página Inicial, Traduções, Configurações)
- **Conteúdo:** Área principal com formulários e listas

### Recursos Visuais

- ✅ Preview das imagens em tempo real
- ✅ Indicador de alterações não salvas
- ✅ Validação de formulários
- ✅ Confirmação antes de excluir
- ✅ Interface responsiva (funciona no mobile)

## 📸 Adicionar Múltiplas Fotos ao Álbum

Quando adicionar/editar uma foto:

1. **Adicione a URL principal** (foto que aparece na galeria)
2. **Clique em "+ Adicionar URL"** na seção "Fotos do Álbum"
3. **Cole cada URL** das fotos do álbum
4. **Adicione quantas quiser** (sem limite)
5. **Remova URLs** clicando no ícone de lixeira

## 🔄 Fluxo de Trabalho Recomendado

1. **Acesse o painel** (`Ctrl+Shift+A`)
2. **Faça as alterações** desejadas
3. **Salve** (baixa o `images.json`)
4. **Substitua** o arquivo no projeto
5. **Commit e push** para GitHub
6. **Aguarde deploy** no Vercel
7. **Verifique** no site

## 🆘 Problemas Comuns

### "Senha não funciona"

- Verifique se está digitando: `lucaslima2024`
- Limpe o cache do navegador
- Tente em modo anônimo

### "Alterações não aparecem" / "Não está fazendo alteração no Vercel"

1. **Veja o status no painel:** na seção **Galeria de Fotos** aparece um aviso verde (configurado) ou amarelo/vermelho (problema). Use isso para saber o que falta.

2. **Use o painel no site em produção:** acesse pelo domínio do Vercel (ex: `seu-site.vercel.app`), não em `localhost` — a API só existe no Vercel.

3. **GITHUB_TOKEN obrigatório:**
   - GitHub: [Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens) → Generate new token (classic) → marque **repo**.
   - Vercel: **Settings** → **Environment Variables** → **Add:** Name `GITHUB_TOKEN`, Value = token do GitHub, Environment **Production** (e Preview se quiser).
   - Depois: **Deployments** → ⋮ no último deploy → **Redeploy** (senão a variável não vale no servidor).

4. **Repositório correto:** em Vercel → **Settings** → **Environment Variables** → marque **"Automatically expose System Environment Variables"**. O painel mostra "Repositório: owner/repo" — esse repo tem que ser o **mesmo** do projeto no Vercel. Se for outro (ex: seu repo é `seu-usuario/portfólio-lucas-lima-site`), defina manualmente:
   - `GITHUB_REPO_OWNER` = seu usuário ou org no GitHub
   - `GITHUB_REPO_NAME` = nome exato do repositório

5. **Confirme o deploy:** após clicar em Publicar, em Vercel → **Deployments** deve aparecer um novo deploy em 1–2 min. Se não aparecer, o push foi para outro repo ou o token não tem permissão.

6. **Fallback:** se não conseguir configurar, use **Publicar** → quando der erro, o painel oferece **baixar** o `images.json`; substitua no projeto e faça `git add images.json && git commit -m "Update" && git push`.

### "Resource not accessible by personal access token"

O token do GitHub não tem permissão para escrever no repositório. Corrija assim:

1. **Token classic (recomendado):** em [GitHub → Personal access tokens](https://github.com/settings/tokens), crie um **token (classic)** com a permissão **repo** marcada (não use só "public_repo" se o repo for privado).
2. **Conta certa:** o token tem que ser da **conta que é dona do repo** (ex.: `lucaslimaphotografia-boop`). Se o repo for de outra conta/org, gere o token logado nessa conta.
3. **Token fine-grained:** se estiver usando token fine-grained, ele precisa de **Contents: Read and write** no repositório `lucaslimaphotografia-boop/lucaslimafotografia.com`.
4. **Atualize no Vercel:** Settings → Environment Variables → edite `GITHUB_TOKEN` e cole o novo token → salve.
5. **Redeploy:** Deployments → ⋮ → Redeploy para o servidor usar o token novo.

### "Arquivo não baixa ao salvar"

- Verifique se o navegador permite downloads
- Tente em outro navegador
- Verifique o console (F12) para erros

### "Fotos não aparecem no preview"

- Verifique se as URLs estão corretas
- Teste a URL diretamente no navegador
- Certifique-se de que o servidor permite acesso externo (CORS)

## 🔐 Segurança Avançada (Futuro)

Para produção, recomendo:

1. **Autenticação real** (JWT, OAuth)
2. **API backend** para salvar dados
3. **Validação de dados** no servidor
4. **Rate limiting** para evitar abuso
5. **Logs de auditoria** de alterações

## 📝 Notas Técnicas

- Os dados são salvos em `localStorage` como backup
- O arquivo `images.json` é gerado dinamicamente
- As alterações são locais até você fazer commit
- O painel funciona 100% no frontend (sem backend necessário)

## 🎯 Próximas Melhorias (Roadmap)

- [ ] Editor visual de traduções
- [ ] Upload direto de imagens (sem precisar URLs)
- [ ] Reordenar fotos por drag & drop
- [ ] Preview em tempo real das mudanças
- [ ] Histórico de alterações
- [ ] Backup automático
- [ ] Autenticação mais segura
- [ ] API backend para salvar automaticamente

---

**Pronto para usar!** Pressione `Ctrl+Shift+K` (ou `Cmd+Shift+K` no Mac) no site para acessar, ou use o botão "Admin" no menu! 🚀
