# 📤 Guia de Upload para Cloudinary

Guia completo para configurar e usar o upload direto de fotos para o Cloudinary no painel de administração.

## 🚀 Link Direto para o Painel

**URL de acesso direto:**
```
https://seu-site.com/?admin=true
```

Ou use o atalho: `Ctrl+Shift+K` (Windows) ou `Cmd+Shift+K` (Mac)

## ⚙️ Configuração do Cloudinary

### Passo 1: Criar Upload Preset no Cloudinary

1. Acesse o [Cloudinary Dashboard](https://cloudinary.com/console)
2. Vá em **Settings** → **Upload**
3. Role até **Upload presets**
4. Clique em **Add upload preset**
5. Configure:
   - **Preset name:** `ml_default` (ou o nome que preferir)
   - **Signing mode:** `Unsigned` (importante!)
   - **Folder:** `portfolio` (opcional, para organizar)
   - **Incoming transformation:** 
     - Width: `1200`
     - Quality: `auto`
     - Format: `auto`
6. Clique em **Save**

### Passo 2: Configurar Variáveis de Ambiente no Vercel (Opcional)

Se quiser usar variáveis de ambiente:

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - `CLOUDINARY_CLOUD_NAME` = `di6xabxne` (seu cloud name)
   - `CLOUDINARY_UPLOAD_PRESET` = `ml_default` (nome do preset criado)

**Nota:** Atualmente o código usa valores padrão, então não é obrigatório configurar essas variáveis.

## 📸 Como Usar o Upload

### Upload de Foto Principal

1. **Acesse o painel admin** (`?admin=true` ou `Ctrl+Shift+K`)
2. Clique em **"Adicionar Foto"**
3. Na seção **"Foto Principal"**:
   - **Opção 1:** Arraste uma foto para a área destacada
   - **Opção 2:** Clique em **"Selecionar Arquivo"** e escolha a foto
   - **Opção 3:** Cole uma URL diretamente no campo abaixo

### Upload Múltiplo de Álbum

1. Na seção **"Fotos do Álbum"**:
   - **Opção 1:** Clique em **"Upload Múltiplo"** e selecione várias fotos
   - **Opção 2:** Arraste múltiplas fotos para a área destacada
   - **Opção 3:** Adicione URLs manualmente usando **"+ Adicionar URL"**

### Formato de Arquivos Suportados

- ✅ JPEG / JPG
- ✅ PNG
- ✅ WebP
- ✅ GIF
- ✅ Tamanho máximo: 10MB por arquivo

## 🔄 Fluxo de Trabalho Completo

### 1. Upload das Fotos

1. Acesse o painel (`?admin=true`)
2. Faça login com a senha: `lucaslima2024`
3. Vá na aba **"Galeria"**
4. Clique em **"Adicionar Foto"**
5. Faça upload da foto principal (arraste ou selecione)
6. Adicione título e categoria
7. Faça upload das fotos do álbum (múltiplas)
8. Clique em **"Adicionar"**

### 2. Salvar Alterações

1. Após adicionar/editar fotos, você verá **"● Alterações não salvas"**
2. Clique em **"Salvar"** (canto superior direito)
3. Um arquivo `images.json` será baixado automaticamente
4. **Substitua** o arquivo `images.json` no projeto pelo arquivo baixado

### 3. Atualizar o Site

1. **Commit e push:**
   ```bash
   git add images.json
   git commit -m "Add new photos via admin panel"
   git push origin main
   ```

2. **Aguarde o deploy** no Vercel (automático, ~1-2 minutos)

3. **Verifique** no site se as fotos apareceram

## 🎯 Recursos do Upload

### Otimização Automática

- ✅ Redimensionamento automático para 1200px de largura
- ✅ Compressão automática (qualidade otimizada)
- ✅ Conversão automática para WebP quando possível
- ✅ URLs otimizadas para web

### Organização

- ✅ Fotos principais: pasta `portfolio/`
- ✅ Fotos do álbum: pasta `portfolio/albums/`
- ✅ Nomes de arquivo preservados

### Preview em Tempo Real

- ✅ Preview da foto principal após upload
- ✅ Preview de cada foto do álbum
- ✅ Indicador de progresso durante upload

## 🔐 Segurança

### Upload Preset Unsigned

O preset está configurado como **"Unsigned"**, o que significa:
- ✅ Não precisa de API key/secret no frontend
- ✅ Mais seguro (credenciais não expostas)
- ✅ Limite de upload controlado pelo Cloudinary

### Limites Recomendados

- **Tamanho máximo:** 10MB por arquivo
- **Formatos:** Apenas imagens
- **Rate limiting:** Controlado pelo Cloudinary

## 🆘 Problemas Comuns

### "Upload failed"

**Possíveis causas:**
- Arquivo muito grande (>10MB)
- Formato não suportado
- Problema de conexão
- Preset não configurado corretamente

**Solução:**
1. Verifique o tamanho do arquivo
2. Tente converter para JPEG/PNG
3. Verifique se o preset está como "Unsigned"
4. Tente novamente

### "Fotos não aparecem no site"

**Possíveis causas:**
- Não fez commit/push do `images.json`
- Deploy ainda não concluído
- Cache do navegador

**Solução:**
1. Verifique se fez commit e push
2. Aguarde alguns minutos
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Verifique o console do navegador (F12) para erros

### "Área de drag & drop não funciona"

**Solução:**
- Use o botão "Selecionar Arquivo" como alternativa
- Verifique se está usando um navegador moderno (Chrome, Firefox, Safari, Edge)

## 📝 Notas Técnicas

### Estrutura de Pastas no Cloudinary

```
portfolio/
  ├── foto-principal-1.jpg
  ├── foto-principal-2.jpg
  └── albums/
      ├── album-foto-1.jpg
      ├── album-foto-2.jpg
      └── ...
```

### URLs Geradas

As URLs são otimizadas automaticamente:
```
https://res.cloudinary.com/di6xabxne/image/upload/w_1200,q_auto,f_auto/v1234567890/portfolio/foto.jpg
```

Onde:
- `w_1200` = largura máxima 1200px
- `q_auto` = qualidade automática
- `f_auto` = formato automático (WebP quando suportado)

## 🎉 Pronto!

Agora você pode fazer upload de fotos diretamente no painel e elas serão automaticamente otimizadas e hospedadas no Cloudinary! 🚀

---

**Link direto:** `https://seu-site.com/?admin=true`
**Atalho:** `Ctrl+Shift+K` (ou `Cmd+Shift+K` no Mac)
