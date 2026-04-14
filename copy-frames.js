const fs = require('fs');
const path = require('path');

const src = 'c:\\anim\\ezgif-621fdca560a5c94f-png-split';
const dest = 'c:\\anim\\public\\frames';

// Create dest dir
fs.mkdirSync(dest, { recursive: true });

// Copy all PNG files
const files = fs.readdirSync(src).filter(f => f.endsWith('.png'));
console.log(`Copying ${files.length} files...`);

files.forEach((file, i) => {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
  if ((i + 1) % 50 === 0) console.log(`  Copied ${i + 1}/${files.length}`);
});

console.log(`Done! Copied ${files.length} frames to ${dest}`);
