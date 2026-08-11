# Sangeet Online

Minimal Marathi music radio for [sangeet.online](https://sangeet.online).

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update songs & categories

Edit only this file:

**[`content/catalog.mdx`](content/catalog.mdx)**

Example:

```yaml
stations:
  - id: swatantrya-din
    label: "स्वातंत्र्य दिन"
    background: "/backgrounds/utsah.jpg"
    backgroundType: image
    songs:
      - title: "गाण्याचे नाव"
        artist: "कलाकार"
        youtubeId: "xxxxxxxxxxx"
```

- `youtubeId`: पूर्ण YouTube URL किंवा 11-character ID
- `backgroundType`: `image` किंवा `video`
- Background files `public/` मध्ये ठेवा
- Save → refresh (local) / git push + redeploy (Vercel)

## Deploy on Vercel

1. Import GitHub repo on Vercel
2. Add domain `sangeet.online`
3. Deploy

No database or admin panel required.
