import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUTPUT_BASE = path.join(ROOT, 'public/brand-assets/brand-page-level/hero-banners');
const TMP = '/tmp/hero-downloads';

mkdirSync(TMP, { recursive: true });

const TARGET_W = 2000;
const TARGET_H = 650;

const brands = {
  gymshark: [
    'https://images.ctfassets.net/wl6q2in9o7k3/4OuN0MPZLEDYafVFgtcOCg/16cf0e76520ae84f3f33198cb9312f80/App_-_25876605.jpeg',
    'https://images.ctfassets.net/wl6q2in9o7k3/6MPKClTJFiE9HpbRWbiJ7w/9b90bb89f51b03ead1144535644985ff/Headless_Mobile_-_25910693.jpeg',
    'https://images.ctfassets.net/wl6q2in9o7k3/3twn5fgETzXo3SEY14tOA7/cb1c981a1bec2def152cacf0807835b3/Headless_Desktop_-_25910682.jpeg',
  ],
  'alo-yoga': [
    'https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2025%2F12%2F08%2FFULL_JPG-ALO_101725_WT25_Campaign_08_02866-scaled-e1765200828555.jpg',
    'https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2025%2F12%2F08%2FFULL_JPG-ALO_101725_WT25_Campaign_10_03469-e1765200871409.jpg',
    'https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2025%2F12%2F08%2FFULL_JPG-ALO_101725_WT25_Campaign_18_05392-e1765200885501.jpg',
  ],
  vuori: [
    'https://cdn.bfldr.com/JUZN72U0/at/b3274qn3w58cc33bkmpgqv/0323_video_fallback_Desktop.png?auto=webp',
    'https://cdn.bfldr.com/JUZN72U0/at/9pnr275qpb4nvc2b2kx96bj7/0323_HP_Womens_Sub_blissblend_Desktop.png?auto=webp',
    'https://cdn.shopify.com/s/files/1/0022/4008/6074/files/SP26_JAMAICA_MS_0497-2048x2560-c99f7f7_1.jpg?v=1774041659',
  ],
};

// Inline sharp processing via node -e
async function processImage(inputPath, outputPath) {
  const script = `
    const sharp = require('sharp');
    sharp('${inputPath}')
      .resize(${TARGET_W}, ${TARGET_H}, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile('${outputPath}')
      .then(() => console.log('OK'))
      .catch(e => { console.error(e.message); process.exit(1); });
  `;
  execSync(`node -e "${script.replace(/\n/g, ' ').replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
}

for (const [brand, urls] of Object.entries(brands)) {
  const outDir = path.join(OUTPUT_BASE, brand);
  mkdirSync(outDir, { recursive: true });
  console.log(`\n=== ${brand} ===`);

  for (let i = 0; i < urls.length; i++) {
    const num = i + 1;
    const tmpFile = path.join(TMP, `${brand}-hero-${num}.tmp`);
    const outFile = path.join(outDir, `hero-${num}.jpg`);

    console.log(`  Downloading hero-${num}...`);
    try {
      execSync(`curl -L -s -o "${tmpFile}" "${urls[i]}"`, { stdio: 'inherit' });
      console.log(`  Processing hero-${num}...`);
      execSync(
        `node -e "const sharp=require('sharp');sharp('${tmpFile}').resize(${TARGET_W},${TARGET_H},{fit:'cover',position:'centre'}).jpeg({quality:90}).toFile('${outFile}').then(()=>process.stdout.write('done\\n')).catch(e=>{process.stderr.write(e.message+'\\n');process.exit(1);})"`,
        { stdio: 'inherit' }
      );
      console.log(`  -> ${outFile}`);
    } catch (e) {
      console.error(`  FAILED: ${e.message}`);
    }
  }
}

console.log('\nDone!');
