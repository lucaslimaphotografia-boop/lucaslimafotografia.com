# 📥 Scripts de Download de Imagens

Scripts para baixar automaticamente imagens do seu site antigo.

## 🚀 Script Básico (Sem dependências extras)

**Arquivo:** `download-images.js`

Funciona para sites estáticos ou com HTML simples.

### Uso:

```bash
node scripts/download-images.js <URL_DO_SITE>
```

### Opções:

```bash
# Especificar pasta de destino
node scripts/download-images.js https://site-antigo.com --output ./minhas-fotos

# Limitar número de imagens
node scripts/download-images.js https://site-antigo.com --max 50

# Filtrar URLs por padrão
node scripts/download-images.js https://site-antigo.com --filter "gallery|photo"
```

### Exemplos:

```bash
# Download básico
node scripts/download-images.js https://lucaslimafotografia.com/galeria

# Download com opções
node scripts/download-images.js https://lucaslimafotografia.com/galeria --max 200 --output ./fotos-baixadas
```

## 🎯 Script Avançado (Com Puppeteer)

**Arquivo:** `download-with-puppeteer.js`

Melhor para sites com JavaScript dinâmico, lazy loading, ou SPAs.

### Instalação:

```bash
npm install puppeteer
```

### Uso:

```bash
node scripts/download-with-puppeteer.js <URL_DO_SITE>
```

## 📋 Como Funciona

1. **Acessa a URL** do site antigo
2. **Extrai todas as URLs** de imagens encontradas
3. **Baixa cada imagem** para a pasta `downloads/`
4. **Gera um arquivo JSON** (`images-metadata.json`) com todas as informações

## 📁 Estrutura de Saída

```
downloads/
├── image-001.jpg
├── image-002.jpg
├── image-003.jpg
└── images-metadata.json  ← Arquivo com todas as URLs e metadados
```

## 🔧 Tipos de Sites Suportados

### ✅ Funciona bem com:
- Sites estáticos HTML
- Galerias simples
- Sites WordPress básicos
- Sites com imagens em tags `<img>`

### ⚠️ Pode precisar do Puppeteer para:
- Sites React/Vue/Angular (SPAs)
- Sites com lazy loading
- Sites que carregam imagens via JavaScript
- Sites com infinite scroll

## 💡 Dicas

### 1. Teste primeiro com poucas imagens

```bash
node scripts/download-images.js https://site.com --max 10
```

### 2. Se não encontrar imagens, use Puppeteer

```bash
npm install puppeteer
node scripts/download-with-puppeteer.js https://site.com
```

### 3. Para sites com múltiplas páginas

Você pode executar o script várias vezes com URLs diferentes:

```bash
node scripts/download-images.js https://site.com/galeria1 --output ./galeria1
node scripts/download-images.js https://site.com/galeria2 --output ./galeria2
```

### 4. Organize por projeto

```bash
# Casamento 1
node scripts/download-images.js https://site.com/casamento-1 --output ./casamentos/casamento-1

# Casamento 2
node scripts/download-images.js https://site.com/casamento-2 --output ./casamentos/casamento-2
```

## 🐛 Solução de Problemas

### "Nenhuma imagem encontrada"

**Possíveis causas:**
- Site usa JavaScript para carregar imagens → Use Puppeteer
- Site bloqueia acesso programático → Tente com Puppeteer ou use extensão do navegador
- URLs relativas → O script tenta converter, mas pode falhar em alguns casos

**Solução:**
```bash
npm install puppeteer
node scripts/download-with-puppeteer.js <URL>
```

### "Erro ao baixar imagem"

**Possíveis causas:**
- URL inválida ou quebrada
- Site bloqueia downloads
- Problema de rede

**Solução:**
- Verifique se a URL está acessível no navegador
- Tente baixar manualmente algumas imagens primeiro
- Verifique o arquivo `images-metadata.json` para ver quais falharam

### Site requer autenticação

Se o site antigo requer login:

1. Use Puppeteer com autenticação:
```javascript
// Edite o script para adicionar:
await page.type('#username', 'seu-usuario');
await page.type('#password', 'sua-senha');
await page.click('#login-button');
await page.waitForNavigation();
```

2. Ou use uma extensão do navegador como "Image Downloader"

## 📤 Próximos Passos

Depois de baixar as imagens:

1. **Revise as imagens** na pasta `downloads/`
2. **Organize por projeto** se necessário
3. **Faça upload** para Cloudinary ou outro serviço
4. **Use o `images-metadata.json`** como referência
5. **Atualize o `images.json`** com as novas URLs

## 🔄 Alternativa: Extensão do Navegador

Se os scripts não funcionarem, você pode usar extensões do navegador:

- **Chrome/Edge**: "Image Downloader" ou "Download All Images"
- **Firefox**: "Download All Images"

Essas extensões funcionam bem para sites complexos.

## 📝 Exemplo de Output

O arquivo `images-metadata.json` terá esta estrutura:

```json
{
  "sourceUrl": "https://site-antigo.com/galeria",
  "downloadDate": "2024-01-15T10:30:00.000Z",
  "totalFound": 45,
  "totalDownloaded": 43,
  "totalErrors": 2,
  "images": [
    {
      "url": "https://site.com/foto1.jpg",
      "filename": "foto1.jpg",
      "localPath": "/caminho/downloads/foto1.jpg"
    }
  ]
}
```

---

**Precisa de ajuda?** Verifique os logs do script para mais detalhes sobre erros específicos.
