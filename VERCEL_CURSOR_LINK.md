# Como Cursor e Vercel ficam “linkados”

Cursor e Vercel **não se conectam direto**. O vínculo é assim:

```
Cursor (onde você edita)  →  Git push  →  GitHub (repositório)  →  Vercel (deploy)
```

Ou seja: você edita no **Cursor**, envia as mudanças para o **GitHub** com Git, e o **Vercel** precisa estar conectado a esse **mesmo repositório** no GitHub para fazer o deploy.

---

## Seu projeto hoje

- **Repositório no GitHub:** `lucaslimaphotografia-boop/lucaslimafotografia.com`
- **Remote no Cursor:** `origin` → esse mesmo repo
- **Branch:** `main`

Ou seja: **Cursor já está “linkado” ao GitHub** (o remote está certo). O que pode estar faltando é o **Vercel** estar ligado a esse mesmo repo.

---

## 1. Conferir se o Vercel está ligado ao repo certo

1. Acesse [vercel.com](https://vercel.com) e entre na sua conta.
2. Abra o **projeto** do site (Lucas Lima Fotografia).
3. Vá em **Settings** (Configurações).
4. Na lateral, clique em **Git**.
5. Veja qual repositório está conectado. Tem que ser:
   - **GitHub** → **lucaslimaphotografia-boop** / **lucaslimafotografia.com**

Se estiver outro repositório (ou outro owner), o Vercel não vai usar o código que você edita no Cursor nesse projeto. Aí você precisa:

- **Conectar o repo certo:** em **Settings → Git**, desconectar o repo atual e **Connect Git Repository** de novo, escolhendo **lucaslimaphotografia-boop/lucaslimafotografia.com**.

---

## 2. Mandar as alterações do Cursor para o GitHub (e daí pro Vercel)

Tudo que você altera no Cursor só aparece no Vercel depois de:

1. **Commit** (registrar as mudanças no Git).
2. **Push** (enviar para o GitHub).

No terminal (na pasta do projeto, no Cursor ou em qualquer terminal):

```bash
# Ver o que mudou
git status

# Incluir os arquivos que quiser (ex.: tudo que mudou)
git add api/save-images.ts components/AdminPanel.tsx GUIA_PAINEL_ADMIN.md
# ou, para incluir tudo:
# git add .

# Registrar o commit
git commit -m "Atualizar painel e API de publicação"

# Enviar para o GitHub (branch main)
git push origin main
```

Depois do `git push`, o **Vercel** (se estiver conectado ao repo **lucaslimaphotografia-boop/lucaslimafotografia.com**) vai fazer um novo deploy sozinho em alguns minutos.

---

## 3. Resumo: “linkar” Cursor e Vercel

| Onde | O que fazer |
|------|-------------|
| **Vercel** | Settings → Git → Repositório conectado = **lucaslimaphotografia-boop/lucaslimafotografia.com** |
| **Cursor** | Depois de editar: `git add .` → `git commit -m "..."` → `git push origin main` |

Não existe “conectar Cursor ao Vercel” na Vercel. O que conecta é: **mesmo repositório no GitHub** usado no Cursor (via `origin`) e no projeto do Vercel (via Git em Settings).

---

## 4. Se o projeto do Vercel for outro repositório

Se no Vercel estiver, por exemplo, **seu-usuario/portfólio-lucas-lima-site** (outro nome ou outro dono), você tem duas opções:

**A) Trocar o remote no Cursor para esse repo**  
Assim o Cursor passa a enviar para o mesmo repo que o Vercel usa:

```bash
git remote set-url origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
# Depois: git push -u origin main
```

**B) Trocar no Vercel**  
Em Settings → Git, desconectar o repo atual e conectar **lucaslimaphotografia-boop/lucaslimafotografia.com** (o repo que o Cursor já usa).

Depois disso, Cursor (Git push) e Vercel (deploy) ficam “linkados” pelo mesmo repositório no GitHub.
