# 📸 Como Obter URLs do Cloudinary Collection

Guia para extrair URLs individuais das fotos de uma Collection do Cloudinary.

## 🎯 Método 1: Via Interface do Cloudinary (Mais Fácil)

### Passo 1: Acesse a Collection

1. Acesse: https://collection.cloudinary.com/di6xabxne/6797bc56ce9cc00f6b87519c80902afd
2. Você verá todas as fotos da collection

### Passo 2: Obter URLs Individuais

**Opção A: Uma por uma**
1. Clique em cada foto
2. No painel direito, copie a URL
3. Ou clique com botão direito → "Copiar endereço da imagem"

**Opção B: Em lote (mais rápido)**
1. Na collection, selecione múltiplas fotos (Ctrl/Cmd + Clique)
2. Clique em "..." → "Copy URL" ou "Copiar URL"
3. Cole em um editor de texto
4. Organize as URLs

### Passo 3: Formato da URL

As URLs do Cloudinary geralmente têm este formato:

```
https://res.cloudinary.com/di6xabxne/image/upload/v1234567890/nome-da-foto.jpg
```

**Para otimização automática, você pode adicionar parâmetros:**

```
https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/nome-da-foto.jpg
```

Parâmetros úteis:
- `w_1200` - largura 1200px
- `q_auto` - qualidade automática
- `f_auto` - formato automático (WebP quando suportado)

## 🚀 Método 2: Via API do Cloudinary (Avançado)

Se você tem acesso à API do Cloudinary:

```javascript
// Exemplo de como listar todas as imagens de uma collection
const cloudinary = require('cloudinary').v2;

cloudinary.api.resources_by_asset_folder('nome-da-pasta', {
  max_results: 500
}, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    result.resources.forEach(image => {
      console.log(image.secure_url);
    });
  }
});
```

## 💡 Método 3: Script Automático

Criei um script para você extrair todas as URLs automaticamente. Veja em `scripts/extract-cloudinary-urls.js`

## 📝 Exemplo de URLs para o images.json

Depois de obter as URLs, adicione assim no `images.json`:

```json
{
  "id": 13,
  "url": "https://res.cloudinary.com/di6xabxne/image/upload/w_800,q_auto,f_auto/v1234567890/carol-ricardo-001.jpg",
  "category": "Festa",
  "title": "Carol & Ricardo",
  "album": [
    "https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/carol-ricardo-001.jpg",
    "https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/carol-ricardo-002.jpg",
    "https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/carol-ricardo-003.jpg"
  ]
}
```

## 🎨 Dica: URLs Otimizadas

Para melhor performance, use URLs com transformações:

**Thumbnail (galeria):**
```
https://res.cloudinary.com/di6xabxne/image/upload/w_400,h_600,c_fill,q_auto,f_auto/v1234567890/foto.jpg
```

**Média (página de detalhes):**
```
https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/foto.jpg
```

**Fullscreen:**
```
https://res.cloudinary.com/di6xabxne/image/upload/w_2000,q_auto,f_auto/v1234567890/foto.jpg
```

---

**Precisa de ajuda?** Se tiver muitas fotos, posso criar um script para extrair todas automaticamente!
