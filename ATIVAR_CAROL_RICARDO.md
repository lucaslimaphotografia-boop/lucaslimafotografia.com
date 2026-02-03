# ✅ Ativar Fotos Carol & Ricardo - Guia Rápido

## 🎯 Passo a Passo

### 1. Acesse a Collection do Cloudinary

Abra no navegador:
**https://collection.cloudinary.com/di6xabxne/6797bc56ce9cc00f6b87519c80902afd**

### 2. Abra o Console do Navegador

- **Chrome/Edge**: Pressione `F12` ou `Cmd+Option+I` (Mac)
- **Firefox**: Pressione `F12` ou `Cmd+Option+K` (Mac)
- Vá na aba **Console**

### 3. Cole este código e pressione Enter:

```javascript
// Extrair todas as URLs das imagens da collection
const images = Array.from(document.querySelectorAll('img, [style*="background-image"]'));
const urls = [];

images.forEach(el => {
  let url = el.src || el.getAttribute('data-src') || el.getAttribute('data-lazy-src');
  
  // Para elementos com background-image
  if (!url && el.style.backgroundImage) {
    const match = el.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (match) url = match[1];
  }
  
  if (url && url.includes('cloudinary') && url.includes('res.cloudinary.com')) {
    // Remover query strings
    url = url.split('?')[0];
    // Adicionar otimizações se não tiver
    if (url.includes('/upload/') && !url.includes('/upload/w_')) {
      url = url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
    }
    urls.push(url);
  }
});

// Remover duplicatas
const uniqueUrls = [...new Set(urls)];

// Criar JSON para images.json
const json = {
  id: 13,
  url: uniqueUrls[0] ? uniqueUrls[0].replace('/upload/w_1200,q_auto,f_auto/', '/upload/w_400,h_600,c_fill,q_auto,f_auto/') : '',
  category: "Festa",
  title: "Carol & Ricardo",
  album: uniqueUrls
};

// Copiar para clipboard
const jsonString = JSON.stringify(json, null, 2);
navigator.clipboard.writeText(jsonString).then(() => {
  console.log('✅ URLs copiadas para o clipboard!');
  console.log(`📸 Total: ${uniqueUrls.length} fotos encontradas`);
  console.log('\n📋 JSON pronto para colar no images.json:');
  console.log(jsonString);
}).catch(() => {
  console.log('📋 Cole manualmente este JSON:');
  console.log(jsonString);
});
```

### 4. Copie o JSON gerado

O código vai copiar automaticamente para o clipboard, ou mostrar no console.

### 5. Atualize o images.json

1. Abra o arquivo `images.json`
2. Encontre a entrada com `"id": 13` (Carol & Ricardo)
3. **Substitua toda a entrada** pelo JSON copiado
4. Salve o arquivo

### 6. Recarregue o site

- Pressione `F5` ou `Cmd+R`
- Vá em **Portfólio**
- Procure por **"Carol & Ricardo"**
- Clique na foto para ver o álbum completo!

## 🔍 Verificar se Funcionou

1. ✅ A foto aparece na galeria?
2. ✅ Ao clicar, abre a página de detalhes?
3. ✅ As fotos do álbum carregam corretamente?

## 🆘 Problemas?

### "Nenhuma URL encontrada"
- Certifique-se de que a collection está carregada completamente
- Role a página para baixo para carregar todas as imagens
- Tente novamente o código

### "URLs não funcionam"
- Verifique se as URLs começam com `https://res.cloudinary.com`
- Certifique-se de que não há espaços ou caracteres especiais
- Teste uma URL diretamente no navegador

### "Quer ajuda?"
Se tiver dificuldade, me envie:
- Algumas URLs de exemplo da collection
- Ou um print da collection
- Posso ajudar a formatar!

---

**Pronto!** Depois de atualizar o `images.json`, as fotos estarão ativas no site! 🎉
