# Guida al Deploy della PWA _Factory Starter App_

Questa guida spiega, passo-passo e in italiano, come pubblicare la PWA generata con Vite su quattro piattaforme diverse:

1. **Vercel** – opzione consigliata per la semplicità  
2. **Netlify** – alternativa altrettanto semplice  
3. **GitHub Pages** – soluzione gratuita basata su GitHub  
4. **Deploy manuale via SSH** – per server propri

---

## 0. Preparazione

```bash
# 1. Assicurati di essere nella root del progetto
cd factory-tutorial

# 2. Costruisci la versione di produzione
npm run pwa:build
```

Il comando genera la cartella `dist/` contenente:

| Tipo file | Percorso | Funzione |
|-----------|----------|----------|
| HTML      | `dist/index.html` | entry-point dell’app |
| JS/CSS    | `dist/assets/*.js, *.css` | bundle ottimizzato |
| Icone     | `dist/icons/*` | icone PWA |
| Manifest  | `dist/manifest.webmanifest` | metadati installazione |
| Service Worker | `dist/sw.js` (auto-generato da plug-in) | caching offline |

_Nelle procedure seguenti dovrai caricare **tutti i file dentro `dist/`**._

---

## 1. Deploy su Vercel (consigliato)

1. **Account** – crea/accedi a https://vercel.com  
2. **Importa repo** – Click _“Add New → Project”_ e seleziona il repository GitHub/GitLab.  
3. **Impostazioni build**  
   - Framework: `Vite` (rilevato automaticamente)  
   - Comando build: `npm run pwa:build`  
   - Output dir: `dist`  
4. **Deploy** – premi _“Deploy”_.  
5. **Preview & Production** – Vercel crea un link preview ad ogni push su branch e pubblica in produzione sul branch `main`.  

---

## 2. Deploy su Netlify

1. **Account** – https://app.netlify.com  
2. **New site from Git** → scegli il repository.  
3. **Build settings**  
   - Build command: `npm run pwa:build`  
   - Publish directory: `dist`  
4. **Deploy site** – Netlify avvia la build e pubblica.  
5. **Domain personalizzato** – dalla scheda _Domain Settings_ puoi aggiungere il tuo dominio.  

---

## 3. Deploy su GitHub Pages

> Richiede branch `gh-pages` o cartella `/docs` sul branch principale.

### Metodo automatico con _gh-pages_:

```bash
# Installa helper
npm install -D gh-pages

# Aggiungi in package.json
#  "scripts": {
#    "deploy": "gh-pages -d dist"
#  }

# Costruisci e pubblica
npm run pwa:build
npm run deploy
```

GitHub crea automaticamente l’URL:  
`https://<tuo-username>.github.io/<nome-repo>/`

Attiva Pages da **Settings → Pages** e seleziona il branch `gh-pages`, cartella `/`.

---

## 4. Deploy manuale via SSH

Prerequisiti:

- Accesso SSH al server (`user@host`)  
- Un server web (Nginx, Apache, Caddy, ecc.) che serva file statici  

### Copia dei file

```bash
# 1. Build locale
npm run pwa:build

# 2. Copia con scp (rimpiazza user@host:/var/www/pwa)
scp -r dist/* user@host:/var/www/pwa
```

### Configurazione Nginx di esempio

```
server {
    listen 80;
    server_name example.com;

    root /var/www/pwa;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- `try_files` garantisce che tutte le route SPA puntino a `index.html`.  
- Riavvia Nginx: `sudo systemctl reload nginx`.

---

## 5. Aggiornamenti e Cache

La PWA utilizza un **service worker** generato da Workbox (`vite-plugin-pwa`) con strategia _autoUpdate_. Ogni volta che fai deploy:

1. Il browser scarica il nuovo service worker in background.  
2. Alla successiva apertura dell’app l’utente riceve la versione aggiornata.  

Per forzare l’update immediato, cambia il numero di versione in `manifest.webmanifest` o svuota Cache-Control sul server.

---

## 6. Verifica post-deploy

- Apri l’URL di produzione nel browser.  
- Controlla _Application → Manifest_ in DevTools: “Install” deve essere disponibile.  
- Metti il device in _Offline_ → l’app deve continuare a funzionare.

---

Buon deploy! Per qualsiasi dubbio apri una _Issue_ o contattaci su Discord 🚀
