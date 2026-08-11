# Sangeet Online

Minimal Marathi music discovery experience for [sangeet.online](https://sangeet.online).

Choose a mood → discover a song → listen.

## Stack

- Next.js (App Router)
- JavaScript
- Tailwind CSS
- YouTube IFrame Player API
- Static song data in `/data/songs.js`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy on Vercel. Set the production domain to `sangeet.online`.

## Add songs

Edit `data/songs.js` and add objects with `title`, `artist`, `mood`, and `youtubeId`.
