# Architecture

Static GitHub Pages depuis la **racine** (pas `docs/`). L’URL du jeu est `/`. Ne pas déplacer Pages vers `docs/`.

```
index.html        écrans, CSP
css/              borne arcade (indigo / lime / banana)
js/app.js         campagne, clavier, localStorage
js/missions.js    12 missions + pools
js/challenges.js  générateurs (node --test)
js/keys.js        cartes OS + matcher keydown + detectHands
js/fx.js          feu d’artifice
js/i18n.js        FR / EN (chrome)
sw.js             cache racc-v2
wiki/             source → wiki GitHub via scripts/wiki-sync.sh
test/             node --test
```

Le wiki GitHub est un dépôt à part (`shortcut-flash.wiki.git`). On édite `wiki/*.md` ici. Pas d’Action `wiki.yml` (pas de scope `workflow`) : lancer le script après la première page.
