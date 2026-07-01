import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// 1. Read index.html
const indexHtmlPath = path.resolve('index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// 2. Backup index.html
const backupHtml = html;

// 3. Clean any existing asset script/link tags and restore main.tsx reference
html = html.replace(/<script type="module" crossorigin src="\/assets\/index-.*?\.js"><\/script>/g, '');
html = html.replace(/<link rel="stylesheet" crossorigin href="\/assets\/index-.*?\.css">/g, '');

if (!html.includes('/src/main.tsx')) {
  html = html.replace('</head>', '    <script type="module" src="/src/main.tsx"></script>\n  </head>');
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');

try {
  // 4. Run Vite build
  console.log('Running Vite build...');
  execSync('npx vite build', { stdio: 'inherit' });

  // 5. Copy built index.html to root
  const distIndexHtmlPath = path.resolve('dist/index.html');
  const distHtml = fs.readFileSync(distIndexHtmlPath, 'utf8');
  fs.writeFileSync(indexHtmlPath, distHtml, 'utf8');

  // 6. Copy dist/assets to assets
  console.log('Syncing assets to root assets/ folder...');
  const distAssetsDir = path.resolve('dist/assets');
  const rootAssetsDir = path.resolve('assets');
  
  if (fs.existsSync(rootAssetsDir)) {
    fs.rmSync(rootAssetsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(rootAssetsDir);
  
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(path.join(distAssetsDir, file), path.join(rootAssetsDir, file));
  }
  console.log('Build and sync complete!');
} catch (error) {
  console.error('Build failed, restoring backup index.html', error);
  fs.writeFileSync(indexHtmlPath, backupHtml, 'utf8');
  process.exit(1);
}
