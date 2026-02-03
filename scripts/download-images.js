#!/usr/bin/env node

/**
 * Script para baixar imagens automaticamente de um site antigo
 * 
 * Uso:
 *   node scripts/download-images.js <URL_DO_SITE> [opções]
 * 
 * Exemplos:
 *   node scripts/download-images.js https://site-antigo.com/galeria
 *   node scripts/download-images.js https://site-antigo.com/galeria --output ./fotos
 *   node scripts/download-images.js https://site-antigo.com/galeria --max 50
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const DEFAULT_OUTPUT = path.join(__dirname, '../downloads');
const DEFAULT_MAX_IMAGES = 100;

// Parse argumentos
const args = process.argv.slice(2);
const url = args[0];
let outputDir = DEFAULT_OUTPUT;
let maxImages = DEFAULT_MAX_IMAGES;
let filterPattern = null;

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--output' && args[i + 1]) {
    outputDir = path.resolve(args[i + 1]);
    i++;
  } else if (args[i] === '--max' && args[i + 1]) {
    maxImages = parseInt(args[i + 1]);
    i++;
  } else if (args[i] === '--filter' && args[i + 1]) {
    filterPattern = new RegExp(args[i + 1]);
    i++;
  }
}

if (!url) {
  console.error('❌ Erro: URL não fornecida');
  console.log('\nUso: node scripts/download-images.js <URL> [opções]');
  console.log('\nOpções:');
  console.log('  --output <pasta>  Pasta onde salvar as imagens (padrão: ./downloads)');
  console.log('  --max <número>    Número máximo de imagens (padrão: 100)');
  console.log('  --filter <regex>  Filtrar URLs por padrão (ex: "gallery|photo")');
  console.log('\nExemplos:');
  console.log('  node scripts/download-images.js https://site-antigo.com/galeria');
  console.log('  node scripts/download-images.js https://site-antigo.com --max 200 --output ./minhas-fotos');
  process.exit(1);
}

// Criar pasta de output
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✅ Pasta criada: ${outputDir}`);
}

// Função para fazer requisição HTTP
function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

// Função para baixar uma imagem
async function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);
    
    // Se já existe, pular
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Já existe: ${filename}`);
      resolve(filepath);
      return;
    }

    const client = imageUrl.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    client.get(imageUrl, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Baixado: ${filename}`);
          resolve(filepath);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Erro ${response.statusCode}: ${imageUrl}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

// Função para extrair URLs de imagens do HTML
function extractImageUrls(html, baseUrl) {
  const urls = new Set();
  
  // Regex para encontrar tags img
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    let url = match[1];
    
    // Converter URL relativa para absoluta
    if (url.startsWith('//')) {
      url = 'https:' + url;
    } else if (url.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      url = urlObj.origin + url;
    } else if (!url.startsWith('http')) {
      const urlObj = new URL(baseUrl);
      url = new URL(url, baseUrl).href;
    }
    
    // Filtrar se necessário
    if (filterPattern && !filterPattern.test(url)) {
      continue;
    }
    
    // Filtrar apenas imagens (jpg, jpeg, png, webp, etc)
    if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(url)) {
      urls.add(url);
    }
  }
  
  // Também procurar em background-image
  const bgRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    let url = match[1];
    if (url.startsWith('//')) {
      url = 'https:' + url;
    } else if (url.startsWith('/')) {
      const urlObj = new URL(baseUrl);
      url = urlObj.origin + url;
    } else if (!url.startsWith('http')) {
      url = new URL(url, baseUrl).href;
    }
    
    if (filterPattern && !filterPattern.test(url)) {
      continue;
    }
    
    if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(url)) {
      urls.add(url);
    }
  }
  
  return Array.from(urls);
}

// Função principal
async function main() {
  console.log('🚀 Iniciando download de imagens...\n');
  console.log(`📁 URL: ${url}`);
  console.log(`💾 Pasta de destino: ${outputDir}`);
  console.log(`📊 Máximo de imagens: ${maxImages}\n`);

  try {
    // 1. Baixar HTML da página
    console.log('📥 Baixando HTML da página...');
    const response = await fetch(url);
    
    if (response.status !== 200) {
      throw new Error(`Erro ao acessar a página: ${response.status}`);
    }

    // 2. Extrair URLs de imagens
    console.log('🔍 Procurando imagens...');
    const imageUrls = extractImageUrls(response.data, url);
    
    console.log(`\n📸 Encontradas ${imageUrls.length} imagens`);
    
    if (imageUrls.length === 0) {
      console.log('❌ Nenhuma imagem encontrada. Tente:');
      console.log('   - Verificar se a URL está correta');
      console.log('   - Usar --filter para filtrar URLs específicas');
      console.log('   - Verificar se o site não bloqueia acesso programático');
      return;
    }

    // Limitar número de imagens
    const urlsToDownload = imageUrls.slice(0, maxImages);
    console.log(`📥 Baixando ${urlsToDownload.length} imagens...\n`);

    // 3. Baixar cada imagem
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < urlsToDownload.length; i++) {
      const imageUrl = urlsToDownload[i];
      const urlObj = new URL(imageUrl);
      const filename = path.basename(urlObj.pathname) || `image-${i + 1}.jpg`;
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      try {
        const filepath = await downloadImage(imageUrl, safeFilename);
        results.push({
          url: imageUrl,
          filename: safeFilename,
          localPath: filepath
        });
        successCount++;
        
        // Pequeno delay para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Erro ao baixar ${safeFilename}: ${error.message}`);
        errorCount++;
      }
    }

    // 4. Gerar JSON com resultados
    const jsonPath = path.join(outputDir, 'images-metadata.json');
    fs.writeFileSync(jsonPath, JSON.stringify({
      sourceUrl: url,
      downloadDate: new Date().toISOString(),
      totalFound: imageUrls.length,
      totalDownloaded: successCount,
      totalErrors: errorCount,
      images: results
    }, null, 2));

    console.log('\n✅ Download concluído!');
    console.log(`\n📊 Estatísticas:`);
    console.log(`   ✅ Baixadas: ${successCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`   📁 Pasta: ${outputDir}`);
    console.log(`   📄 Metadados: ${jsonPath}`);
    console.log('\n💡 Próximos passos:');
    console.log('   1. Revise as imagens baixadas');
    console.log('   2. Faça upload para Cloudinary ou outro serviço');
    console.log('   3. Use o arquivo images-metadata.json como referência');
    console.log('   4. Atualize o images.json com as novas URLs');

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    console.error('\n💡 Dicas:');
    console.error('   - Verifique se a URL está correta');
    console.error('   - Alguns sites bloqueiam acesso programático');
    console.error('   - Tente usar um navegador para verificar se as imagens estão acessíveis');
    process.exit(1);
  }
}

main();
