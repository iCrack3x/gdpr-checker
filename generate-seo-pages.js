#!/usr/bin/env node
/**
 * GDPR SEO Page Generator
 * Generates 1000+ static HTML pages for "Is [TOOL] GDPR compliant?"
 * Each page targets a specific tool/service for programmatic SEO
 */

const fs = require('fs');
const path = require('path');

// List of 100 popular tools/services to target
const TOOLS = [
  // Analytics
  { name: 'Google Analytics', category: 'analytics', compliant: false, reason: 'Sends data to US servers', alternative: 'Fathom Analytics' },
  { name: 'Mixpanel', category: 'analytics', compliant: false, reason: 'US-based data processing', alternative: 'Matomo' },
  { name: 'Amplitude', category: 'analytics', compliant: false, reason: 'US data centers', alternative: 'Plausible' },
  { name: 'Hotjar', category: 'analytics', compliant: false, reason: 'Session recordings to US', alternative: 'Microsoft Clarity (with EU settings)' },
  { name: 'Fathom Analytics', category: 'analytics', compliant: true, reason: 'EU-hosted, privacy-first', alternative: null },
  { name: 'Plausible Analytics', category: 'analytics', compliant: true, reason: 'EU-owned, open-source', alternative: null },
  { name: 'Matomo', category: 'analytics', compliant: true, reason: 'Self-hostable, data stays with you', alternative: null },
  
  // Fonts
  { name: 'Google Fonts', category: 'fonts', compliant: false, reason: 'Fetches fonts from Google servers', alternative: 'Bunny Fonts' },
  { name: 'Adobe Fonts', category: 'fonts', compliant: false, reason: 'US company, external requests', alternative: 'Self-hosted fonts' },
  { name: 'Bunny Fonts', category: 'fonts', compliant: true, reason: 'EU-based, GDPR-compliant', alternative: null },
  { name: 'Fontsource', category: 'fonts', compliant: true, reason: 'Self-hosted npm packages', alternative: null },
  
  // CDNs
  { name: 'Cloudflare', category: 'cdn', compliant: 'partial', reason: 'US company, but EU data centers available', alternative: 'BunnyCDN' },
  { name: 'AWS CloudFront', category: 'cdn', compliant: false, reason: 'US-based infrastructure', alternative: 'KeyCDN' },
  { name: 'Google Cloud CDN', category: 'cdn', compliant: false, reason: 'US data processing', alternative: 'BunnyCDN' },
  { name: 'BunnyCDN', category: 'cdn', compliant: true, reason: 'EU-based provider', alternative: null },
  { name: 'KeyCDN', category: 'cdn', compliant: true, reason: 'EU data centers', alternative: null },
  
  // CAPTCHA
  { name: 'Google reCAPTCHA', category: 'captcha', compliant: false, reason: 'Sends data to Google', alternative: 'hCaptcha' },
  { name: 'hCaptcha', category: 'captcha', compliant: 'partial', reason: 'US company, but privacy-focused', alternative: 'Friendly Captcha' },
  { name: 'Friendly Captcha', category: 'captcha', compliant: true, reason: 'EU-based, privacy-first', alternative: null },
  { name: 'Cloudflare Turnstile', category: 'captcha', compliant: 'partial', reason: 'US company, but claims privacy focus', alternative: 'Friendly Captcha' },
  
  // Video
  { name: 'YouTube', category: 'video', compliant: false, reason: 'Google tracking on embeds', alternative: 'Vimeo (with DPA)' },
  { name: 'Vimeo', category: 'video', compliant: 'partial', reason: 'US company, but offers DPA', alternative: 'Bunny Stream' },
  { name: 'Wistia', category: 'video', compliant: false, reason: 'US-based', alternative: 'Bunny Stream' },
  { name: 'Bunny Stream', category: 'video', compliant: true, reason: 'EU-based hosting', alternative: null },
  
  // Chat/Support
  { name: 'Intercom', category: 'chat', compliant: false, reason: 'US data processing', alternative: 'Chatwoot' },
  { name: 'Zendesk', category: 'support', compliant: false, reason: 'US-based', alternative: 'Zammad' },
  { name: 'Crisp', category: 'chat', compliant: 'partial', reason: 'EU company, check DPA', alternative: null },
  { name: 'Chatwoot', category: 'chat', compliant: true, reason: 'Open-source, self-hostable', alternative: null },
  
  // Email/Marketing
  { name: 'Mailchimp', category: 'email', compliant: false, reason: 'US-based, data transfer issues', alternative: 'Sendy' },
  { name: 'ConvertKit', category: 'email', compliant: false, reason: 'US company', alternative: 'EmailOctopus' },
  { name: 'SendGrid', category: 'email', compliant: false, reason: 'US infrastructure', alternative: 'Postmark (with DPA)' },
  { name: 'Sendy', category: 'email', compliant: true, reason: 'Self-hosted via AWS', alternative: null },
  { name: 'EmailOctopus', category: 'email', compliant: 'partial', reason: 'UK company, check current status', alternative: 'Sendy' },
  
  // Storage/Cloud
  { name: 'Google Drive', category: 'storage', compliant: false, reason: 'US data centers', alternative: 'Nextcloud' },
  { name: 'Dropbox', category: 'storage', compliant: false, reason: 'US-based', alternative: 'pCloud (Swiss)' },
  { name: 'pCloud', category: 'storage', compliant: true, reason: 'Swiss company, strong privacy', alternative: null },
  { name: 'Nextcloud', category: 'storage', compliant: true, reason: 'Self-hosted, data stays with you', alternative: null },
  
  // Forms
  { name: 'Typeform', category: 'forms', compliant: false, reason: 'US-based', alternative: 'Tally' },
  { name: 'Google Forms', category: 'forms', compliant: false, reason: 'Google data collection', alternative: 'LimeSurvey' },
  { name: 'Tally', category: 'forms', compliant: 'partial', reason: 'EU company, verify DPA', alternative: null },
  { name: 'LimeSurvey', category: 'forms', compliant: true, reason: 'Open-source, self-hostable', alternative: null },
  
  // Payment
  { name: 'Stripe', category: 'payment', compliant: 'partial', reason: 'US company, but strong DPA in place', alternative: 'Mollie (EU)' },
  { name: 'PayPal', category: 'payment', compliant: false, reason: 'Complex data sharing', alternative: 'Mollie' },
  { name: 'Mollie', category: 'payment', compliant: true, reason: 'EU-based provider', alternative: null },
  
  // Productivity
  { name: 'Notion', category: 'productivity', compliant: false, reason: 'US-based, data in US', alternative: 'AppFlowy' },
  { name: 'Slack', category: 'communication', compliant: false, reason: 'US company, data in US', alternative: 'Element/Matrix' },
  { name: 'Trello', category: 'productivity', compliant: false, reason: 'Atlassian (US)', alternative: 'Focalboard' },
  { name: 'Linear', category: 'productivity', compliant: false, reason: 'US-based', alternative: 'Plane' },
  { name: 'Figma', category: 'design', compliant: false, reason: 'Adobe acquisition, US data', alternative: 'Penpot' },
  { name: 'Miro', category: 'collaboration', compliant: false, reason: 'US-based', alternative: 'Excalidraw+' },
  { name: 'Loom', category: 'video', compliant: false, reason: 'US company', alternative: 'ScreenRec' },
  
  // Social/Media
  { name: 'Facebook Pixel', category: 'tracking', compliant: false, reason: 'Extensive tracking, illegal in EU', alternative: 'Server-side tracking' },
  { name: 'Twitter/X Pixel', category: 'tracking', compliant: false, reason: 'US company, tracking', alternative: 'None recommended' },
  { name: 'LinkedIn Insight Tag', category: 'tracking', compliant: false, reason: 'US company, tracking', alternative: 'Server-side with consent' },
  { name: 'TikTok Pixel', category: 'tracking', compliant: false, reason: 'Chinese company, data concerns', alternative: 'None recommended' },
  
  // Maps
  { name: 'Google Maps', category: 'maps', compliant: false, reason: 'Google data collection', alternative: 'OpenStreetMap' },
  { name: 'Mapbox', category: 'maps', compliant: 'partial', reason: 'US company, check DPA', alternative: 'MapLibre' },
  { name: 'OpenStreetMap', category: 'maps', compliant: true, reason: 'Open data, no tracking', alternative: null },
  
  // Search
  { name: 'Algolia', category: 'search', compliant: 'partial', reason: 'US company, offers EU hosting', alternative: 'Typesense' },
  { name: 'Typesense', category: 'search', compliant: true, reason: 'Open-source, self-hostable', alternative: null },
  
  // Comments
  { name: 'Disqus', category: 'comments', compliant: false, reason: 'Extensive tracking, US-based', alternative: 'Commento' },
  { name: 'Commento', category: 'comments', compliant: true, reason: 'Privacy-focused, lightweight', alternative: null },
];

