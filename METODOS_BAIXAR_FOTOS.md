# 📥 Métodos para Baixar Fotos de lucaslimafotografia.com

Vários métodos para baixar as fotos do seu site antigo. Escolha o que for mais fácil para você!

## 🎯 Método 1: Extensão do Navegador (MAIS FÁCIL - Recomendado)

**Não precisa instalar nada, funciona direto no navegador!**

### Chrome/Edge:

1. **Instale a extensão:**
   - Vá em: [Chrome Web Store - Image Downloader](https://chrome.google.com/webstore/detail/image-downloader/cnpniohnfphhjihaiwgeffpehapekccj)
   - Ou procure por "Download All Images" na Chrome Web Store
   - Clique em "Adicionar ao Chrome"

2. **Use a extensão:**
   - Acesse https://lucaslimafotografia.com
   - Navegue até as galerias que quer baixar
   - Clique no ícone da extensão na barra de ferramentas
   - Selecione todas as imagens que quer baixar
   - Clique em "Download" ou "Baixar"

3. **Organize as fotos:**
   - As fotos vão para a pasta de Downloads
   - Organize por projeto em pastas separadas

### Firefox:

1. Instale: [Download All Images](https://addons.mozilla.org/firefox/addon/download-all-images/)
2. Acesse o site
3. Use a extensão para baixar

**Vantagens:**
- ✅ Não precisa instalar Node.js
- ✅ Funciona com qualquer site
- ✅ Interface visual fácil
- ✅ Pode filtrar por tamanho/tipo

---

## 🚀 Método 2: Script Automático (Mais Rápido)

**Requer instalar Node.js primeiro**

### Passo 1: Instalar Node.js

**macOS:**
```bash
# Com Homebrew (se tiver)
brew install node

# Ou baixe o instalador
# https://nodejs.org/en/download/
```

**Windows:**
- Baixe em: https://nodejs.org/en/download/
- Execute o instalador
- Reinicie o terminal

### Passo 2: Executar o script

```bash
# Teste com poucas fotos primeiro
node scripts/download-images.js https://lucaslimafotografia.com --max 10

# Se funcionar, baixe todas
node scripts/download-images.js https://lucaslimafotografia.com

# Ou baixe para pasta específica
node scripts/download-images.js https://lucaslimafotografia.com --output ./fotos-antigas
```

**Vantagens:**
- ✅ Automático
- ✅ Baixa todas de uma vez
- ✅ Cria arquivo JSON com metadados
- ✅ Pode baixar de múltiplas páginas

---

## 🌐 Método 3: Ferramentas Online

### Option 1: Website Image Downloader

1. Acesse: https://www.websiteimagedownloader.com/
2. Cole a URL: `https://lucaslimafotografia.com`
3. Clique em "Download Images"
4. Baixe o ZIP com todas as imagens

### Option 2: Image Downloader Online

1. Acesse: https://www.bulkimagedownloader.com/
2. Cole a URL do site
3. Configure filtros se necessário
4. Baixe todas as imagens

**Vantagens:**
- ✅ Não precisa instalar nada
- ✅ Funciona direto no navegador
- ✅ Rápido e fácil

---

## 📋 Método 4: Download Manual Organizado

Se preferir fazer manualmente com mais controle:

### Passo 1: Acesse cada galeria

1. Vá em https://lucaslimafotografia.com
2. Navegue pelo menu e encontre todas as galerias
3. Anote as URLs de cada galeria/projeto

### Passo 2: Baixe as fotos

**Opção A: Clique direito**
- Clique com botão direito em cada foto
- "Salvar imagem como..."
- Organize em pastas por projeto

**Opção B: Arraste e solte**
- Abra a pasta onde quer salvar
- Arraste as fotos do navegador para a pasta
- (Funciona no Chrome/Edge)

**Opção C: Inspetor do navegador**
1. Pressione F12 (ou Cmd+Option+I no Mac)
2. Vá na aba "Network"
3. Filtre por "Img"
4. Recarregue a página
5. Clique com botão direito nas imagens → "Open in new tab"
6. Salve cada uma

**Vantagens:**
- ✅ Controle total
- ✅ Escolhe exatamente quais baixar
- ✅ Organiza como quiser

---

## 🎨 Método 5: wget ou curl (Terminal)

Se você tem experiência com terminal:

### macOS/Linux:

```bash
# Instalar wget (se não tiver)
brew install wget  # macOS
# ou
sudo apt-get install wget  # Linux

# Baixar todas as imagens
wget -r -l 1 -H -t 1 -nd -N -np -A.jpg,.jpeg,.png,.gif -erobots=off https://lucaslimafotografia.com
```

### Windows:

```powershell
# Usar PowerShell ou instalar wget
# Baixar imagens de uma página específica
```

---

## 📊 Comparação dos Métodos

| Método | Facilidade | Velocidade | Requer Instalação | Recomendado Para |
|--------|------------|------------|-------------------|------------------|
| Extensão Navegador | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ Não | **Iniciantes** |
| Script Node.js | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ Sim | Quem tem Node.js |
| Ferramenta Online | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ Não | Teste rápido |
| Manual | ⭐⭐ | ⭐⭐ | ❌ Não | Poucas fotos |
| Terminal | ⭐ | ⭐⭐⭐⭐ | ⚠️ Depende | Avançados |

## 💡 Recomendação

**Para você, recomendo:**

1. **Primeiro:** Tente a **Extensão do Navegador** (Método 1)
   - Mais fácil
   - Não precisa instalar nada
   - Funciona imediatamente

2. **Se precisar automatizar:** Instale Node.js e use o **Script** (Método 2)
   - Mais rápido para muitas fotos
   - Automatiza tudo

## 📤 Depois de Baixar

Independente do método usado:

1. **Organize as fotos** por projeto em pastas
2. **Revise a qualidade** das imagens
3. **Faça upload** para Cloudinary ou Google Drive
4. **Atualize o `images.json`** com as novas URLs

## 🆘 Precisa de Ajuda?

- **Extensão não funciona?** Tente outra extensão ou método
- **Script dá erro?** Verifique se Node.js está instalado corretamente
- **Site bloqueia download?** Use a extensão do navegador

---

**Qual método você quer tentar primeiro?** Recomendo começar com a extensão do navegador! 🚀
