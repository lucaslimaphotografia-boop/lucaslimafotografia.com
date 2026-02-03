#!/usr/bin/env node

/**
 * Script para extrair URLs de uma Cloudinary Collection
 * 
 * Uso:
 *   node scripts/extract-cloudinary-urls.js <URL_DA_COLLECTION>
 * 
 * Exemplo:
 *   node scripts/extract-cloudinary-urls.js https://collection.cloudinary.com/di6xabxne/6797bc56ce9cc00f6b87519c80902afd
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collectionUrl = process.argv[2];

if (!collectionUrl) {
  console.error('❌ Erro: URL da collection não fornecida');
  console.log('\nUso: node scripts/extract-cloudinary-urls.js <URL_DA_COLLECTION>');
  console.log('\nExemplo:');
  console.log('  node scripts/extract-cloudinary-urls.js https://collection.cloudinary.com/di6xabxne/6797bc56ce9cc00f6b87519c80902afd');
  process.exit(1);
}

// Função para fazer requisição HTTP
function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    };
    
    client.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

// Extrair URLs de imagens do HTML
function extractImageUrls(html) {
  const urls = new Set();
  
  // Procurar por padrões do Cloudinary no HTML
  const patterns = [
    /https:\/\/res\.cloudinary\.com\/[^"'\s]+/g,
    /https:\/\/res\.cloudinary\.com\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/gi,
    /"url":"(https:\/\/res\.cloudinary\.com[^"]+)"/g,
    /'url':'(https:\/\/res\.cloudinary\.com[^']+)'/g
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1] || match[0];
      // Remover parâmetros de query se houver
      url = url.split('?')[0];
      // Adicionar otimizações
      if (!url.includes('/upload/')) {
        continue;
      }
      // Inserir transformações antes do path
      if (url.includes('/upload/v')) {
        url = url.replace('/upload/v', '/upload/w_1200,q_auto,f_auto/v');
      } else if (url.includes('/upload/')) {
        url = url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
      }
      urls.add(url);
    }
  });
  
  return Array.from(urls);
}

async function main() {
  console.log('🚀 Extraindo URLs do Cloudinary Collection...\n');
  console.log(`📁 Collection: ${collectionUrl}\n`);

  try {
    // Tentar acessar a collection
    console.log('📥 Acessando collection...');
    const response = await fetch(collectionUrl);
    
    if (response.status !== 200) {
      console.log('⚠️  Não foi possível acessar diretamente. A collection pode requerer autenticação.');
      console.log('\n💡 Alternativa:');
      console.log('   1. Acesse a collection no navegador');
      console.log('   2. Abra o DevTools (F12)');
      console.log('   3. Vá na aba Network');
      console.log('   4. Recarregue a página');
      console.log('   5. Filtre por "cloudinary"');
      console.log('   6. Copie as URLs das imagens');
      return;
    }

    // Extrair URLs
    console.log('🔍 Procurando URLs de imagens...');
    const imageUrls = extractImageUrls(response.data);
    
    if (imageUrls.length === 0) {
      console.log('❌ Nenhuma URL encontrada no HTML.');
      console.log('\n💡 Isso pode acontecer porque:');
      console.log('   - A collection carrega imagens via JavaScript');
      console.log('   - É necessário autenticação');
      console.log('\n📋 Solução Manual:');
      console.log('   1. Acesse a collection no navegador');
      console.log('   2. Abra o Console (F12 → Console)');
      console.log('   3. Cole este código:');
      console.log('');
      console.log('   Array.from(document.querySelectorAll("img")).map(img => img.src).filter(url => url.includes("cloudinary")).forEach(url => console.log(url));');
      console.log('');
      console.log('   4. Copie todas as URLs exibidas');
      return;
    }

    console.log(`\n📸 Encontradas ${imageUrls.length} URLs\n`);

    // Criar thumbnail URLs (para a galeria)
    const thumbnailUrls = imageUrls.map(url => {
      return url.replace('/upload/w_1200,q_auto,f_auto/', '/upload/w_400,h_600,c_fill,q_auto,f_auto/');
    });

    // Gerar JSON para images.json
    const jsonOutput = {
      id: 13,
      url: thumbnailUrls[0] || imageUrls[0],
      category: "Festa",
      title: "Carol & Ricardo",
      album: imageUrls
    };

    // Salvar em arquivo
    const outputPath = path.join(__dirname, '../carol-ricardo-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));

    console.log('✅ URLs extraídas com sucesso!');
    console.log(`\n📄 Arquivo salvo em: ${outputPath}`);
    console.log('\n📋 Próximos passos:');
    console.log('   1. Revise o arquivo carol-ricardo-urls.json');
    console.log('   2. Copie o conteúdo para o images.json');
    console.log('   3. Ajuste o ID se necessário');
    console.log('   4. Adicione mais fotos no array "album" se necessário');
    
    console.log('\n📝 Exemplo para images.json:');
    console.log(JSON.stringify(jsonOutput, null, 2));

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.log('\n💡 Dica: A collection pode requerer acesso autenticado.');
    console.log('   Use o método manual descrito acima.');
  }
}

main();
