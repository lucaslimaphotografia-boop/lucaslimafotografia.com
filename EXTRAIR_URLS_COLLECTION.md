# 📸 Extrair URLs da Collection Cloudinary

## 🎯 Collection: https://collection.cloudinary.com/di6xabxne/3f78126aa97e87b7c64f8799639002c7

## ⚡ Método Rápido (Console do Navegador)

### Passo 1: Acesse a Collection
Abra no navegador: **https://collection.cloudinary.com/di6xabxne/3f78126aa97e87b7c64f8799639002c7**

### Passo 2: Abra o Console (F12)
- Pressione `F12` ou `Cmd+Option+I` (Mac)
- Vá na aba **Console**

### Passo 3: Cole este código e pressione Enter:

```javascript
// Aguardar carregamento completo
await new Promise(resolve => setTimeout(resolve, 2000));

// Scroll para carregar todas as imagens
window.scrollTo(0, document.body.scrollHeight);
await new Promise(resolve => setTimeout(resolve, 2000));

// Extrair todas as URLs
const images = Array.from(document.querySelectorAll('img, [style*="background-image"]'));
const urls = new Set();

images.forEach(el => {
  let url = el.src || 
            el.getAttribute('data-src') || 
            el.getAttribute('data-lazy-src') ||
            el.getAttribute('data-original');
  
  // Para background-image
  if (!url && el.style.backgroundImage) {
    const match = el.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (match) url = match[1];
  }
  
  if (url && url.includes('res.cloudinary.com')) {
    // Limpar URL
    url = url.split('?')[0].split('#')[0];
    
    // Adicionar otimizações se não tiver
    if (url.includes('/upload/') && !url.includes('/upload/w_')) {
      url = url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
    }
    
    urls.add(url);
  }
});

const uniqueUrls = Array.from(urls);

// Criar thumbnail (primeira foto otimizada para galeria)
const thumbnailUrl = uniqueUrls[0] 
  ? uniqueUrls[0].replace('/upload/w_1200,q_auto,f_auto/', '/upload/w_400,h_600,c_fill,q_auto,f_auto/')
  : uniqueUrls[0];

// Gerar JSON para images.json
const json = {
  id: 13,
  url: thumbnailUrl,
  category: "Festa",
  title: "Carol & Ricardo",
  album: uniqueUrls
};

// Copiar para clipboard
const jsonString = JSON.stringify(json, null, 2);
navigator.clipboard.writeText(jsonString).then(() => {
  console.log('✅ ✅ ✅ URLs COPIADAS PARA O CLIPBOARD! ✅ ✅ ✅');
  console.log(`\n📸 Total de fotos encontradas: ${uniqueUrls.length}`);
  console.log('\n📋 JSON pronto para colar no images.json:');
  console.log(jsonString);
  console.log('\n💡 Próximo passo: Cole no images.json na entrada ID 13');
}).catch(() => {
  console.log('📋 Cole manualmente este JSON:');
  console.log(jsonString);
});

// Mostrar preview das primeiras URLs
console.log('\n🔍 Preview das primeiras 5 URLs:');
uniqueUrls.slice(0, 5).forEach((url, i) => {
  console.log(`${i + 1}. ${url}`);
});
```

### Passo 4: Copie o JSON
O código vai copiar automaticamente para o clipboard!

### Passo 5: Atualize o images.json
1. Abra `images.json`
2. Encontre a entrada com `"id": 13` (Carol & Ricardo)
3. **Substitua toda a entrada** pelo JSON copiado
4. Salve o arquivo

### Passo 6: Teste no Site
- Recarregue o site (F5)
- Vá em **Portfólio**
- Procure por **"Carol & Ricardo"**
- Clique para ver todas as fotos!

## 🔄 Se Quiser Adicionar Como Novo Casamento

Se esta collection for de outro casamento, use este código:

```javascript
// ... (mesmo código acima até gerar uniqueUrls) ...

// Para NOVO casamento, use um ID diferente (ex: 14)
const json = {
  id: 14,  // ← Mude o ID
  url: thumbnailUrl,
  category: "Festa",  // ← Ajuste a categoria
  title: "Nome do Casal",  // ← Ajuste o título
  album: uniqueUrls
};

// ... resto do código ...
```

## 🆘 Problemas?

### "Nenhuma URL encontrada"
- Aguarde a collection carregar completamente
- Role a página para baixo várias vezes
- Tente novamente o código

### "URLs não funcionam"
- Verifique se começam com `https://res.cloudinary.com`
- Teste uma URL diretamente no navegador
- Certifique-se de que não há espaços extras

### "Quer ajuda?"
Me envie algumas URLs de exemplo e eu formato o JSON completo para você!

---

**Pronto!** Depois de colar o JSON no `images.json`, as fotos estarão ativas! 🎉
