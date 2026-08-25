/** Challenge generators. Browser + Node. No DOM. */

import { MISSIONS, allFacts, factsFor, regularMissions } from './missions.js';
import { formatCombo, fillOs, isOsEaten, highlightKeys, COMBOS, displayKey, MOD } from './keys.js';

export const COPY_WORDS = {
  fr: ['banane', 'dragon', 'fusée', 'chat', 'pizza', 'étoile', 'robot', 'nuage', 'cactus', 'licorne', 'volcan', 'komodo'],
  en: ['banana', 'dragon', 'rocket', 'cat', 'pizza', 'star', 'robot', 'cloud', 'cactus', 'unicorn', 'volcano', 'komodo']
};

export const TOUCH_TYPES = ['keys', 'what', 'tf', 'mouse'];
export const KEYBOARD_TYPES = ['keys', 'what', 'tf', 'mouse', 'press'];

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seed from Date.now() + name so two sessions differ. */
export function seedFrom(name, now = Date.now()) {
  const s = String(now) + String(name || 'Paloma');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

export function pick(arr, rng = Math.random) {
  if (!arr.length) return undefined;
  return arr[Math.floor(rng() * arr.length)];
}

export function pickCopyWord(rng, lang, last) {
  const pool = (COPY_WORDS[lang] || COPY_WORDS.fr).filter((w) => w !== last);
  const use = pool.length ? pool : (COPY_WORDS[lang] || COPY_WORDS.fr);
  return pick(use, rng);
}

function loc(obj, lang) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.fr || obj.en || '';
}

function canPress(fact) {
  if (fact.pressOk === false) return false;
  if (fact.comboId && isOsEaten(fact.comboId)) return false;
  if (!fact.comboId && !fact.mouse) return false;
  return true;
}

function canKeys(fact) {
  return !!(fact.comboId && COMBOS[fact.comboId]);
}

export function normalizeHands(hands) {
  return hands === 'touch' ? 'touch' : 'keyboard';
}

/**
 * Touch never gets `press` (impossible without a real keyboard).
 * Touch: keys / what / tf / mouse.
 * Keyboard: those plus press.
 */
export function allowedTypes(fact, hands = 'keyboard') {
  const mode = normalizeHands(hands);
  const types = ['what', 'tf'];
  if (canKeys(fact)) types.push('keys');
  if (canPress(fact)) {
    if (fact.mouse) types.push('mouse');
    else if (mode !== 'touch') types.push('press');
  }
  return types;
}

function doesText(fact, os, lang) {
  return fillOs(loc(fact.does, lang), os);
}

function firstSentence(text) {
  const s = String(text || '').trim();
  const cut = s.match(/^(.+?[.!?])(\s|$)/);
  return cut ? cut[1] : s;
}

export function decoysFor(fact, os, lang, rng, n = 3) {
  const answer = doesText(fact, os, lang);
  const others = allFacts().filter((f) => f.id !== fact.id);
  const texts = [];
  for (const f of shuffle(others, rng)) {
    const t = doesText(f, os, lang);
    if (t && t !== answer && !texts.includes(t)) texts.push(t);
    if (texts.length >= n) break;
  }
  const extras = lang === 'en'
    ? ['It prints the page on paper.', 'It deletes the whole computer.', 'It calls a friend by itself.', 'It turns the volume up.']
    : ['Ça imprime la page sur papier.', 'Ça efface tout l’ordinateur.', 'Ça appelle un copain tout seul.', 'Ça monte le volume.'];
  let i = 0;
  while (texts.length < n) {
    const t = extras[i % extras.length];
    if (t !== answer && !texts.includes(t)) texts.push(t);
    i += 1;
    if (i > 20) break;
  }
  return texts.slice(0, n);
}

function promptWhat(fact, os, lang) {
  if (fact.comboId) {
    const combo = formatCombo(fact.comboId, os);
    return lang === 'en' ? `${combo} — what does that do?` : `${combo}, ça fait quoi ?`;
  }
  if (fact.mouse === 'dblclick') return lang === 'en' ? 'A double-click — what does that do?' : 'Un double-clic, ça fait quoi ?';
  if (fact.mouse === 'contextmenu') return lang === 'en' ? 'A right-click — what does that do?' : 'Un clic droit, ça fait quoi ?';
  if (fact.mouse === 'drag') return lang === 'en' ? 'A drag — what does that do?' : 'Glisser, ça fait quoi ?';
  return lang === 'en' ? 'What is the right move?' : 'C’est quoi le bon geste ?';
}

