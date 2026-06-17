const fs = require('fs');
const content = fs.readFileSync('src/components/sections/LeetcodeSection.tsx', 'utf8');

const s3 = content.indexOf('          {/* 3. HEATMAP */}');
const s4 = content.indexOf('          {/* 4. RECENT SUBMISSIONS */}');
const s5 = content.indexOf('          {/* 5. CONTESTS PARTICIPATED */}');
const s6 = content.indexOf('          {/* 6. ACHIEVEMENTS */}');
const end = content.indexOf('        </div>', s6);

if (s3 === -1 || s4 === -1 || s5 === -1 || s6 === -1 || end === -1) {
  console.error('Could not find markers');
  process.exit(1);
}

const pre = content.substring(0, s3);
const heatmap = content.substring(s3, s4);
const recent = content.substring(s4, s5);
const contests = content.substring(s5, s6);
const achievements = content.substring(s6, end);
const post = content.substring(end);

const newContent = pre + contests + achievements + heatmap + recent + post;

fs.writeFileSync('src/components/sections/LeetcodeSection.tsx', newContent);
console.log('Reordered successfully');
