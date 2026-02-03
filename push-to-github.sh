#!/bin/bash

# Script para fazer push para o GitHub
# Execute: bash push-to-github.sh

echo "🚀 Fazendo push para o GitHub..."
echo ""

# Verifica se há commits para fazer push
if git diff --quiet HEAD origin/main 2>/dev/null; then
    echo "✅ Nada para fazer push. Tudo está sincronizado!"
    exit 0
fi

echo "📦 Commits locais encontrados:"
git log origin/main..HEAD --oneline 2>/dev/null || git log --oneline -3

echo ""
echo "🔐 Você precisará autenticar-se..."
echo ""
echo "Opções:"
echo "1. Use seu Personal Access Token como senha"
echo "2. Ou configure SSH (mais seguro)"
echo ""
echo "Criar token: https://github.com/settings/tokens"
echo ""

# Tenta fazer o push
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push realizado com sucesso!"
    echo "🌐 Veja em: https://github.com/lucaslimaphotografia-boop/lucaslimafotografia.com"
else
    echo ""
    echo "❌ Push falhou. Possíveis causas:"
    echo "   - Credenciais não configuradas"
    echo "   - Token inválido ou expirado"
    echo "   - Sem permissão no repositório"
    echo ""
    echo "💡 Dica: Configure SSH para evitar digitar credenciais:"
    echo "   ssh-keygen -t ed25519 -C 'lucaslimaphotografia@gmail.com'"
    echo "   # Depois adicione ~/.ssh/id_ed25519.pub no GitHub"
fi