function holdThenTap(fact, os, lang) {
  const ids = fact.comboId ? highlightKeys(fact.comboId, os) : [];
  const modIds = new Set(['ctrl', 'cmd', 'win', 'super', 'alt', 'option', 'shift']);
  const mods = ids.filter((k) => modIds.has(k));
  const letter = ids.find((k) => !modIds.has(k));
  const labels = {
    ctrl: 'Ctrl', cmd: 'Cmd', win: 'Win', super: 'Super',
    alt: 'Alt', option: 'Option', shift: 'Shift'
  };
  const modNames = mods.map((k) => labels[k] || k);
  const letterLab = letter ? displayKey(letter) : '';
  const primary = modNames[0] || (MOD[os] || MOD.win).mod;
  const hint = primary === 'Cmd'
    ? (lang === 'en' ? ' (or Ctrl on a PC)' : ' (ou Ctrl sur un PC)')
    : primary === 'Ctrl'
      ? (lang === 'en' ? ' (or Cmd on a Mac)' : ' (ou Cmd)')
      : '';
  const hold = modNames.length > 1
    ? (lang === 'en' ? `Hold ${modNames.join(' + ')}` : `Tiens ${modNames.join(' + ')}`)
    : (lang === 'en' ? `Hold ${primary}${hint}` : `Tiens ${primary}${hint}`);
  if (!letterLab) return hold + '.';
  return lang === 'en' ? `${hold}, then tap ${letterLab}.` : `${hold}, puis tape ${letterLab}.`;
}

function promptPress(fact, os, lang, copyWord) {
  if (fact.mouse === 'dblclick') {
    return lang === 'en' ? 'Double-click the target. That grabs a word.' : 'Double-clique la cible. Ça prend un mot.';
  }
  if (fact.mouse === 'contextmenu') {
    return lang === 'en' ? 'Right-click the target (the other button).' : 'Clic droit sur la cible (l’autre bouton).';
  }
  if (fact.mouse === 'drag') {
    return lang === 'en' ? 'Drag the star onto the pad.' : 'Glisse l’étoile jusqu’au tapis.';
  }
  const hold = holdThenTap(fact, os, lang);
  const punch = firstSentence(doesText(fact, os, lang));
  if (fact.copyWord && copyWord) {
    return lang === 'en'
      ? `${hold} That COPIES the word ${copyWord.toUpperCase()}.`
      : `${hold} Ça COPIE le mot ${copyWord.toUpperCase()}.`;
  }
  return `${hold} ${punch}`;
}

function promptKeys(fact, os, lang) {
  const punch = firstSentence(doesText(fact, os, lang));
  return lang === 'en'
    ? `Tap the glowing keys, then OK. ${punch}`
    : `Tape les touches allumées, puis OK. ${punch}`;
}

function buildWhat(fact, os, lang, rng) {
  const answer = doesText(fact, os, lang);
  const decoys = decoysFor(fact, os, lang, rng, 3);
  const options = shuffle([answer, ...decoys], rng);
  return {
    type: 'what',
    factId: fact.id,
    missionId: fact.missionId,
    comboId: fact.comboId || null,
    prompt: promptWhat(fact, os, lang),
    options,
    answer,
    decoys
  };
}

function buildTf(fact, os, lang, rng) {
  const tips = fact.tips || [];
  const tip = pick(tips, rng) || { truth: true, fr: doesText(fact, os, 'fr'), en: doesText(fact, os, 'en') };
  return {
    type: 'tf',
    factId: fact.id,
    missionId: fact.missionId,
    comboId: fact.comboId || null,
    prompt: fillOs(loc(tip, lang), os),
    truth: !!tip.truth,
    answer: tip.truth
  };
}

function buildKeys(fact, os, lang) {
  return {
    type: 'keys',
    factId: fact.id,
    missionId: fact.missionId,
    comboId: fact.comboId,
    prompt: promptKeys(fact, os, lang),
    keys: highlightKeys(fact.comboId, os),
    answer: formatCombo(fact.comboId, os)
  };
}

