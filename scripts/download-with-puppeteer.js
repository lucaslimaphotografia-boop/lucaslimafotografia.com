#!/usr/bin/env node

/**
 * Versão avançada usando Puppeteer (requer instalação)
 * Melhor para sites com JavaScript dinâmico
 * 
 * Instalação:
 *   npm install puppeteer
 * 
 * Uso:
 *   node scripts/download-with-puppeteer.js <URL>
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const url = args[0] || args.find(arg => arg.startsWith('http'));
const outputDir = args.includes('--output') 
  ? path.resolve(args[args.indexOf('--output') + 1])
  : path.join(__dirname, '../downloads');

if (!url) {
  console.error('❌ Erro: URL não fornecida');
  console.log('Uso: node scripts/download-with-puppeteer.js <URL>');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);
    if (fs.existsSync(filepath)) {
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
          console.log(`✅ ${filename}`);
          resolve(filepath);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Erro ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Iniciando com Puppeteer...\n');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log(`📥 Acessando: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Aguardar carregamento de imagens lazy
    await page.waitForTimeout(3000);
    
    // Scroll para carregar imagens lazy
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(2000);
    
    // Extrair todas as URLs de imagens
    const imageUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const urls = new Set();
      
      images.forEach(img => {
        const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
        if (src && /\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i.test(src)) {
          urls.add(src);
        }
      });
      
      // Também procurar em background-image
      const elements = Array.from(document.querySelectorAll('[style*="background-image"]'));
      elements.forEach(el => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(["']?([^"')]+)["']?\)/);
        if (match && /\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i.test(match[1])) {
          urls.add(match[1]);
        }
      });
      
      return Array.from(urls);
    });
    
    console.log(`\n📸 Encontradas ${imageUrls.length} imagens\n`);
    
    const results = [];
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const urlObj = new URL(imageUrl);
      const filename = path.basename(urlObj.pathname) || `image-${i + 1}.jpg`;
      const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      try {
        const filepath = await downloadImage(imageUrl, safeFilename);
        results.push({ url: imageUrl, filename: safeFilename, localPath: filepath });
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Erro: ${safeFilename}`);
      }
    }
    
    const jsonPath = path.join(outputDir, 'images-metadata.json');
    fs.writeFileSync(jsonPath, JSON.stringify({
      sourceUrl: url,
      downloadDate: new Date().toISOString(),
      images: results
    }, null, 2));
    
    console.log(`\n✅ Concluído! ${results.length} imagens baixadas`);
    console.log(`📁 Pasta: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await browser.close();
  }
}

main();
