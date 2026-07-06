# Plate No. — a tarot study

Static site, no build step. Four files: `index.html`, `styles.css`, `app.js`, `cards.json`.

## Deploy to Vercel

Easiest path, no CLI:
1. Push this folder to a new GitHub repo.
2. In Vercel, "Add New Project" → import that repo.
3. Framework preset: "Other" (it's static). Leave build command and output directory blank.
4. Deploy.

Or with the CLI, from inside this folder:
```
npx vercel
```

## What's in it

- `cards.json` — all 78 card meanings (upright, reversed, description), adapted from
  A. E. Waite's public-domain *Pictorial Key to the Tarot* (1910).
- Card images are hotlinked from Wikimedia Commons (the 1909 Rider–Waite–Smith deck,
  public domain). No images are stored in this repo.
- The card detail page also does a live, best-effort lookup against the Wikimedia
  Commons search API to surface a few other decks' takes on the same card. If that
  call fails or is empty, the section just hides itself — no errors shown.
- "Today's card" is picked deterministically from the date, so it's the same card
  for anyone visiting on a given day, no backend needed.

## Editing meanings or adding cards

Everything text-wise lives in `cards.json` — edit it directly, no rebuild needed.
