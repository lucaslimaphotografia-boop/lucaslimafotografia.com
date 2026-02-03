import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'copy-seo-files',
          closeBundle() {
            const root = path.resolve(__dirname);
            const dist = path.resolve(__dirname, 'dist');
            for (const file of ['robots.txt', 'sitemap.xml']) {
              const src = path.join(root, file);
              const dest = path.join(dist, file);
              if (fs.existsSync(src)) {
                fs.copyFileSync(src, dest);
              }
            }
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
