# 📸 Como Alterar as Fotos do Site

Agora é muito fácil alterar as fotos do seu site! Todas as imagens estão centralizadas em um único arquivo JSON.

## 📁 Arquivo de Configuração

Todas as fotos estão no arquivo **`images.json`** na raiz do projeto.

## 🎯 Como Alterar

### 1. Abra o arquivo `images.json`

Este arquivo contém duas seções:

- **`gallery`**: Fotos que aparecem na galeria/portfólio
- **`hero`**: Fotos que aparecem na página inicial (background)

### 2. Para alterar fotos da Galeria

Edite o array `gallery`. Cada foto precisa ter:

```json
{
  "id": 1,
  "url": "URL_DA_SUA_FOTO_AQUI",
  "category": "Categoria",
  "title": "Título da Foto",
  "album": ["URL1", "URL2", "URL3"]
}
```

**Campos:**
- `id`: Número único para cada foto
- `url`: URL da foto que aparece na galeria (thumbnail)
- `category`: Categoria da foto
- `title`: Título da foto
- `album`: **Array com múltiplas fotos** que aparecem quando você clica na foto (opcional, mas recomendado)

**Categorias disponíveis:**
- `"Todos"` (não use como categoria individual)
- `"Detalhes"`
- `"Noiva"`
- `"Noivo"`
- `"Festa"`
- `"Editorial"`
- `"Preto & Branco"`
- `"Imprensa"`

**Exemplo básico (sem álbum):**
```json
{
  "id": 1,
  "url": "https://exemplo.com/minha-foto.jpg",
  "category": "Noiva",
  "title": "Retrato Elegante"
}
```

**Exemplo com múltiplas fotos (álbum):**
```json
{
  "id": 1,
  "url": "https://exemplo.com/foto-principal.jpg",
  "category": "Noiva",
  "title": "Casamento Maria & João",
  "album": [
    "https://exemplo.com/foto1.jpg",
    "https://exemplo.com/foto2.jpg",
    "https://exemplo.com/foto3.jpg",
    "https://exemplo.com/foto4.jpg",
    "https://exemplo.com/foto5.jpg"
  ]
}
```

### 📸 Como Adicionar Múltiplas Fotos a um Projeto

Quando você clica em uma foto na galeria, abre uma página com várias fotos do álbum. Para adicionar múltiplas fotos:

1. **Adicione o campo `album`** ao seu projeto no `images.json`
2. **Coloque todas as URLs** das fotos que você quer mostrar no álbum
3. **A primeira foto** (`url`) é a que aparece na galeria
4. **As fotos do `album`** aparecem na página de detalhes quando você clica

**Exemplo completo:**
```json
{
  "id": 5,
  "url": "https://meu-cdn.com/casamento-001-thumb.jpg",
  "category": "Festa",
  "title": "Casamento Villa Balbiano",
  "album": [
    "https://meu-cdn.com/casamento-001.jpg",
    "https://meu-cdn.com/casamento-002.jpg",
    "https://meu-cdn.com/casamento-003.jpg",
    "https://meu-cdn.com/casamento-004.jpg",
    "https://meu-cdn.com/casamento-005.jpg",
    "https://meu-cdn.com/casamento-006.jpg",
    "https://meu-cdn.com/casamento-007.jpg",
    "https://meu-cdn.com/casamento-008.jpg"
  ]
}
```

**💡 Dica:** Você pode adicionar quantas fotos quiser no array `album`! Recomendamos pelo menos 4-5 fotos para um álbum completo.

### 3. Para alterar fotos da Página Inicial (Hero)

Edite o array `hero`. São apenas URLs das imagens:

```json
"hero": [
  "https://exemplo.com/foto1.jpg",
  "https://exemplo.com/foto2.jpg",
  "https://exemplo.com/foto3.jpg"
]
```

## 📤 Onde Hospedar suas Fotos

Você pode usar várias opções:

### Opção 1: Google Drive / Google Photos
1. Faça upload das fotos
2. Clique com botão direito → "Obter link"
3. Altere o link para formato direto:
   - De: `https://drive.google.com/file/d/FILE_ID/view`
   - Para: `https://drive.google.com/uc?export=view&id=FILE_ID`

