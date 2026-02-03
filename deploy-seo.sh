#!/bin/bash

# Script de Deploy com Otimizações SEO
# Lucas Lima Fotografia

echo "🚀 Iniciando deploy com otimizações SEO..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Backup dos arquivos antigos
echo -e "${YELLOW}📦 Fazendo backup dos arquivos antigos...${NC}"
if [ -f "index.html" ]; then
    cp index.html index-backup-$(date +%Y%m%d-%H%M%S).html
    echo -e "${GREEN}✓ Backup criado${NC}"
fi

if [ -f "vercel.json" ]; then
    cp vercel.json vercel-backup-$(date +%Y%m%d-%H%M%S).json
    echo -e "${GREEN}✓ Backup vercel.json criado${NC}"
fi

echo ""

# 2. Substituir arquivos principais
echo -e "${YELLOW}🔄 Substituindo arquivos otimizados...${NC}"

if [ -f "index-seo.html" ]; then
    mv index-seo.html index.html
    echo -e "${GREEN}✓ index.html atualizado${NC}"
else
    echo -e "${RED}✗ Arquivo index-seo.html não encontrado${NC}"
fi

if [ -f "vercel-seo.json" ]; then
    mv vercel-seo.json vercel.json
    echo -e "${GREEN}✓ vercel.json atualizado${NC}"
else
    echo -e "${RED}✗ Arquivo vercel-seo.json não encontrado${NC}"
fi

echo ""

# 3. Verificar arquivos SEO obrigatórios
echo -e "${YELLOW}🔍 Verificando arquivos SEO...${NC}"

required_files=("robots.txt" "sitemap.xml" "site.webmanifest" "404.html")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file presente${NC}"
    else
        echo -e "${RED}✗ $file ausente${NC}"
        missing_files+=("$file")
    fi
done

echo ""

# 4. Verificar favicons (avisar se não existirem)
echo -e "${YELLOW}🎨 Verificando favicons...${NC}"

favicon_files=("favicon-32x32.png" "favicon-16x16.png" "apple-touch-icon.png" "android-chrome-192x192.png" "android-chrome-512x512.png")
missing_favicons=()

for file in "${favicon_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file presente${NC}"
    else
        echo -e "${YELLOW}⚠ $file ausente (recomendado)${NC}"
        missing_favicons+=("$file")
    fi
done

echo ""

# 5. Validar arquivos JSON
echo -e "${YELLOW}✅ Validando arquivos JSON...${NC}"

if command -v jq &> /dev/null; then
    if [ -f "package.json" ]; then
        if jq empty package.json 2>/dev/null; then
            echo -e "${GREEN}✓ package.json válido${NC}"
        else
            echo -e "${RED}✗ package.json inválido${NC}"
        fi
    fi
    
    if [ -f "vercel.json" ]; then
        if jq empty vercel.json 2>/dev/null; then
            echo -e "${GREEN}✓ vercel.json válido${NC}"
        else
            echo -e "${RED}✗ vercel.json inválido${NC}"
        fi
    fi
    
    if [ -f "site.webmanifest" ]; then
        if jq empty site.webmanifest 2>/dev/null; then
            echo -e "${GREEN}✓ site.webmanifest válido${NC}"
        else
            echo -e "${RED}✗ site.webmanifest inválido${NC}"
        fi
    fi
else
    echo -e "${YELLOW}⚠ jq não instalado, pulando validação JSON${NC}"
fi

echo ""

# 6. Build do projeto
echo -e "${YELLOW}🏗️  Executando build...${NC}"

if [ -f "package.json" ]; then
    if command -v npm &> /dev/null; then
        echo "Instalando dependências..."
        npm install
        echo "Executando build..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓ Build concluído com sucesso${NC}"
        else
            echo -e "${RED}✗ Erro no build${NC}"
            exit 1
        fi
    else
        echo -e "${RED}✗ npm não instalado${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ package.json não encontrado${NC}"
    exit 1
fi

echo ""

# 7. Resumo
echo -e "${YELLOW}📊 RESUMO DO DEPLOY${NC}"
echo "=================================="
echo ""

if [ ${#missing_files[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ Todos os arquivos SEO obrigatórios presentes${NC}"
else
    echo -e "${RED}✗ Arquivos SEO ausentes:${NC}"
    for file in "${missing_files[@]}"; do
        echo "  - $file"
    done
fi

echo ""

if [ ${#missing_favicons[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ Todos os favicons presentes${NC}"
else
    echo -e "${YELLOW}⚠ Favicons recomendados ausentes:${NC}"
    for file in "${missing_favicons[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "Crie os favicons em: https://realfavicongenerator.net/"
fi

echo ""
echo "=================================="
echo ""

# 8. Instruções finais
echo -e "${GREEN}🎉 DEPLOY PRONTO!${NC}"
echo ""
echo "Próximos passos:"
echo ""
echo "1. Fazer commit das alterações:"
echo "   git add ."
echo "   git commit -m \"feat: implementar otimizações SEO completas\""
echo ""
echo "2. Push para o GitHub:"
echo "   git push origin main"
echo ""
echo "3. Aguardar deploy automático na Vercel"
echo ""
echo "4. Após deploy, verificar:"
echo "   - https://lucaslimafotografia.com"
echo "   - https://lucaslimafotografia.com/sitemap.xml"
echo "   - https://lucaslimafotografia.com/robots.txt"
echo ""
echo "5. Configurar ferramentas:"
echo "   - Google Search Console"
echo "   - Google Analytics"
echo "   - Google My Business"
echo ""
echo "📖 Consulte SEO_GUIDE.md para instruções detalhadas"
echo ""
echo -e "${GREEN}Boa sorte! 🚀${NC}"
