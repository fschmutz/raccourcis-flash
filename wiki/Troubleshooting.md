# Troubleshooting · Dépannage

### La page a l’air vieille / The live page looks old

**Recharger la dernière version** dans le pied de page (ou un hard-refresh). Ça vire le service worker `racc-v2`.

### Pas de son sur iPad / No sound on iPad

iOS exige un tap avant l’AudioContext. Le premier clic débloque. Le bouton 🔊 teste tout de suite.

### Le combo ne s’enregistre pas / The combo does not register

Les répétitions de touche sont ignorées. Relâche et retape. Sur Mac, c’est **Cmd**, pas Ctrl, pour copier. Change l’OS sur l’écran d’accueil si on s’est trompés.

### Capture / verrou / Alt+Tab

L’ordi vole ces touches. On les garde en quiz. On ne peut pas les « écouter » sans quitter la page.

### La progression a disparu / Progress vanished

Elle est dans `localStorage` (`shortcut-flash`). Fenêtre privée, autre navigateur, ou vidage du site = zéro. Rien n’est sur un serveur.

### Téléphone / Phone

Sur un téléphone on n’écoute pas le vrai clavier (`press` impossible). Tape les touches allumées, puis OK. Si on s’est trompés, sur l’écran d’accueil : **Entraîner au doigt** ou **Vrai clavier**.

On a phone we do not listen for a real keyboard (`press` is impossible). Tap the glowing keys, then OK. If we guessed wrong, on the who screen: **Train with a finger** or **Real keyboard**.
