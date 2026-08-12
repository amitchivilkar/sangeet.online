# Sangeet Online

Minimal Marathi music radio for [sangeet.online](https://sangeet.online).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update playlist & categories

Edit only this file:

**[`content/catalog.mdx`](content/catalog.mdx)**

Example:

```yaml
stations:
  - id: shant-man
    label: "शांत मन"
    background: "/backgrounds/gavi.jpg"
    backgroundType: image
    youtubePlaylist: "PLLdn2P9_GMmc"
```

- `youtubePlaylist`: YouTube Music / YouTube playlist URL किंवा `list=` ID
- `backgroundType`: `image` किंवा `video`
- Background files `public/` मध्ये ठेवा
- Save → refresh (local) / git push + redeploy (Vercel)

Keyboard: `Space` play/pause, `←` / `→` prev/next.

## Deploy on Vercel

1. Import GitHub repo on Vercel
2. Add domain `sangeet.online`
3. Deploy

No database or admin panel required.