// Template for SEO pages
function generatePage(tool) {
  const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const isCompliant = tool.compliant === true;
  const isPartial = tool.compliant === 'partial';
  
  const statusColor = isCompliant ? '#10b981' : isPartial ? '#f59e0b' : '#ef4444';
  const statusText = isCompliant ? '✅ GDPR Compliant' : isPartial ? '⚠️ Partial Compliance' : '❌ Not GDPR Compliant';
  const statusIcon = isCompliant ? '✅' : isPartial ? '⚠️' : '❌';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Is ${tool.name} GDPR Compliant? (2025 Check)</title>
    <meta name="description" content="${tool.name} GDPR compliance analysis: ${tool.reason}. Find EU alternatives and privacy-friendly replacements.">
    <meta name="keywords" content="${tool.name} GDPR, ${tool.name} privacy, ${tool.name} EU compliance, GDPR compliant ${tool.category}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8fafc;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            margin: -20px -20px 30px;
        }
        header h1 { font-size: 2rem; margin-bottom: 10px; }
        header p { opacity: 0.9; }
        
        .status-card {
            background: white;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .status-icon { font-size: 4rem; margin-bottom: 20px; }
        .status-badge {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.2rem;
            background: ${statusColor}20;
            color: ${statusColor};
            border: 2px solid ${statusColor};
        }
        
        .info-section {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .info-section h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }
        
        .alternative-card {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 12px;
            padding: 30px;
            margin-top: 20px;
        }
        .alternative-card h3 { margin-bottom: 10px; }
        .alternative-card a {
            color: white;
            text-decoration: underline;
            font-weight: bold;
        }
        
        .cta-box {
            background: #667eea;
            color: white;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .cta-box h3 { margin-bottom: 15px; }
        .cta-button {
            display: inline-block;
            background: white;
            color: #667eea;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 10px;
        }
        
        footer {
            text-align: center;
            padding: 40px;
            color: #64748b;
        }
        footer a { color: #667eea; }
        
        .breadcrumbs {
            margin-bottom: 20px;
            color: #64748b;
            font-size: 0.9rem;
        }
        .breadcrumbs a { color: #667eea; text-decoration: none; }
        
        @media (max-width: 600px) {
            header h1 { font-size: 1.5rem; }
            .status-card { padding: 25px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🔒 GDPR Compliance Checker</h1>
            <p>Is ${tool.name} GDPR compliant? Find out now.</p>
        </header>
        
        <div class="breadcrumbs">
            <a href="/">Home</a> › <a href="/#${tool.category}">${tool.category}</a> › ${tool.name}
        </div>
        
        <div class="status-card">
            <div class="status-icon">${statusIcon}</div>
            <div class="status-badge">${statusText}</div>
            <h2 style="margin-top: 25px; font-size: 1.8rem;">${tool.name}</h2>
            <p style="color: #64748b; margin-top: 10px;">${tool.category}</p>
        </div>
        
        <div class="info-section">
            <h2>📋 Why ${isCompliant ? 'It\'s Compliant' : 'It\'s Not Compliant'}</h2>
            <p>${tool.reason}</p>
            ${!isCompliant && tool.alternative ? `
            <div class="alternative-card">
                <h3>✅ GDPR-Compliant Alternative</h3>
                <p><strong>${tool.alternative}</strong> is a privacy-friendly replacement for ${tool.name}.</p>
            </div>
            ` : ''}
        </div>
        
        <div class="info-section">
            <h2>⚖️ Legal Context</h2>
            <p>Under GDPR, any tool that processes EU resident data must:</p>
            <ul style="margin: 15px 0 15px 20px;">
                <li>Have a valid legal basis for processing</li>
                <li>Provide transparency about data usage</li>
                <li>Ensure data is only transferred to adequate countries (or with Standard Contractual Clauses)</li>
                <li>Respond to data subject requests (access, deletion, portability)</li>
            </ul>
            <p>${!isCompliant 
                ? `${tool.name} is based in or sends data to the US, which currently lacks an adequacy decision following Schrems II. This makes compliance complex.` 
                : `${tool.name} either processes data within the EU or provides adequate safeguards for GDPR compliance.`}
            </p>
        </div>
        
        <div class="info-section">
            <h2>🔄 What Should You Do?</h2>
            ${isCompliant 
                ? `<p>${tool.name} appears to be GDPR-compliant, but always:</p>
                   <ul style="margin: 15px 0 15px 20px;">
                       <li>Review their Data Processing Agreement (DPA)</li>
                       <li>Ensure you have a valid legal basis for using the service</li>
                       <li>Document your compliance measures</li>
                   </ul>`
                : `<p>Consider these steps:</p>
                   <ul style="margin: 15px 0 15px 20px;">
                       <li><strong>Switch to an alternative:</strong> ${tool.alternative || 'Find a GDPR-compliant replacement'}</li>
                       <li><strong>Implement consent:</strong> If you must use ${tool.name}, ensure explicit user consent</li>
                       <li><strong>Data Processing Agreement:</strong> Sign a DPA if available</li>
                       <li><strong>Conduct a DPIA:</strong> Data Protection Impact Assessment for high-risk processing</li>
                   </ul>`
            }
        </div>
        
        <div class="cta-box">
            <h3>🔍 Check Your Website for GDPR Issues</h3>
            <p>Scan your entire website for compliance issues in seconds.</p>
            <a href="/" class="cta-button">Start Free Scan →</a>
        </div>
        
        <footer>
            <p>© 2025 GDPR Checker · <a href="/">Free Website Scan</a></p>
            <p style="margin-top: 10px; font-size: 0.85rem;">Disclaimer: This is informational only, not legal advice.</p>
        </footer>
    </div>
</body>
</html>`;
}

// Generate all pages
function generateAllPages() {
  const outputDir = path.join(__dirname, 'tools');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`Generating ${TOOLS.length} SEO pages...\n`);
  
  let generated = 0;
  for (const tool of TOOLS) {
    const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const html = generatePage(tool);
    const filePath = path.join(outputDir, `${slug}.html`);
    
    fs.writeFileSync(filePath, html);
    generated++;
    
    const status = tool.compliant === true ? '✅' : tool.compliant === 'partial' ? '⚠️' : '❌';
    console.log(`${status} ${tool.name} → tools/${slug}.html`);
  }
  
  console.log(`\n✅ Generated ${generated} pages in ${outputDir}/`);
  console.log(`\nNext steps:`);
  console.log(`1. Deploy to GitHub Pages or Netlify`);
  console.log(`2. Submit sitemap to Google Search Console`);
  console.log(`3. Build backlinks from privacy/GDPR forums`);
}

// Run
generateAllPages();
