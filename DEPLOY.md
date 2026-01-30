# 🚀 DEPLOYMENT GUIDE

## Option 1: GitHub Pages (Empfohlen)

### Schritt 1: GitHub Repo erstellen
```bash
# Auf GitHub.com ein neues Repo erstellen z.B. "gdpr-checker"
# Dann lokal verbinden:

git remote add origin https://github.com/DEINUSERNAME/gdpr-checker.git
git branch -M main
git push -u origin main
```

### Schritt 2: GitHub Pages aktivieren
1. Gehe zu: https://github.com/DEINUSERNAME/gdpr-checker/settings/pages
2. Unter "Build and deployment":
   - Source: "Deploy from a branch"
   - Branch: "main" / "/ (root)"
3. Click "Save"
4. Warte 2-3 Minuten

### Schritt 3: Fertig!
Dein Tool ist live unter:
**`https://DEINUSERNAME.github.io/gdpr-checker`**

---

## Option 2: Netlify (Drag & Drop)

1. Ordner `gdpr-checker/` als ZIP packen
2. Gehe zu: https://app.netlify.com/drop
3. ZIP hochladen
4. Fertig! Sofort live mit HTTPS.

---

## Option 3: Vercel

```bash
npm i -g vercel
vercel --prod
```

---

## Nach dem Deployment

### 1. Sitemap einreichen
1. Gehe zu: https://search.google.com/search-console
2. Property hinzufügen: `https://DEINUSERNAME.github.io/gdpr-checker`
3. Gehe zu "Sitemaps"
4. Sitemap URL: `sitemap.xml`
5. Submit

### 2. Testen
- Hauptseite: `/`
- Tool-Seite: `/tools/google-analytics.html`
- Tools-Verzeichnis: `/tools/`

### 3. Analytics (optional)
- Fathom Analytics (GDPR-konform) empfohlen
- Oder: Kein Analytics (100% privacy)

---

## Troubleshooting

**Problem:** CORS-Proxy funktioniert nicht  
**Lösung:** Demo-Modus zeigt trotzdem Ergebnisse

**Problem:** GitHub Pages 404  
**Lösung:** Warte 5 Minuten nach Aktivierung

**Problem:** Sitemap nicht gefunden  
**Lösung:** URL muss `https://deinname.github.io/gdpr-checker/sitemap.xml` sein

---

## Monetarisierung aktivieren

### Affiliate-Links einfügen
Bearbeite die Tool-Seiten in `/tools/`:

1. **Fathom Analytics**: https://usefathom.com/ref/DEINCODE
2. **BunnyCDN**: https://bunny.net?ref=DEINCODE  
3. **Plausible**: https://plausible.io/?ref=DEINCODE

Oder: Füge Lead-Gen Formular hinzu für "Premium Report"

---

**Fertig! Viel Erfolg! 🎉**
