/** Mission data: ids, blurbs, challenge pools. Browser + Node. No DOM. */

export const MISSION_ORDER = [
  'copy', 'undo', 'select', 'save', 'tabs', 'find',
  'zoom', 'windows', 'mouse', 'capture', 'safety', 'boss'
];

/**
 * Each regular mission has ≥4 `facts`.
 * A fact can become press / what / keys / tf (generator picks).
 * `pressOk: false` or combo `osEaten` → quiz only.
 */
export const MISSIONS = [
  {
    id: 'copy',
    index: 1,
    isBoss: false,
    title: { fr: 'Copier-coller', en: 'Copy-paste' },
    blurb: {
      fr: 'Copier, c’est photocopier : la chose reste. Couper, ça déménage. Tiens {mod}, puis C (copier), V (coller), X (couper).',
      en: 'Copy is photocopying: the thing stays. Cut is a move. Hold {mod}, then C (copy), V (paste), X (cut).'
    },
    facts: [
      {
        id: 'copy-c',
        comboId: 'copy',
        pressOk: true,
        copyWord: true,
        does: {
          fr: 'Ça COPIE. La chose reste.',
          en: 'That COPIES. The thing stays.'
        },
        tips: [
          { truth: true, fr: 'Après une copie, l’original est encore là.', en: 'After a copy, the original is still there.' },
          { truth: false, fr: 'Copier efface le mot. Il disparaît.', en: 'Copy erases the word. It vanishes.' }
        ]
      },
      {
        id: 'copy-v',
        comboId: 'paste',
        pressOk: true,
        does: {
          fr: 'Ça COLLE le jumeau.',
          en: 'That PASTES the twin.'
        },
        tips: [
          { truth: true, fr: 'Tu peux coller plusieurs fois la même copie.', en: 'You can paste the same copy more than once.' },
          { truth: false, fr: 'Coller ne marche qu’une seule fois, puis c’est fini.', en: 'Paste works only once, then it is gone.' }
        ]
      },
      {
        id: 'copy-x',
        comboId: 'cut',
        pressOk: true,
        does: {
          fr: 'Ça COUPE. La chose part.',
          en: 'That CUTS. The thing leaves.'
        },
        tips: [
          { truth: true, fr: 'Couper + coller, c’est déménager. Copier + coller, c’est photocopier.', en: 'Cut + paste is moving. Copy + paste is photocopying.' },
          { truth: false, fr: 'Couper et copier, c’est exactement la même chose.', en: 'Cut and copy are exactly the same thing.' }
        ]
      },
      {
        id: 'copy-stay',
        comboId: 'copy',
        pressOk: true,
        does: {
          fr: 'Copier n’efface rien.',
          en: 'Copy deletes nothing.'
        },
        tips: [
          { truth: true, fr: 'C puis V : un jumeau. X puis V : un déménagement.', en: 'C then V: a twin. X then V: a move.' },
          { truth: false, fr: 'Si tu copies, le dessin original disparaît.', en: 'If you copy, the original drawing disappears.' }
        ]
      }
    ]
  },
  {
    id: 'undo',
    index: 2,
    isBoss: false,
    title: { fr: 'La machine à remonter le temps', en: 'The time machine' },
    blurb: {
      fr: 'Tu as tapé une bêtise ? On recule. {mod}+Z annule. {mod}+{shift}+Z (ou {mod}+Y sur Windows) rétablit.',
      en: 'You typed a mess? We step back. {mod}+Z undoes. {mod}+{shift}+Z (or {mod}+Y on Windows) redoes.'
    },
    facts: [
      {
        id: 'undo-z',
        comboId: 'undo',
        pressOk: true,
        does: {
          fr: 'Ça ANNULE. Comme un bouton « oups ».',
          en: 'That UNDOES. Like an “oops” button.'
        },
        tips: [
          { truth: true, fr: 'Tu peux appuyer plusieurs fois sur Z pour reculer plus loin.', en: 'You can tap Z several times to go further back.' },
          { truth: false, fr: 'Annuler marche une seule fois dans toute ta vie.', en: 'Undo works only once in your whole life.' }
        ]
      },
      {
        id: 'undo-redo',
        comboId: 'redo',
        pressOk: true,
        does: {
          fr: 'Ça RÉTABLIT. Ça avance à nouveau.',
          en: 'That REDOES. It moves forward again.'
        },
        tips: [
          { truth: true, fr: 'Rétablir, c’est l’inverse d’Annuler.', en: 'Redo is the opposite of Undo.' },
          { truth: false, fr: 'Rétablir efface tout le document.', en: 'Redo erases the whole document.' }
        ]
      },
      {
        id: 'undo-oops',
        comboId: 'undo',
        pressOk: true,
        does: {
          fr: 'Une erreur de frappe, un dessin raté, un mot trop vite effacé : {mod}+Z d’abord.',
          en: 'A typo, a bad doodle, a word erased too fast: {mod}+Z first.'
        },
        tips: [
          { truth: true, fr: 'Annuler est plus gentil que tout recommencer.', en: 'Undo is kinder than starting over.' },
          { truth: false, fr: 'S’il y a une faute, il faut fermer la page sans sauver.', en: 'If there is a mistake, you must close the page without saving.' }
        ]
      },
      {
        id: 'undo-pair',
        comboId: 'redo',
        pressOk: true,
        does: {
          fr: 'Z recule. Rétablir avance. Les deux ensemble, c’est une machine à remonter le temps.',
          en: 'Z goes back. Redo goes forward. Together they are a time machine.'
        },
        tips: [
          { truth: true, fr: 'Sur Windows, {mod}+Y rétablit aussi.', en: 'On Windows, {mod}+Y also redoes.' },
          { truth: false, fr: 'Annuler et rétablir, ça n’existe que sur téléphone.', en: 'Undo and redo exist only on phones.' }
        ]
      }
    ]
  },
  {
    id: 'select',
    index: 3,
    isBoss: false,
    title: { fr: 'Tout prendre', en: 'Take it all' },
    blurb: {
      fr: 'Tout prendre, ce n’est pas tout jeter. Ça encadre. {mod}+A sélectionne toute la page.',
      en: 'Take-all is not throw-away. It outlines. {mod}+A selects the whole page.'
    },
    facts: [
      {
        id: 'select-a',
        comboId: 'selectAll',
        pressOk: true,
        does: {
          fr: 'Ça prend TOUT le texte (ou le dessin).',
          en: 'That takes ALL the text (or drawing).'
        },
        tips: [
          { truth: true, fr: 'Après {mod}+A tu peux copier tout d’un coup avec {mod}+C.', en: 'After {mod}+A you can copy everything at once with {mod}+C.' },
          { truth: false, fr: '{mod}+A ferme la fenêtre.', en: '{mod}+A closes the window.' }
        ]
      },
      {
        id: 'select-then-copy',
        comboId: 'selectAll',
        pressOk: true,
        does: {
          fr: 'Sélectionner, ce n’est pas copier. C’est juste dire « c’est ÇA que je veux ».',
          en: 'Selecting is not copying. It only says “THIS is what I mean”.'
        },
        tips: [
          { truth: true, fr: 'A puis C puis V : tout prendre, tout copier, tout coller.', en: 'A then C then V: take all, copy all, paste all.' },
          { truth: false, fr: '{mod}+A envoie déjà le texte à un ami.', en: '{mod}+A already sends the text to a friend.' }
        ]
      },
      {
        id: 'select-not-delete',
        comboId: 'selectAll',
        pressOk: true,
        does: {
          fr: 'Tout prendre n’efface rien. Ça encadre. Si tu tapes une lettre après, là oui, ça remplace.',
          en: 'Take-all deletes nothing. It outlines. If you type a letter after, then yes, it replaces.'
        },
        tips: [
          { truth: true, fr: 'Si tu as tout sélectionné par erreur, clique à côté ou appuie sur une flèche.', en: 'If you selected all by mistake, click aside or tap an arrow.' },
          { truth: false, fr: '{mod}+A jette le fichier à la poubelle.', en: '{mod}+A throws the file in the bin.' }
        ]
      },
      {
        id: 'select-word',
        comboId: 'selectAll',
        pressOk: true,
        does: {
          fr: 'Pour un seul mot, un double-clic suffit. {mod}+A, c’est pour la page entière.',
          en: 'For one word, a double-click is enough. {mod}+A is for the whole page.'
        },
        tips: [
          { truth: true, fr: '{mod}+A = toute la page. Double-clic = un mot.', en: '{mod}+A = the whole page. Double-click = one word.' },
          { truth: false, fr: '{mod}+A ne sélectionne qu’une lettre.', en: '{mod}+A selects only one letter.' }
        ]
      }
    ]
  },
  {
    id: 'save',
    index: 4,
    isBoss: false,
    title: { fr: 'La pierre de sauvegarde', en: 'The save stone' },
    blurb: {
      fr: 'Sauver, c’est ranger le dessin pour qu’il ne s’envole pas. {mod}+S, souvent. Pas seulement à la fin.',
      en: 'Save puts the drawing away so it does not fly off. {mod}+S, often. Not only at the end.'
    },
    facts: [
      {
        id: 'save-s',
        comboId: 'save',
        pressOk: true,
        does: {
          fr: 'Ça SAUVE. Le dessin ne s’envole pas.',
          en: 'That SAVES. The drawing stays.'
        },
        tips: [
          { truth: true, fr: 'Sauvegarde souvent, pas seulement à la fin.', en: 'Save often, not only at the end.' },
          { truth: false, fr: 'Sauvegarder, c’est envoyer le dessin sur Internet.', en: 'Saving uploads the drawing to the Internet.' }
        ]
      },
      {
        id: 'save-why',
        comboId: 'save',
        pressOk: true,
        does: {
          fr: 'Si tu fermes sans sauver, le dessin peut disparaître. {mod}+S avant de partir.',
          en: 'If you close without saving, the drawing can vanish. {mod}+S before you leave.'
        },
        tips: [
          { truth: true, fr: 'La pierre de sauvegarde, c’est {mod}+S. Touche-la souvent.', en: 'The save stone is {mod}+S. Touch it often.' },
          { truth: false, fr: 'L’ordinateur se souvient toujours, même sans sauvegarder.', en: 'The computer always remembers, even without saving.' }
        ]
      },
      {
        id: 'save-not-copy',
        comboId: 'save',
        pressOk: true,
        does: {
          fr: 'Sauver, ce n’est pas copier. Copier met un jumeau au presse-papier. Sauver range le fichier.',
          en: 'Saving is not copying. Copy puts a twin on the clipboard. Save puts the file away.'
        },
        tips: [
          { truth: true, fr: '{mod}+S range. {mod}+C photocopie.', en: '{mod}+S files it. {mod}+C photocopies.' },
          { truth: false, fr: '{mod}+S et {mod}+C font exactement la même chose.', en: '{mod}+S and {mod}+C do exactly the same thing.' }
        ]
      },
      {
        id: 'save-name',
        comboId: 'save',
        pressOk: true,
        does: {
          fr: 'La première fois, l’ordi demande un nom. « dragon-volcan » c’est mieux que « sans titre ».',
          en: 'The first time, the computer asks for a name. “volcano-dragon” is better than “untitled”.'
        },
        tips: [
          { truth: true, fr: 'Un bon nom t’aide à retrouver le dessin demain.', en: 'A good name helps you find the drawing tomorrow.' },
          { truth: false, fr: 'Tous les fichiers s’appellent automatiquement Paloma.', en: 'Every file is automatically named Paloma.' }
        ]
      }
    ]
  },
  {
    id: 'tabs',
    index: 5,
    isBoss: false,
    title: { fr: 'Les onglets', en: 'The tabs' },
    blurb: {
      fr: 'Un onglet, c’est une feuille dans le même cahier. Pas une nouvelle fenêtre. {mod}+T ouvre. {mod}+W ferme. Ctrl+Tab change d’onglet.',
      en: 'A tab is a sheet in the same notebook. Not a new window. {mod}+T opens. {mod}+W closes. Ctrl+Tab changes tab.'
    },
    facts: [
      {
        id: 'tabs-t',
        comboId: 'newTab',
        pressOk: true,
        does: {
          fr: 'Ça ouvre un NOUVEL ONGLET.',
          en: 'That opens a NEW TAB.'
        },
        tips: [
          { truth: true, fr: 'Un onglet, c’est une feuille dans le même cahier.', en: 'A tab is a sheet in the same notebook.' },
          { truth: false, fr: '{mod}+T éteint l’ordinateur.', en: '{mod}+T shuts the computer down.' }
        ]
      },
      {
        id: 'tabs-w',
        comboId: 'closeTab',
        pressOk: true,
        does: {
          fr: 'Ça FERME cet onglet. Les autres restent.',
          en: 'That CLOSES this tab. The others stay.'
        },
        tips: [
          { truth: true, fr: '{mod}+W ferme un onglet, pas tout le navigateur (en général).', en: '{mod}+W closes one tab, not the whole browser (usually).' },
          { truth: false, fr: '{mod}+W efface tous tes devoirs sur le disque.', en: '{mod}+W erases all your homework from the disk.' }
        ]
      },
      {
        id: 'tabs-next',
        comboId: 'nextTab',
        pressOk: true,
        does: {
          fr: 'Ça saute à l’ONGLET SUIVANT. Tu restes dans le même navigateur.',
          en: 'That hops to the NEXT TAB. You stay in the same browser.'
        },
        tips: [
          { truth: true, fr: 'Ctrl+Tab (dans le navigateur) change d’onglet.', en: 'Ctrl+Tab (in the browser) changes tab.' },
          { truth: false, fr: 'Pour changer d’onglet, il faut redémarrer.', en: 'To change tab, you must reboot.' }
        ]
      },
      {
        id: 'tabs-not-win',
        comboId: 'newTab',
        pressOk: true,
        does: {
          fr: 'Onglet ≠ fenêtre. Une fenêtre, c’est tout le cadre. Un onglet, c’est une page dedans.',
          en: 'Tab ≠ window. A window is the whole frame. A tab is a page inside it.'
        },
        tips: [
          { truth: true, fr: 'Tu peux avoir plein d’onglets dans une seule fenêtre.', en: 'You can have lots of tabs in one window.' },
          { truth: false, fr: 'Chaque onglet ouvre un nouvel ordinateur.', en: 'Each tab opens a new computer.' }
        ]
      }
    ]
  },
  {
    id: 'find',
    index: 6,
    isBoss: false,
    title: { fr: 'La loupe', en: 'The magnifier' },
    blurb: {
      fr: 'La loupe cherche ICI, dans cette page. Pas sur tout Internet. {mod}+F, tu tapes le mot, la page le surligne.',
      en: 'The magnifier searches HERE, on this page. Not the whole Internet. {mod}+F, you type the word, the page highlights it.'
    },
    facts: [
      {
        id: 'find-f',
        comboId: 'find',
        pressOk: true,
        does: {
          fr: 'Ça ouvre la LOUPE. La page trouve le mot.',
          en: 'That opens the MAGNIFIER. The page finds the word.'
        },
        tips: [
          { truth: true, fr: 'La page est longue. {mod}+F trouve le mot.', en: 'The page is long. {mod}+F finds the word.' },
          { truth: false, fr: '{mod}+F envoie le mot à tout Internet.', en: '{mod}+F sends the word to the whole Internet.' }
        ]
      },
      {
        id: 'find-here',
        comboId: 'find',
        pressOk: true,
        does: {
          fr: 'La loupe cherche dans CETTE page. Pas sur le Web. Pas dans tes photos.',
          en: 'The magnifier searches THIS page. Not the Web. Not your photos.'
        },
        tips: [
          { truth: true, fr: 'Trouve ≠ Google. Trouve = ici.', en: 'Find ≠ Google. Find = here.' },
          { truth: false, fr: '{mod}+F, c’est le même bouton que la barre Google.', en: '{mod}+F is the same button as the Google bar.' }
        ]
      },
      {
        id: 'find-next',
        comboId: 'find',
        pressOk: true,
        does: {
          fr: 'S’il y a plusieurs fois le mot, Entrée (ou la petite flèche) saute au suivant.',
          en: 'If the word appears many times, Enter (or the little arrow) jumps to the next one.'
        },
        tips: [
          { truth: true, fr: 'La loupe peut trouver le même mot dix fois.', en: 'The magnifier can find the same word ten times.' },
          { truth: false, fr: 'La loupe ne trouve que le tout premier mot de la page.', en: 'The magnifier only finds the very first word on the page.' }
        ]
      },
      {
        id: 'find-spelling',
        comboId: 'find',
        pressOk: true,
        does: {
          fr: 'Si tu écris « dinosore », la loupe ne trouve pas « dinosaure ». Épelle comme sur la page.',
          en: 'If you type “dinosore”, the magnifier will not find “dinosaur”. Spell it like the page.'
        },
        tips: [
          { truth: true, fr: 'La loupe est littérale : elle cherche les lettres que tu tapes.', en: 'The magnifier is literal: it looks for the letters you type.' },
          { truth: false, fr: 'La loupe devine toujours ce que tu voulais dire.', en: 'The magnifier always guesses what you meant.' }
        ]
      }
    ]
  },
  {
    id: 'zoom',
    index: 7,
    isBoss: false,
    title: { fr: 'Les yeux zoom', en: 'Zoom eyes' },
    blurb: {
      fr: 'C’est la page qui grossit, pas tes vrais yeux. {mod} et + agrandit. {mod} et − rapetisse. {mod}+0 remet normal.',
      en: 'The page grows, not your real eyes. {mod} and + grows. {mod} and − shrinks. {mod}+0 is normal again.'
    },
    facts: [
      {
        id: 'zoom-in',
        comboId: 'zoomIn',
        pressOk: true,
        does: {
          fr: 'Ça GROSSIT la page.',
          en: 'That GROWS the page.'
        },
        tips: [
          { truth: true, fr: '{mod} et + = zoom avant. Plus facile à lire.', en: '{mod} and + = zoom in. Easier to read.' },
          { truth: false, fr: '{mod} et + éteint l’écran.', en: '{mod} and + turns the screen off.' }
        ]
      },
      {
        id: 'zoom-out',
        comboId: 'zoomOut',
        pressOk: true,
        does: {
          fr: 'Ça RAPETISSE la page.',
          en: 'That SHRINKS the page.'
        },
        tips: [
          { truth: true, fr: '{mod} et − = zoom arrière.', en: '{mod} and − = zoom out.' },
          { truth: false, fr: '{mod} et − ferme tous les onglets.', en: '{mod} and − closes every tab.' }
        ]
      },
      {
        id: 'zoom-0',
        comboId: 'zoomReset',
        pressOk: true,
        does: {
          fr: 'Ça REMET le zoom à 100 %.',
          en: 'That RESETS zoom to 100%.'
        },
        tips: [
          { truth: true, fr: '{mod}+0, c’est « reviens à la taille normale ».', en: '{mod}+0 means “back to normal size”.' },
          { truth: false, fr: '{mod}+0 verrouille l’ordinateur.', en: '{mod}+0 locks the computer.' }
        ]
      },
      {
        id: 'zoom-page',
        comboId: 'zoomIn',
        pressOk: true,
        does: {
          fr: 'Le zoom change CETTE page. Tes vrais yeux restent les mêmes. Les autres applis ne bougent pas.',
          en: 'Zoom changes THIS page. Your real eyes stay the same. Other apps do not move.'
        },
        tips: [
          { truth: true, fr: 'Si tout est énorme, {mod}+0 te sauve.', en: 'If everything is huge, {mod}+0 saves you.' },
          { truth: false, fr: 'Le zoom change la taille de tes lunettes pour toujours.', en: 'Zoom changes the size of your glasses forever.' }
        ]
      }
    ]
  },
  {
    id: 'windows',
    index: 8,
    isBoss: false,
    title: { fr: 'Changer de fenêtre', en: 'Switch window' },
    blurb: {
      fr: 'Changer de fenêtre, c’est passer du dessin à la leçon sans tout fermer. {alt}+Tab (sur Mac : {mod}+Tab). Ici, tu choisis : l’ordi vole souvent ces touches.',
      en: 'Switch window means drawing ↔ lesson, without closing everything. {alt}+Tab (on a Mac: {mod}+Tab). Here you choose: the computer often steals those keys.'
    },
    facts: [
      {
        id: 'win-tab',
        comboId: 'switchWindow',
        pressOk: false,
        does: {
          fr: 'Ça CHANGE DE FENÊTRE. Dessin ↔ leçon, sans tout fermer.',
          en: 'That SWITCHES WINDOW. Drawing ↔ lesson, without closing everything.'
        },
        tips: [
          { truth: true, fr: '{alt}+Tab (ou {mod}+Tab sur Mac) saute d’une appli à l’autre.', en: '{alt}+Tab (or {mod}+Tab on a Mac) hops from app to app.' },
          { truth: false, fr: '{alt}+Tab efface la fenêtre pour toujours.', en: '{alt}+Tab deletes the window forever.' }
        ]
      },
      {
        id: 'win-not-tab',
        comboId: 'switchWindow',
        pressOk: false,
        does: {
          fr: 'Fenêtre = tout le cadre d’une appli. Onglet = une page dans le navigateur.',
          en: 'Window = the whole app frame. Tab = a page inside the browser.'
        },
        tips: [
          { truth: true, fr: 'Changer de fenêtre ≠ changer d’onglet. Deux outils différents.', en: 'Switching window ≠ switching tab. Two different tools.' },
          { truth: false, fr: 'Fenêtre et onglet, c’est le même mot pour la même chose.', en: 'Window and tab are the same word for the same thing.' }
        ]
      },
      {
        id: 'win-hold',
        comboId: 'switchWindow',
        pressOk: false,
        does: {
          fr: 'Garde {alt} (ou {mod} sur Mac), tape Tab, relâche quand la bonne fenêtre est choisie.',
          en: 'Hold {alt} (or {mod} on a Mac), tap Tab, let go when the right window is chosen.'
        },
        tips: [
          { truth: true, fr: 'Si tu restes appuyé, tu peux Tab plusieurs fois pour choisir.', en: 'If you keep holding, you can Tab several times to choose.' },
          { truth: false, fr: 'Il faut cliquer sur le bureau à chaque fois, sinon ça marche pas.', en: 'You must click the desktop every time, or it will not work.' }
        ]
      },
      {
        id: 'win-stay',
        comboId: 'switchWindow',
        pressOk: false,
        does: {
          fr: 'Les autres fenêtres ne se ferment pas. Elles attendent derrière.',
          en: 'The other windows do not close. They wait in the back.'
        },
        tips: [
          { truth: true, fr: 'Changer de fenêtre, ce n’est pas quitter l’appli.', en: 'Switching window is not quitting the app.' },
          { truth: false, fr: 'Dès que tu changes de fenêtre, l’autre appli s’éteint.', en: 'As soon as you switch, the other app shuts down.' }
        ]
      }
    ]
  },
  {
    id: 'mouse',
    index: 9,
    isBoss: false,
    title: { fr: 'Astuces de souris', en: 'Mouse tricks' },
    blurb: {
      fr: 'La souris a trois trucs : double-clic, clic droit, glisser. Double-clic = un mot. Clic droit = un menu. Glisser = bouton enfoncé, bouger, relâcher.',
      en: 'The mouse has three tricks: double-click, right-click, drag. Double-click = a word. Right-click = a menu. Drag = button down, move, let go.'
    },
    facts: [
      {
        id: 'mouse-dbl',
        comboId: null,
        mouse: 'dblclick',
        pressOk: true,
        does: {
          fr: 'DOUBLE-CLIC : deux clics rapides. Ça sélectionne un mot (ou ouvre un dossier).',
          en: 'DOUBLE-CLICK: two quick clicks. It selects a word (or opens a folder).'
        },
        tips: [
          { truth: true, fr: 'Clic-clic sur un mot : le mot devient bleu.', en: 'Click-click on a word: the word goes blue.' },
          { truth: false, fr: 'Un double-clic éteint l’ordinateur.', en: 'A double-click shuts the computer down.' }
        ]
      },
      {
        id: 'mouse-right',
        comboId: null,
        mouse: 'contextmenu',
        pressOk: true,
        does: {
          fr: 'CLIC DROIT : l’autre bouton. Un petit menu apparaît (copier, coller, inspecter…).',
          en: 'RIGHT-CLICK: the other button. A little menu appears (copy, paste, inspect…).'
        },
        tips: [
          { truth: true, fr: 'Le clic droit ouvre un menu. On ne peut pas forcer le menu de l’ordi dans cette page.', en: 'Right-click opens a menu. We cannot force the OS menu in this page.' },
          { truth: false, fr: 'Le clic droit envoie tes secrets sur Internet.', en: 'Right-click uploads your secrets to the Internet.' }
        ]
      },
      {
        id: 'mouse-drag',
        comboId: null,
        mouse: 'drag',
        pressOk: true,
        does: {
          fr: 'GLISSER : bouton enfoncé, tu bouges, tu relâches. Ça déplace ou ça sélectionne.',
          en: 'DRAG: button down, you move, you let go. It moves or it selects.'
        },
        tips: [
          { truth: true, fr: 'Glisser un fichier, c’est le déplacer. Glisser sur du texte, c’est le sélectionner.', en: 'Dragging a file moves it. Dragging across text selects it.' },
          { truth: false, fr: 'Glisser, ça n’existe que sur téléphone.', en: 'Drag exists only on phones.' }
        ]
      },
      {
        id: 'mouse-vs',
        comboId: null,
        mouse: 'dblclick',
        pressOk: true,
        does: {
          fr: 'Un clic = choisir. Deux clics = ouvrir / prendre le mot. Lent ≠ double-clic.',
          en: 'One click = choose. Two clicks = open / grab the word. Slow ≠ double-click.'
        },
        tips: [
          { truth: true, fr: 'Si tu attends trop entre les deux clics, l’ordi croit que ce sont deux clics simples.', en: 'If you wait too long between clicks, the computer thinks they are two single clicks.' },
          { truth: false, fr: 'Il faut toujours cliquer dix fois pour ouvrir un dossier.', en: 'You must always click ten times to open a folder.' }
        ]
      }
    ]
  },
  {
    id: 'capture',
    index: 10,
    isBoss: false,
    title: { fr: 'Capture', en: 'Screenshot' },
    blurb: {
      fr: 'Une capture, c’est une photo de l’écran. Ça n’envoie rien. Windows : {win}+{shift}+S. Mac : {mod}+{shift}+4. Linux : Impr. écran. Ici tu choisis, tu n’appuies pas.',
      en: 'A screenshot is a photo of the screen. It sends nothing. Windows: {win}+{shift}+S. Mac: {mod}+{shift}+4. Linux: Print Screen. Here you choose, you do not press.'
    },
    facts: [
      {
        id: 'cap-os',
        comboId: 'screenshot',
        pressOk: false,
        does: {
          fr: 'Ça PREND UNE PHOTO de l’écran. Ça n’envoie rien.',
          en: 'That TAKES A PHOTO of the screen. It sends nothing.'
        },
        tips: [
          { truth: true, fr: 'Windows : {win}+{shift}+S. Mac : {mod}+{shift}+4. Linux : Impr. écran.', en: 'Windows: {win}+{shift}+S. Mac: {mod}+{shift}+4. Linux: Print Screen.' },
          { truth: false, fr: 'Une capture envoie automatiquement la photo à toute l’école.', en: 'A screenshot automatically sends the photo to the whole school.' }
        ]
      },
      {
        id: 'cap-region',
        comboId: 'screenshot',
        pressOk: false,
        does: {
          fr: 'Souvent tu dessines un rectangle : seulement ce morceau est photo. Pas besoin de toute la classe derrière toi.',
          en: 'Often you draw a rectangle: only that piece is the photo. No need for the whole classroom behind you.'
        },
        tips: [
          { truth: true, fr: 'Une zone, c’est plus poli qu’une photo de tout l’écran.', en: 'A region is politer than a photo of the whole screen.' },
          { truth: false, fr: 'Il est obligatoire de photographier tout l’écran à chaque fois.', en: 'You must photograph the whole screen every time.' }
        ]
      },
      {
        id: 'cap-where',
        comboId: 'screenshot',
        pressOk: false,
        does: {
          fr: 'La photo va souvent dans le presse-papier, ou dans un dossier « Images / Captures ». Ensuite tu la colles ou tu l’enregistres.',
          en: 'The photo often lands on the clipboard, or in a Pictures / Screenshots folder. Then you paste it or save it.'
        },
        tips: [
          { truth: true, fr: 'Après une capture, {mod}+V peut coller la photo dans un devoir.', en: 'After a screenshot, {mod}+V can paste the photo into homework.' },
          { truth: false, fr: 'La capture s’imprime toute seule sur papier.', en: 'The screenshot prints itself on paper.' }
        ]
      },
      {
        id: 'cap-quiz',
        comboId: 'screenshot',
        pressOk: false,
        does: {
          fr: 'On ne t’oblige pas à appuyer : l’ordi ouvre son outil et quitte le jeu. Ici, c’est une question.',
          en: 'We will not make you press it: the computer opens its tool and leaves the game. Here, it is a question.'
        },
        tips: [
          { truth: true, fr: 'Les captures restent en quiz, parce que l’ordi vole les touches.', en: 'Screenshots stay as a quiz, because the computer steals the keys.' },
          { truth: false, fr: 'Ce jeu peut forcer une vraie capture d’écran de tout l’ordi.', en: 'This game can force a real screenshot of the whole computer.' }
        ]
      }
    ]
  },
  {
    id: 'safety',
    index: 11,
    isBoss: false,
    title: { fr: 'Sécurité express', en: 'Safety express' },
    blurb: {
      fr: 'Trois règles, pas de peur : pas de pop-up bizarre, pas de mot de passe à une page apparue toute seule, verrouille si tu te lèves. Verrouiller : {win}+L (Windows / Linux) ou {mod}+{ctrl}+Q (Mac).',
      en: 'Three rules, not scary: no weird pop-up, no password to a page that just appeared, lock if you stand up. Lock: {win}+L (Windows / Linux) or {mod}+Ctrl+Q (Mac).'
    },
    facts: [
      {
        id: 'safe-popup',
        comboId: null,
        pressOk: false,
        does: {
          fr: 'Un pop-up qui arrive tout seul, tu ne cliques pas. Tu fermes. Tu demandes si tu n’es pas sûr.',
          en: 'A pop-up that just appeared: you do not click. You close it. You ask if you are unsure.'
        },
        tips: [
          { truth: true, fr: 'Un vrai site n’a pas besoin d’un pop-up menaçant pour que tu continues.', en: 'A real site does not need a scary pop-up for you to continue.' },
          { truth: false, fr: 'S’il est écrit « URGENCE VIRUS », il faut cliquer tout de suite.', en: 'If it says “VIRUS EMERGENCY”, you must click at once.' }
        ]
      },
      {
        id: 'safe-pass',
        comboId: null,
        pressOk: false,
        does: {
          fr: 'Tu ne donnes jamais le mot de passe à une page qui vient d’apparaître toute seule.',
          en: 'You never give the password to a page that just appeared by itself.'
        },
        tips: [
          { truth: true, fr: 'Un adulte de confiance, c’est la bonne personne pour un doute.', en: 'A trusted adult is the right person when you doubt.' },
          { truth: false, fr: 'Si quelqu’un écrit « c’est papa », tu donnes le mot de passe.', en: 'If someone types “it’s dad”, you give the password.' }
        ]
      },
      {
        id: 'safe-lock',
        comboId: 'lock',
        pressOk: false,
        does: {
          fr: 'Verrouiller, c’est mettre l’écran en pause. Personne d’autre ne continue à ta place.',
          en: 'Locking pauses the screen. Nobody else continues as you.'
        },
        tips: [
          { truth: true, fr: 'Windows / Linux : {win}+L. Mac : {mod}+Ctrl+Q. Puis tu te lèves.', en: 'Windows / Linux: {win}+L. Mac: {mod}+Ctrl+Q. Then you stand up.' },
          { truth: false, fr: 'Verrouiller efface tous tes fichiers.', en: 'Locking erases all your files.' }
        ]
      },
      {
        id: 'safe-away',
        comboId: 'lock',
        pressOk: false,
        does: {
          fr: 'Tu vas boire de l’eau, aux toilettes, en récré ? Verrouille. C’est poli, et c’est malin.',
          en: 'Water, bathroom, recess? Lock. It is polite, and it is smart.'
        },
        tips: [
          { truth: true, fr: 'Un écran verrouillé attend TON code. Tes copains ne voient pas tes messages.', en: 'A locked screen waits for YOUR code. Friends do not see your messages.' },
          { truth: false, fr: 'Laisser l’écran ouvert, c’est plus gentil pour les copains.', en: 'Leaving the screen open is kinder to friends.' }
        ]
      }
    ]
  },
  {
    id: 'boss',
    index: 12,
    isBoss: true,
    title: { fr: 'BOSS — Le Grand Mélange', en: 'BOSS — The Grand Mix' },
    blurb: {
      fr: 'Dix épreuves, chrono qui tourne, piochées partout. Deux parties ne se ressemblent pas. Tu rates ? Tu réessaies.',
      en: 'Ten trials, clock running, drawn from everywhere. No two runs look the same. You miss? You try again.'
    },
    facts: []
  }
];

export function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}

export function regularMissions() {
  return MISSIONS.filter((m) => !m.isBoss);
}

export function allFacts() {
  const out = [];
  for (const m of regularMissions()) {
    for (const f of m.facts) out.push({ ...f, missionId: m.id, missionIndex: m.index });
  }
  return out;
}

export function factsFor(missionId) {
  const m = missionById(missionId);
  return m ? m.facts.map((f) => ({ ...f, missionId: m.id, missionIndex: m.index })) : [];
}

export function bossPoolCovers() {
  return [...new Set(allFacts().map((f) => f.missionId))];
}
