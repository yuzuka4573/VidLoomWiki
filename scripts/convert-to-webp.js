const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const IMAGE_DIR = path.join(DOCS_DIR, 'image');

// 1. 画像の変換
function convertImages() {
  console.log('--- Converting images to WebP ---');
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error(`Image directory does not exist: ${IMAGE_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGE_DIR);
  let convertedCount = 0;

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const srcPath = path.join(IMAGE_DIR, file);
      const baseName = path.basename(file, ext);
      const destPath = path.join(IMAGE_DIR, `${baseName}.webp`);

      console.log(`Converting: ${file} -> ${baseName}.webp`);
      try {
        // cwebpコマンドを実行してWebPに変換 (品質はデフォルト80)
        execSync(`cwebp -q 80 "${srcPath}" -o "${destPath}"`, { stdio: 'ignore' });
        
        // 変換が成功したら元のファイルを削除
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(srcPath);
          convertedCount++;
        }
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err.message);
      }
    }
  });

  console.log(`Successfully converted ${convertedCount} images to WebP.`);
}

// 2. マークダウン内の画像リンクを書き換える
function updateMarkdownReferences() {
  console.log('--- Updating Markdown References ---');
  const files = fs.readdirSync(DOCS_DIR);
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(DOCS_DIR, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(file).toLowerCase() === '.md') {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 画像パスの置換: `image/xxx.png` などを `image/xxx.webp` に置換
      // `(image/...)` または `[...](image/...)` のパターンに対応
      const regex = /(image\/[^\s)]+)\.(png|jpg|jpeg)/gi;
      
      if (regex.test(content)) {
        content = content.replace(regex, '$1.webp');
        
        // 追加の修正: 全角の「！」を半角の「!」に修正（Markdownの画像埋め込み構文エラー修正）
        content = content.replace(/！\[/g, '![');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated references in: ${file}`);
        updatedCount++;
      } else {
        // 念のため、全角「！」の修正だけがある場合も考慮
        if (content.includes('！[')) {
          content = content.replace(/！\[/g, '![');
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Fixed full-width exclamation in: ${file}`);
          updatedCount++;
        }
      }
    }
  });

  console.log(`Updated references in ${updatedCount} Markdown files.`);
}

// 実行
try {
  convertImages();
  updateMarkdownReferences();
  console.log('Conversion and link update completed successfully!');
} catch (error) {
  console.error('An error occurred during execution:', error);
  process.exit(1);
}
