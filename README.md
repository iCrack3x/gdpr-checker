# GDPR Website Checker 🛡️

Ein kostenloses Tool zur Überprüfung von Websites auf DSGVO/GDPR-Konformität.

## Features

- 🔍 **Automatischer Scan** — Erkennt Tracking-Tools & Datenschutz-Probleme
- 📊 **GDPR-Score** — Einfache 0-100% Bewertung
- 🚨 **Issue-Erkennung**:
  - Google Fonts (US-Datentransfer)
  - Google Analytics (Tracking)
  - Facebook Pixel (Cross-Site Tracking)
  - Hotjar (Session-Recording)
  - reCAPTCHA (Google-Datenweitergabe)
  - Cloudflare CDN (US-Infrastruktur)
  - YouTube Embeds (Tracking)
- ✅ **DSGVO-konforme Alternativen** — Für jedes Problem eine Lösung

## Programmatic SEO

Das Projekt enthält **62 SEO-Seiten** für Tools:
- `/tools/google-analytics.html`
- `/tools/google-fonts.html`
- `/tools/hotjar.html`
- ...und 59 weitere

Jede Seite targetet Keywords wie "Is [Tool] GDPR compliant?"

## Deployment

### GitHub Pages (Kostenlos)

1. **Repository erstellen:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/gdpr-checker.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren:**
   - Repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save

3. **Fertig!** Dein Tool ist live unter:
   `https://yourusername.github.io/gdpr-checker`

### Netlify (Drag & Drop)

1. `gdpr-checker/` Ordner als ZIP packen
2. Auf [netlify.com](https://netlify.com) hochladen
3. Fertig!

## Lokale Entwicklung

```bash
cd gdpr-checker
python3 -m http.server 8000
# Oder: npx serve .
```

Dann öffnen: `http://localhost:8000`

## SEO-Pages neu generieren

```bash
# Neue Tool-Seiten generieren
node generate-seo-pages.js

# Sitemap aktualisieren
node generate-sitemap.js
```

## Monetarisierung

1. **Lead-Gen**: E-Mails sammeln für "vollständigen Compliance-Report"
2. **Affiliate-Links**: Zu DSGVO-konformen Alternativen
   - Fathom Analytics (€)
   - Bunny Fonts (kostenlos)
   - BunnyCDN (€)
   - Matomo (Open Source)
3. **Programmatic SEO**: 1000+ Seiten generieren für organischen Traffic

## Struktur

```
gdpr-checker/
├── index.html           # Haupt-Checker
├── tools/               # 62 SEO-Seiten für einzelne Tools
│   ├── google-analytics.html
│   ├── google-fonts.html
│   └── ...
├── sitemap.xml          # Für Google Search Console
├── generate-seo-pages.js   # SEO-Page Generator
└── generate-sitemap.js     # Sitemap Generator
```

## Keywords (SEO)

- "GDPR checker"
- "Is Google Analytics GDPR compliant?"
- "GDPR compliant alternatives"
- "DSGVO Website prüfen"
- "Cookie checker"

## Lizenz

MIT — Nutzen, modifizieren, monetarisieren.

---

**Hinweis:** Dieses Tool ist keine Rechtsberatung. Für verbindliche Aussagen konsultiere einen Datenschutzrechtler.
