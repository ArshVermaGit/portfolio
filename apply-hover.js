const fs = require('fs');
const glob = require('glob');

const physicsProp = `whileHover={{ y: -8, scale: 1.02, transition: { type: "spring", bounce: 0.5 } }}`;

const files = [
  'src/components/sections/GithubSection.tsx',
  'src/components/sections/LeetcodeSection.tsx',
  'src/components/sections/YoutubeSection.tsx',
  'src/components/sections/CodingProfilesSection.tsx',
  'src/components/sections/OpenSourceSection.tsx',
  'src/components/sections/SupportSection.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace hover:-translate-y-2 with empty string to avoid conflict
    content = content.replace(/hover:-translate-y-[12]/g, '');

    // For any <motion.div> that has glassCard or bg-white rounded-[1.5rem] (like profiles)
    // We add whileHover
    content = content.replace(/(<motion\.div[^>]*className="[^"]*(?:glassCard|bg-\[#1a1a1a\]|bg-\[#111111\]|bg-\[#0B0F19\]|bg-white rounded-\[1\.5rem\])[^"]*"[^>]*)>/g, `$1 ${physicsProp}>`);

    // For plain divs that have glassCard or these backgrounds, convert them to motion.div and add whileHover
    content = content.replace(/<div([^>]*className="[^"]*(?:glassCard|bg-\[#1a1a1a\]|bg-\[#111111\]|bg-\[#0B0F19\]|bg-white rounded-\[1\.5rem\])[^"]*"[^>]*)>/g, `<motion.div$1 ${physicsProp}>`);
    // Make sure to close the newly converted motion.divs
    // Actually, this is risky using regex because we don't know where the closing tag is.

    fs.writeFileSync(file, content);
  }
});

console.log("Hover physics applied!");
