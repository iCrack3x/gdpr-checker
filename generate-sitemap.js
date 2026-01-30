const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://yourusername.github.io/gdpr-checker'; // Update this!

const toolsDir = path.join(__dirname, 'tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
${files.map(file => `  <url>
    <loc>${BASE_URL}/tools/${file}</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log(`✅ Generated sitemap.xml with ${files.length + 1} URLs`);
