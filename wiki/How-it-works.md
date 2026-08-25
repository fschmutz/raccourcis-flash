# How it works · Comment ça marche

<div align="center">

<img src="https://raw.githubusercontent.com/fschmutz/raccourcis-flash/main/assets/mascot.png" alt="Raccourcis Flash" width="200">

</div>

### Français

Une quête linéaire. Mission 2 reste fermée tant que la 1 n’est pas clear. Chaque mission : un texte comme tu as 12 ans, puis 4 défis piochés dans un plus grand tas.

**Types de défis.** (a) Appuie sur le vrai combo (keydown, les répétitions sont ignorées). (b) « Que fait ce combo ? » — 4 réponses. (c) « Quelles touches ? » — tu les choisis sur le clavier dessiné. (d) Vrai / faux. Les leurres viennent des autres missions. Les phrases de copie changent (jamais le même mot deux fois de suite).

**Captures et verrou.** On ne te demande pas d’appuyer : l’ordi vole Win+Shift+S, Cmd+Shift+4, Win+L, Cmd+Ctrl+Q. Ces-là restent des questions.

**Souris.** Double-clic, clic droit, glisser : on détecte les événements dans la page. On ne peut pas forcer le vrai menu de l’ordi.

**Boss.** 90 secondes, 10 épreuves mélangées depuis les missions 1–11. Graine = `Date.now() + prénom`. Deux parties ne se ressemblent pas. Couronne si tu dégages.

**Son et feu d’artifice.** Bips Web Audio (débloqués au premier tap, iOS). Canvas indigo / lime / banana. `prefers-reduced-motion` coupe les particules.

**Sauvegarde.** Un seul `localStorage` : prénom, âge, OS, langue, missions battues, étoiles.

### English

A linear quest. Mission 2 stays locked until 1 is clear. Each mission: copy as if you are 12, then 4 challenges drawn from a larger pool.

**Challenge types.** (a) Press the real combo (keydown, repeats ignored). (b) “What does this combo do?” — 4 answers. (c) “Which keys?” — pick them on the drawn keyboard. (d) True / false. Decoys come from other missions. Copy words change (never the same word twice in a row).

**Screenshots and lock.** We do not ask you to press them: the computer steals Win+Shift+S, Cmd+Shift+4, Win+L, Cmd+Ctrl+Q. Those stay questions.

**Mouse.** Double-click, right-click, drag: we detect the events in the page. We cannot force the real OS menu.

**Boss.** 90 seconds, 10 trials shuffled from missions 1–11. Seed = `Date.now() + name`. No two runs look the same. Crown if you clear it.

**Sound and fireworks.** Web Audio beeps (unlocked on first tap, iOS). Canvas indigo / lime / banana. `prefers-reduced-motion` skips particles.

**Save.** One `localStorage` key: name, age, OS, language, beaten missions, stars.
