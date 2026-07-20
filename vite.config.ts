import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'update-og-meta',
        closeBundle() {
          const distAssetsPath = path.resolve(__dirname, 'dist/assets');
          const distIndexPath = path.resolve(__dirname, 'dist/index.html');
          
          if (fs.existsSync(distAssetsPath)) {
            const files = fs.readdirSync(distAssetsPath);
            const bookCoverFile = files.find(file => file.startsWith('book_cover_1783150653654-') && file.endsWith('.jpeg'));
            if (bookCoverFile && fs.existsSync(distIndexPath)) {
              let html = fs.readFileSync(distIndexPath, 'utf-8');
              
              // Replace the meta tags
              html = html.replace(
                /<meta property="og:image" content="[^"]*"[^>]*>/g,
                `<meta property="og:image" content="https://allanconceicao.com.br/assets/${bookCoverFile}">`
              );
              html = html.replace(
                /<meta name="twitter:image" content="[^"]*"[^>]*>/g,
                `<meta name="twitter:image" content="https://allanconceicao.com.br/assets/${bookCoverFile}">`
              );
              
              fs.writeFileSync(distIndexPath, html, 'utf-8');
              console.log(`[Plugin] Updated Open Graph and Twitter image to: https://allanconceicao.com.br/assets/${bookCoverFile}`);
            } else {
              console.warn('[Plugin] Could not find compiled book_cover or dist/index.html');
            }
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
