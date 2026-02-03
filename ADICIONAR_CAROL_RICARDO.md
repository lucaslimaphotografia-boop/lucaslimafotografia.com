# 💒 Adicionar Casamento Carol & Ricardo

Guia rápido para adicionar as fotos do casamento da Carol & Ricardo ao portfólio.

## ✅ O que já foi feito

- ✅ Entrada criada no `images.json` (ID: 13)
- ✅ Estrutura preparada para o álbum
- ⏳ **Aguardando URLs reais do Cloudinary**

## 📸 Como Obter as URLs do Cloudinary

### Método Rápido (Recomendado)

1. **Acesse a Collection:**
   - https://collection.cloudinary.com/di6xabxne/6797bc56ce9cc00f6b87519c80902afd

2. **Abra o Console do Navegador:**
   - Pressione `F12` (ou `Cmd+Option+I` no Mac)
   - Vá na aba **Console**

3. **Cole este código e pressione Enter:**
   ```javascript
   // Extrair todas as URLs das imagens
   const images = Array.from(document.querySelectorAll('img'));
   const urls = images
     .map(img => img.src || img.getAttribute('data-src'))
     .filter(url => url && url.includes('cloudinary'))
     .map(url => {
       // Adicionar otimizações
       if (url.includes('/upload/')) {
         return url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
       }
       return url;
     });
   
   // Copiar para clipboard
   navigator.clipboard.writeText(JSON.stringify(urls, null, 2));
   console.log('✅ URLs copiadas! Cole no images.json');
   console.log(`📸 Total: ${urls.length} fotos`);
   ```

4. **Cole as URLs no `images.json`:**
   - Abra o arquivo `images.json`
   - Encontre a entrada do "Carol & Ricardo" (ID: 13)
   - Substitua as URLs placeholder pelas URLs reais

### Método Manual (Alternativa)

1. **Acesse a Collection** no navegador
2. **Para cada foto:**
   - Clique na foto
   - No painel direito, copie a URL
   - Ou clique com botão direito → "Copiar endereço da imagem"
3. **Adicione no `images.json`** no array `album`

## 📝 Estrutura no images.json

A entrada já está criada assim:

```json
{
  "id": 13,
  "url": "URL_DA_FOTO_PRINCIPAL_AQUI",
  "category": "Festa",
  "title": "Carol & Ricardo",
  "album": [
    "URL_FOTO_1",
    "URL_FOTO_2",
    "URL_FOTO_3",
    "URL_FOTO_4",
    "URL_FOTO_5",
    "URL_FOTO_6",
    "URL_FOTO_7",
    "URL_FOTO_8"
  ]
}
```

## 🎨 URLs Otimizadas (Recomendado)

Para melhor performance, use URLs com transformações do Cloudinary:

**Foto principal (thumbnail na galeria):**
```
https://res.cloudinary.com/di6xabxne/image/upload/w_400,h_600,c_fill,q_auto,f_auto/v1/nome-foto.jpg
```

**Fotos do álbum (página de detalhes):**
```
https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1/nome-foto.jpg
```

**Parâmetros:**
- `w_400` - largura 400px (thumbnail)
- `w_1200` - largura 1200px (álbum)
- `h_600` - altura 600px
- `c_fill` - crop inteligente
- `q_auto` - qualidade automática
- `f_auto` - formato automático (WebP quando suportado)

## ✅ Depois de Adicionar as URLs

1. **Salve o arquivo** `images.json`
2. **Recarregue o site** (F5 ou Cmd+R)
3. **Vá em Portfólio** → Procure por "Carol & Ricardo"
4. **Clique na foto** → Verá todas as fotos do álbum!

## 🆘 Precisa de Ajuda?

Se tiver dificuldade para obter as URLs:

1. **Tire um print** da collection
2. **Ou me envie** algumas URLs de exemplo
3. **Posso ajudar** a formatar todas corretamente

---

**Pronto!** Depois de adicionar as URLs reais, o casamento aparecerá automaticamente no portfólio! 🎉