### Opção 2: Cloudinary (Recomendado)
1. Crie conta em [cloudinary.com](https://cloudinary.com) (grátis)
2. Faça upload das fotos
3. Copie a URL gerada
4. Use no `images.json`

### Opção 3: Imgur
1. Acesse [imgur.com](https://imgur.com)
2. Faça upload da foto
3. Clique com botão direito na imagem → "Copiar endereço da imagem"
4. Use no `images.json`

### Opção 4: Servidor Próprio / CDN
Se você tem um servidor ou CDN, use as URLs completas das suas fotos.

### Opção 5: Pasta `public` do projeto
1. Crie uma pasta `public/images` no projeto
2. Coloque suas fotos lá
3. Use no JSON: `"/images/nome-da-foto.jpg"`

## ✏️ Exemplo Completo

```json
{
  "gallery": [
    {
      "id": 1,
      "url": "https://meu-cdn.com/fotos/casamento-001-thumb.jpg",
      "category": "Noiva",
      "title": "Preparação da Noiva",
      "album": [
        "https://meu-cdn.com/fotos/casamento-001-01.jpg",
        "https://meu-cdn.com/fotos/casamento-001-02.jpg",
        "https://meu-cdn.com/fotos/casamento-001-03.jpg",
        "https://meu-cdn.com/fotos/casamento-001-04.jpg"
      ]
    },
    {
      "id": 2,
      "url": "https://meu-cdn.com/fotos/casamento-002-thumb.jpg",
      "category": "Festa",
      "title": "Primeira Dança",
      "album": [
        "https://meu-cdn.com/fotos/casamento-002-01.jpg",
        "https://meu-cdn.com/fotos/casamento-002-02.jpg",
        "https://meu-cdn.com/fotos/casamento-002-03.jpg",
        "https://meu-cdn.com/fotos/casamento-002-04.jpg",
        "https://meu-cdn.com/fotos/casamento-002-05.jpg"
      ]
    }
  ],
  "hero": [
    "https://meu-cdn.com/fotos/hero-001.jpg",
    "https://meu-cdn.com/fotos/hero-002.jpg",
    "https://meu-cdn.com/fotos/hero-003.jpg"
  ]
}
```

## 🔄 Após Alterar

1. **Salve o arquivo** `images.json`
2. **Recarregue o site** no navegador (F5 ou Cmd+R)
3. As novas fotos aparecerão automaticamente!

## 💡 Dicas

- **Formato recomendado**: JPG ou WebP para melhor performance
- **Tamanho**: Use imagens otimizadas (800-1200px de largura é suficiente)
- **Aspect Ratio**: As fotos da galeria funcionam melhor em formato vertical (3:4)
- **IDs únicos**: Certifique-se de que cada foto tenha um `id` único
- **Ordem**: A ordem no array define a ordem de exibição

## 🐛 Problemas Comuns

### Foto não aparece
- Verifique se a URL está correta e acessível
- Teste a URL diretamente no navegador
- Certifique-se de que o servidor permite acesso externo (CORS)

### Foto muito grande/carregando devagar
- Use um serviço de otimização de imagens (Cloudinary, Imgix)
- Redimensione as fotos antes de fazer upload
- Use formato WebP quando possível

### Categoria não aparece
- Verifique se a categoria está escrita exatamente como nas opções disponíveis
- Use aspas duplas no JSON

## 📝 Notas Importantes

- ⚠️ **Não delete** as chaves `gallery` ou `hero` do JSON
- ⚠️ **Mantenha** a estrutura do JSON válida (vírgulas, chaves, etc)
- ✅ Você pode adicionar quantas fotos quiser na galeria
- ✅ Você pode adicionar quantas fotos quiser no `album` de cada projeto
- ✅ O campo `album` é **opcional** - se não adicionar, o site usará fotos padrão
- ✅ Você pode remover fotos que não quer mais
- 💡 **Recomendação**: Adicione pelo menos 4-5 fotos no `album` para cada projeto principal

---

**Precisa de ajuda?** Verifique se o JSON está válido em [jsonlint.com](https://jsonlint.com)
