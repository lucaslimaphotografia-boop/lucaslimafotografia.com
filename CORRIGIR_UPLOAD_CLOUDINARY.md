# 🔧 Como Corrigir Erro de Upload no Cloudinary

## ❌ Erro: "Upload preset must be whitelisted for unsigned uploads"

Este erro significa que o preset não está configurado corretamente no Cloudinary.

## ✅ Solução Passo a Passo

### Passo 1: Acessar o Cloudinary Dashboard

1. Acesse: [https://cloudinary.com/console](https://cloudinary.com/console)
2. Faça login na sua conta

### Passo 2: Verificar/Criar o Upload Preset

1. No menu lateral, clique em **Settings** (engrenagem ⚙️)
2. Clique em **Upload** (na lista de configurações)
3. Role a página até a seção **Upload presets**
4. Procure por um preset chamado `ml_default`

#### Se o preset NÃO existe:

1. Clique no botão **Add upload preset** ou **Add**
2. Preencha os campos:
   - **Preset name:** `ml_default` (exatamente assim, sem espaços)
   - **Signing mode:** Selecione **Unsigned** ⚠️ (MUITO IMPORTANTE!)
   - **Folder:** `portfolio` (opcional, mas recomendado)

3. Role para baixo e verifique:
   - ✅ **Allowed formats:** Deixe vazio ou selecione formatos de imagem
   - ✅ **Max file size:** Deixe padrão ou aumente se necessário
   - ✅ **Access control:** Certifique-se de que não há restrições bloqueando

4. Clique em **Save**

#### Se o preset JÁ existe:

1. Clique no preset `ml_default` para editá-lo
2. Verifique se **Signing mode** está como **Unsigned**
3. Se estiver como **Signed**, mude para **Unsigned**
4. Clique em **Save**

### Passo 3: Verificar Configurações de Segurança

1. Ainda em **Settings** → **Upload**
2. Procure por **Restricted media types** ou **Upload restrictions**
3. Certifique-se de que:
   - ✅ Uploads unsigned estão permitidos
   - ✅ Não há restrições globais bloqueando

### Passo 4: Testar Novamente

1. Volte ao painel admin do site
2. Tente fazer upload de uma foto novamente
3. Deve funcionar agora! ✅

## 🔍 Verificações Adicionais

### Se ainda não funcionar:

1. **Verifique o nome do preset:**
   - No código, o preset é: `ml_default`
   - No Cloudinary, deve ter EXATAMENTE o mesmo nome
   - Maiúsculas/minúsculas importam!

2. **Verifique o Cloud Name:**
   - No código: `di6xabxne`
   - No Cloudinary Dashboard, veja no topo da página o "Cloud name"
   - Devem ser iguais!

3. **Teste com outro preset:**
   - Crie um preset de teste chamado `test_upload`
   - Edite o código em `components/AdminPanel.tsx` linha 184:
     ```typescript
     const uploadPreset = 'test_upload';
     ```
   - Faça commit e teste novamente

## 📸 Capturas de Tela (O que procurar)

### Configuração Correta:
```
Preset name: ml_default
Signing mode: Unsigned ✅
Status: Active
```

### Configuração Incorreta:
```
Preset name: ml_default
Signing mode: Signed ❌ (isso causa o erro!)
Status: Active
```

## 🆘 Ainda com Problemas?

1. **Verifique o console do navegador:**
   - Pressione F12
   - Vá na aba "Console"
   - Veja se há mais erros

2. **Teste a URL do preset diretamente:**
   - Acesse: `https://api.cloudinary.com/v1_1/di6xabxne/upload/presets`
   - Deve mostrar os presets disponíveis

3. **Entre em contato:**
   - Documente o erro exato
   - Tire screenshot da configuração do preset
   - Envie para suporte

## ✅ Checklist Rápido

- [ ] Preset `ml_default` existe no Cloudinary
- [ ] Preset está configurado como **Unsigned**
- [ ] Preset está **Active** (ativo)
- [ ] Cloud name é `di6xabxne`
- [ ] Não há restrições globais bloqueando
- [ ] Testei fazer upload novamente

---

**Depois de corrigir, o upload deve funcionar perfeitamente!** 🎉
