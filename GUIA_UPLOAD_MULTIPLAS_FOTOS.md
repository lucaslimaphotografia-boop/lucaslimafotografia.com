# 📸 Guia Rápido: Upload de Múltiplas Fotos

Este guia explica como fazer upload de várias fotos ao mesmo tempo para um projeto/álbum.

## 🎯 O Que Você Precisa Saber

Quando você clica em uma foto na galeria, abre uma página com várias fotos do álbum. Para adicionar múltiplas fotos a um projeto:

1. **A foto principal** (`url`) aparece na galeria
2. **As fotos do álbum** (`album`) aparecem quando você clica na foto

## 🚀 Métodos para Upload em Lote

### Método 1: Cloudinary (Mais Fácil - Recomendado)

**Vantagens:** Upload em lote, otimização automática, URLs fáceis de copiar

1. **Acesse** [cloudinary.com](https://cloudinary.com) e crie uma conta (grátis)
2. **Vá em** Media Library → Upload
3. **Selecione múltiplas fotos** (Ctrl/Cmd + Clique ou arraste várias)
4. **Aguarde o upload** de todas
5. **Copie as URLs**:
   - Clique em cada foto → copie a URL
   - Ou use o modo "List" para ver todas de uma vez

**Exemplo de URL gerada:**
```
https://res.cloudinary.com/seu-usuario/image/upload/v1234567890/foto.jpg
```

### Método 2: Google Drive (Upload em Lote)

1. **Abra o Google Drive** no navegador
2. **Selecione múltiplas fotos**:
   - Clique na primeira foto
   - Segure `Shift` e clique na última (seleciona um intervalo)
   - Ou segure `Ctrl/Cmd` e clique em várias individuais
3. **Arraste todas** para o Drive ou clique em "Novo" → "Upload de arquivos"
4. **Aguarde o upload** de todas
5. **Para cada foto:**
   - Clique com botão direito → "Obter link"
   - Altere para formato direto:
     ```
     https://drive.google.com/uc?export=view&id=FILE_ID
     ```

**💡 Dica:** Use um editor de texto para organizar todas as URLs antes de colar no JSON.

### Método 3: Imgur (Rápido para poucas fotos)

1. **Acesse** [imgur.com](https://imgur.com)
2. **Clique em** "New post"
3. **Arraste várias fotos** de uma vez
4. **Aguarde o upload**
5. **Copie as URLs** de cada foto (botão direito → "Copiar endereço da imagem")

### Método 4: Servidor/CDN Próprio

Se você tem um servidor ou CDN:

1. **Faça upload em lote** via FTP/SFTP ou painel do servidor
2. **Organize as fotos** em pastas (ex: `/casamentos/2024/villa-balbiano/`)
3. **Use URLs completas** no JSON:
   ```json
   "album": [
     "https://seusite.com/casamentos/2024/villa-balbiano/001.jpg",
     "https://seusite.com/casamentos/2024/villa-balbiano/002.jpg",
     "https://seusite.com/casamentos/2024/villa-balbiano/003.jpg"
   ]
   ```

## 📝 Como Adicionar no images.json

Depois de ter todas as URLs, adicione no arquivo `images.json`:

```json
{
  "id": 1,
  "url": "https://exemplo.com/foto-principal-thumb.jpg",
  "category": "Noiva",
  "title": "Casamento Maria & João",
  "album": [
    "https://exemplo.com/foto-001.jpg",
    "https://exemplo.com/foto-002.jpg",
    "https://exemplo.com/foto-003.jpg",
    "https://exemplo.com/foto-004.jpg",
    "https://exemplo.com/foto-005.jpg",
    "https://exemplo.com/foto-006.jpg",
    "https://exemplo.com/foto-007.jpg",
    "https://exemplo.com/foto-008.jpg"
  ]
}
```

## 🎨 Dicas de Organização

### Nomenclatura de Arquivos

Use nomes consistentes para facilitar:

**Bom:**
```
casamento-maria-joao-001.jpg
casamento-maria-joao-002.jpg
casamento-maria-joao-003.jpg
```

**Evite:**
```
IMG_1234.jpg
DSC_5678.jpg
foto.jpg
```

### Ordem das Fotos

A ordem no array `album` define a ordem de exibição:

```json
"album": [
  "foto-intro.jpg",      // 1ª foto (slide de introdução)
  "foto-preparacao.jpg", // 2ª foto
  "foto-cerimonia.jpg",  // 3ª foto
  "foto-festa.jpg",      // 4ª foto
  "foto-retrato.jpg"     // 5ª foto (slide de retrato)
]
```

### Quantidade Recomendada

- **Mínimo:** 4-5 fotos por álbum
- **Ideal:** 8-12 fotos por álbum
- **Máximo:** Sem limite, mas recomenda-se até 20 para melhor performance

## ⚡ Atalhos Úteis

### Copiar Múltiplas URLs no Cloudinary

1. Selecione várias fotos (Ctrl/Cmd + Clique)
2. Clique em "..." → "Copy URL"
3. Cole em um editor de texto
4. Organize e copie para o JSON

### Google Drive em Lote

1. Selecione todas as fotos
2. Clique com botão direito → "Obter link"
3. Use um script ou ferramenta online para converter todos os links de uma vez
4. Ou faça manualmente (mais trabalhoso, mas funciona)

## 🔧 Ferramentas Úteis

### Para Converter Links do Google Drive

Use ferramentas online como:
- [Google Drive Direct Link Generator](https://www.wonderplugin.com/online-tools/google-drive-direct-link-generator/)
- Ou faça manualmente substituindo `/file/d/` por `/uc?export=view&id=`

### Para Validar JSON

Antes de salvar, valide seu JSON em:
- [jsonlint.com](https://jsonlint.com)
- Ou use um editor com validação (VS Code, Cursor)

## ✅ Checklist

Antes de finalizar, verifique:

- [ ] Todas as URLs estão corretas e acessíveis
- [ ] O JSON está válido (sem erros de sintaxe)
- [ ] Vírgulas estão corretas (último item sem vírgula)
- [ ] IDs são únicos
- [ ] A primeira foto (`url`) é diferente das do `album` (ou pode ser a mesma)
- [ ] Testou as URLs no navegador

## 🐛 Problemas Comuns

### "Foto não aparece"
- Verifique se a URL está correta
- Teste a URL diretamente no navegador
- Certifique-se de que o servidor permite acesso externo

### "JSON inválido"
- Verifique vírgulas (último item não deve ter vírgula)
- Verifique aspas (use aspas duplas `"`)
- Use um validador JSON online

### "Muitas fotos, site lento"
- Otimize as fotos antes do upload (reduza tamanho)
- Use um serviço de CDN com otimização (Cloudinary)
- Considere reduzir a quantidade de fotos por álbum

---

**Precisa de mais ajuda?** Consulte o arquivo `COMO_ALTERAR_FOTOS.md` para mais detalhes.
