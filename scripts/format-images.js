const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');

function formatMarkdownImages() {
  console.log('--- Formatting Markdown Images with spacing ---');
  const files = fs.readdirSync(DOCS_DIR);
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(DOCS_DIR, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && path.extname(file).toLowerCase() === '.md') {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split(/\r?\n/);
      const newLines = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // 画像参照構文 ![alt](path) が含まれているかチェック
        // ただし、リンク [text](path) との誤認を防ぐため ! から始まるパターン
        if (/!\[.*?\]\(.*?\)/.test(line)) {
          // 1. 画像の前に空行を入れる（最初の行でなく、かつ前の行が空行でもない場合）
          if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
            newLines.push('');
          }
          
          newLines.push(line);
          
          // 2. 画像の後に空行を入れる（最後の行でなく、かつ次の行が空行でもない場合）
          if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
            newLines.push('');
          }
        } else {
          newLines.push(line);
        }
      }

      const newContent = newLines.join('\n');
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Formatted image spacing in: ${file}`);
        updatedCount++;
      }
    }
  });

  console.log(`Completed spacing formatting for ${updatedCount} Markdown files.`);
}

try {
  formatMarkdownImages();
} catch (err) {
  console.error('Error formatting markdown images:', err);
  process.exit(1);
}
