# 📥 Como Baixar Fotos do Site Antigo Automaticamente

Guia rápido para baixar todas as fotos do seu site antigo automaticamente.

## 🚀 Método Rápido (Recomendado)

### Passo 1: Execute o script

```bash
node scripts/download-images.js <URL_DO_SEU_SITE_ANTIGO>
```

**Exemplo:**
```bash
node scripts/download-images.js https://lucaslimafotografia.com/galeria
```

### Passo 2: Aguarde o download

O script vai:
- ✅ Acessar o site
- ✅ Encontrar todas as imagens
- ✅ Baixar para a pasta `downloads/`
- ✅ Criar um arquivo JSON com todas as informações

### Passo 3: Revise as fotos

As fotos estarão em: `downloads/`

## 📋 Opções Avançadas

### Baixar para pasta específica

```bash
node scripts/download-images.js https://site.com/galeria --output ./minhas-fotos
```

### Limitar número de fotos

```bash
node scripts/download-images.js https://site.com/galeria --max 50
```

### Filtrar por padrão

```bash
node scripts/download-images.js https://site.com --filter "gallery|photo"
```

## 🎯 Para Sites com JavaScript (React, Vue, etc)

Se o site antigo usa JavaScript para carregar imagens:

### 1. Instale Puppeteer

```bash
npm install puppeteer
```

### 2. Use o script avançado

```bash
node scripts/download-with-puppeteer.js https://site.com/galeria
```

## 📁 Onde Ficam as Fotos?

Todas as fotos baixadas ficam em:
```
downloads/
├── foto-001.jpg
├── foto-002.jpg
├── foto-003.jpg
└── images-metadata.json  ← Lista com todas as URLs
```

## 💡 Exemplos Práticos

### Exemplo 1: Baixar uma galeria específica

```bash
node scripts/download-images.js https://site.com/casamento-villa-balbiano --output ./casamentos/villa-balbiano
```

### Exemplo 2: Baixar múltiplas galerias

```bash
# Galeria 1
node scripts/download-images.js https://site.com/galeria1 --output ./galeria1

# Galeria 2
node scripts/download-images.js https://site.com/galeria2 --output ./galeria2

# Galeria 3
node scripts/download-images.js https://site.com/galeria3 --output ./galeria3
```

### Exemplo 3: Baixar apenas primeiras 20 fotos (teste)

```bash
node scripts/download-images.js https://site.com/galeria --max 20
```

## 🔧 Solução de Problemas

### ❌ "Nenhuma imagem encontrada"

**Causa:** Site usa JavaScript para carregar imagens

**Solução:**
```bash
npm install puppeteer
node scripts/download-with-puppeteer.js <URL>
```

### ❌ "Erro ao acessar a página"

**Causa:** URL incorreta ou site bloqueia acesso

**Solução:**
- Verifique se a URL está correta
- Teste a URL no navegador primeiro
- Alguns sites bloqueiam acesso programático

### ❌ "Algumas fotos não baixaram"

**Causa:** URLs quebradas ou acesso bloqueado

**Solução:**
- Verifique o arquivo `images-metadata.json`
- Veja quais fotos falharam
- Tente baixar manualmente as que falharam

## 📤 Depois de Baixar

1. **Revise as fotos** na pasta `downloads/`
2. **Organize por projeto** se necessário
3. **Faça upload** para Cloudinary ou Google Drive
4. **Atualize o `images.json`** com as novas URLs

## 🆘 Alternativa: Extensão do Navegador

Se os scripts não funcionarem, use uma extensão:

### Chrome/Edge:
- "Image Downloader" 
- "Download All Images"

### Firefox:
- "Download All Images"

**Como usar:**
1. Instale a extensão
2. Acesse a página com as fotos
3. Clique na extensão
4. Selecione as fotos que quer baixar
5. Baixe todas de uma vez

## 📝 Arquivo de Metadados

O script cria um arquivo `images-metadata.json` com:

```json
{
  "sourceUrl": "https://site-antigo.com/galeria",
  "downloadDate": "2024-01-15T10:30:00.000Z",
  "totalFound": 45,
  "totalDownloaded": 43,
  "images": [
    {
      "url": "https://site.com/foto1.jpg",
      "filename": "foto1.jpg",
      "localPath": "/caminho/downloads/foto1.jpg"
    }
  ]
}
```

Use este arquivo como referência ao atualizar o `images.json`!

---

**Precisa de ajuda?** Veja o arquivo `scripts/README.md` para mais detalhes técnicos.