function buildPress(fact, os, lang, copyWord) {
  const mouse = fact.mouse || null;
  return {
    type: mouse ? 'mouse' : 'press',
    factId: fact.id,
    missionId: fact.missionId,
    comboId: fact.comboId || null,
    mouse,
    prompt: promptPress(fact, os, lang, copyWord),
    keys: fact.comboId ? highlightKeys(fact.comboId, os) : [],
    copyWord: copyWord || null,
    answer: fact.comboId ? formatCombo(fact.comboId, os) : (mouse || 'ok')
  };
}

export function buildChallenge(fact, type, { os, lang, rng, lastCopy, hands } = {}) {
  const mode = normalizeHands(hands);
  const allowed = allowedTypes(fact, mode);
  let t = type || pick(allowed, rng);
  if (t === 'press' && mode === 'touch') t = allowed.includes('keys') ? 'keys' : allowed[0];
  if (!allowed.includes(t)) t = allowed.includes('what') ? 'what' : allowed[0];
  if (t === 'what') return buildWhat(fact, os, lang, rng);
  if (t === 'tf') return buildTf(fact, os, lang, rng);
  if (t === 'keys' && canKeys(fact)) return buildKeys(fact, os, lang);
  if ((t === 'press' || t === 'mouse') && canPress(fact)) {
    if (t === 'press' && mode === 'touch') return buildWhat(fact, os, lang, rng);
    const word = fact.copyWord ? pickCopyWord(rng, lang, lastCopy) : null;
    return buildPress(fact, os, lang, word);
  }
  return buildWhat(fact, os, lang, rng);
}

function typeCycleFor(hands, rng) {
  if (normalizeHands(hands) === 'touch') return shuffle(['what', 'tf', 'keys', 'mouse'], rng);
  return shuffle(['what', 'tf', 'keys', 'press'], rng);
}

function resolveType(fact, wanted, hands) {
  const allowed = allowedTypes(fact, hands);
  let type = wanted;
  if (!allowed.includes(type)) {
    if (type === 'press' && allowed.includes('mouse')) type = 'mouse';
    else if (type === 'press' && allowed.includes('keys')) type = 'keys';
    else type = allowed.includes('what') ? 'what' : allowed[0];
  }
  return type;
}

/**
 * 4 challenges from a mission pool. Types shuffled.
 * `lastCopy` avoids the same copy-word sentence twice in a row.
 * `hands` = 'touch' | 'keyboard' — touch never emits press.
 */
export function generateMissionChallenges(missionId, opts = {}) {
  const os = opts.os || 'win';
  const lang = opts.lang === 'en' ? 'en' : 'fr';
  const hands = normalizeHands(opts.hands);
  const rng = opts.rng || mulberry32(seedFrom(opts.name, opts.now));
  const facts = factsFor(missionId);
  if (facts.length < 4) throw new Error('mission ' + missionId + ' needs ≥4 templates');
  const picked = shuffle(facts, rng).slice(0, 4);
  const typeCycle = typeCycleFor(hands, rng);
  let lastCopy = opts.lastCopy || null;
  const out = [];
  picked.forEach((fact, i) => {
    const type = resolveType(fact, typeCycle[i % typeCycle.length], hands);
    const ch = buildChallenge(fact, type, { os, lang, rng, lastCopy, hands });
    if (ch.copyWord) lastCopy = ch.copyWord;
    out.push(ch);
  });
  return out;
}

/** 10 items from missions 1–11. Seed = Date.now()+name. No two runs the same. */
export function generateBossGauntlet(opts = {}) {
  const os = opts.os || 'win';
  const lang = opts.lang === 'en' ? 'en' : 'fr';
  const hands = normalizeHands(opts.hands);
  const now = opts.now ?? Date.now();
  const rng = opts.rng || mulberry32(seedFrom(opts.name, now));
  const pool = allFacts();
  const picked = shuffle(pool, rng).slice(0, 10);
  const typeCycle = typeCycleFor(hands, rng);
  let lastCopy = opts.lastCopy || null;
  return picked.map((fact, i) => {
    const type = resolveType(fact, typeCycle[i % typeCycle.length], hands);
    const ch = buildChallenge(fact, type, { os, lang, rng, lastCopy, hands });
    if (ch.copyWord) lastCopy = ch.copyWord;
    return ch;
  });
}

export function missionTemplateCounts() {
  const out = {};
  for (const m of MISSIONS) {
    out[m.id] = m.isBoss ? allFacts().length : m.facts.length;
  }
  return out;
}

export function regularMissionIds() {
  return regularMissions().map((m) => m.id);
}

export { MISSIONS, allFacts, regularMissions };
