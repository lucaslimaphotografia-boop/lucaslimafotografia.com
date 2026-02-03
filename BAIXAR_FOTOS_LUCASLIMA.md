# 📥 Baixar Fotos de lucaslimafotografia.com

Guia específico para baixar as fotos do seu site antigo.

## 🚀 Opção 1: Usando o Script (Requer Node.js)

### Passo 1: Verificar se tem Node.js

```bash
node --version
```

Se não tiver, instale:
- **macOS**: `brew install node` ou baixe em [nodejs.org](https://nodejs.org)
- **Windows**: Baixe o instalador em [nodejs.org](https://nodejs.org)

### Passo 2: Executar o script

```bash
# Versão básica (teste com poucas fotos primeiro)
node scripts/download-images.js https://lucaslimafotografia.com --max 20

# Se funcionar, baixe todas
node scripts/download-images.js https://lucaslimafotografia.com

# Ou baixe para pasta específica
node scripts/download-images.js https://lucaslimafotografia.com --output ./fotos-site-antigo
```

### Passo 3: Se o site usar JavaScript

```bash
# Instale Puppeteer
npm install puppeteer

# Execute a versão avançada
node scripts/download-with-puppeteer.js https://lucaslimafotografia.com
```

## 🎯 Opção 2: Extensão do Navegador (Mais Fácil)

Se não quiser instalar Node.js, use uma extensão:

### Chrome/Edge:

1. **Instale a extensão:**
   - "Image Downloader" ou
   - "Download All Images"

2. **Acesse o site:**
   - Vá em https://lucaslimafotografia.com
   - Navegue até as galerias

3. **Baixe as fotos:**
   - Clique na extensão
   - Selecione todas as imagens
   - Baixe

### Firefox:

1. Instale "Download All Images"
2. Acesse o site
3. Use a extensão para baixar

## 📋 Opção 3: Download Manual Organizado

Se preferir fazer manualmente:

1. **Acesse cada galeria** no site antigo
2. **Use o navegador** para baixar:
   - Clique com botão direito → "Salvar imagem como..."
   - Ou arraste as imagens para uma pasta
3. **Organize por projeto** em pastas separadas

## 🔍 Verificar Estrutura do Site Antigo

Antes de baixar, é útil entender a estrutura:

### Possíveis URLs de galerias:

```
https://lucaslimafotografia.com/galeria
https://lucaslimafotografia.com/portfolio
https://lucaslimafotografia.com/casamentos
https://lucaslimafotografia.com/gallery
```

### Para encontrar todas as galerias:

1. Acesse o site no navegador
2. Navegue pelo menu
3. Anote todas as URLs de galerias/projetos
4. Execute o script para cada uma:

```bash
# Galeria 1
node scripts/download-images.js https://lucaslimafotografia.com/galeria1 --output ./galeria1

# Galeria 2
node scripts/download-images.js https://lucaslimafotografia.com/galeria2 --output ./galeria2
```

## 💡 Dicas Específicas

### Se o site tem múltiplas páginas:

```bash
# Página 1
node scripts/download-images.js https://lucaslimafotografia.com/galeria?page=1 --output ./pagina1

# Página 2
node scripts/download-images.js https://lucaslimafotografia.com/galeria?page=2 --output ./pagina2
```

### Se o site tem projetos individuais:

```bash
# Projeto 1
node scripts/download-images.js https://lucaslimafotografia.com/projeto/villa-balbiano --output ./projetos/villa-balbiano

# Projeto 2
node scripts/download-images.js https://lucaslimafotografia.com/projeto/casamento-paris --output ./projetos/casamento-paris
```

## 📤 Depois de Baixar

1. **Revise as fotos** na pasta `downloads/`
2. **Organize por projeto** se necessário
3. **Faça upload** para Cloudinary:
   - Acesse [cloudinary.com](https://cloudinary.com)
   - Faça upload em lote
   - Copie as URLs geradas
4. **Atualize o `images.json`** com as novas URLs

## 🆘 Precisa de Ajuda?

Se tiver problemas:

1. **Teste a URL no navegador** primeiro
2. **Verifique se o site está acessível**
3. **Tente com `--max 5`** para testar com poucas fotos
4. **Use Puppeteer** se o site usar JavaScript

---

**Pronto para começar?** Execute o comando acima ou use uma extensão do navegador!
