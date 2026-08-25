# Contributing

PRs welcome. The quest must stay in the tab. Do not add analytics, CDNs, or a backend.

## How to run

```bash
python3 -m http.server 8080
node --test test/challenges.test.mjs
```

## Layout

- `js/missions.js` — mission ids, blurbs, fact pools
- `js/keys.js` — OS combo maps + keydown matcher
- `js/challenges.js` — generators (unit-testable)
- `js/fx.js` — canvas fireworks / stars / crown
- `js/app.js` — campaign, keyboard, local progress
- `wiki/` — source of truth for the GitHub wiki (do not edit pages in the wiki UI; this folder overwrites them)

If you change the live app, bump `APP_VERSION` in `js/version.js` **and** `CACHE` in `sw.js` together, and `version.json`.
