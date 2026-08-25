/** Challenge generators. Browser + Node. No DOM. */

import { MISSIONS, allFacts, factsFor, regularMissions } from './missions.js';
import { formatCombo, fillOs, isOsEaten, highlightKeys, COMBOS } from './keys.js';

export const COPY_WORDS = {
  fr: ['banane', 'dragon', 'fusée', 'chat', 'pizza', 'étoile', 'robot', 'nuage', 'cactus', 'licorne', 'volcan', 'komodo'],
  en: ['banana', 'dragon', 'rocket', 'cat', 'pizza', 'star', 'robot', 'cloud', 'cactus', 'unicorn', 'volcano', 'komodo']
};

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

export function allowedTypes(fact) {
  const types = ['what', 'tf'];
  if (canKeys(fact)) types.push('keys');
  if (canPress(fact)) types.push(fact.mouse ? 'mouse' : 'press');
  return types;
}

function doesText(fact, os, lang) {
  return fillOs(loc(fact.does, lang), os);
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
    return lang === 'en'
      ? `What does ${combo} do?`
      : `Que fait ${combo} ?`;
  }
  if (fact.mouse === 'dblclick') return lang === 'en' ? 'What does a double-click do?' : 'Que fait un double-clic ?';
  if (fact.mouse === 'contextmenu') return lang === 'en' ? 'What does a right-click do?' : 'Que fait un clic droit ?';
  if (fact.mouse === 'drag') return lang === 'en' ? 'What does a drag do?' : 'Que fait un glisser ?';
  return lang === 'en' ? 'What is the right move?' : 'C’est quoi le bon geste ?';
}

function promptPress(fact, os, lang, copyWord) {
  if (fact.mouse === 'dblclick') {
    return lang === 'en' ? 'Double-click the target.' : 'Double-clique la cible.';
  }
  if (fact.mouse === 'contextmenu') {
    return lang === 'en' ? 'Right-click the target (the other button).' : 'Clic droit sur la cible (l’autre bouton).';
  }
  if (fact.mouse === 'drag') {
    return lang === 'en' ? 'Drag the star onto the pad.' : 'Glisse l’étoile jusqu’au tapis.';
  }
  const combo = fact.comboId ? formatCombo(fact.comboId, os) : '';
  if (fact.copyWord && copyWord) {
    return lang === 'en'
      ? `Copy the word ${copyWord.toUpperCase()} — press ${combo}.`
      : `Copie le mot ${copyWord.toUpperCase()} — appuie sur ${combo}.`;
  }
  return lang === 'en' ? `Press ${combo}.` : `Appuie sur ${combo}.`;
}

function promptKeys(fact, os, lang) {
  const does = doesText(fact, os, lang);
  return lang === 'en'
    ? `Which keys? ${does}`
    : `Quelles touches ? ${does}`;
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

export function buildChallenge(fact, type, { os, lang, rng, lastCopy }) {
  const t = type || pick(allowedTypes(fact), rng);
  if (t === 'what') return buildWhat(fact, os, lang, rng);
  if (t === 'tf') return buildTf(fact, os, lang, rng);
  if (t === 'keys' && canKeys(fact)) return buildKeys(fact, os, lang);
  if ((t === 'press' || t === 'mouse') && canPress(fact)) {
    const word = fact.copyWord ? pickCopyWord(rng, lang, lastCopy) : null;
    return buildPress(fact, os, lang, word);
  }
  return buildWhat(fact, os, lang, rng);
}

/**
 * 4 challenges from a mission pool. Types shuffled.
 * `lastCopy` avoids the same copy-word sentence twice in a row.
 */
export function generateMissionChallenges(missionId, opts = {}) {
  const os = opts.os || 'win';
  const lang = opts.lang === 'en' ? 'en' : 'fr';
  const rng = opts.rng || mulberry32(seedFrom(opts.name, opts.now));
  const facts = factsFor(missionId);
  if (facts.length < 4) throw new Error('mission ' + missionId + ' needs ≥4 templates');
  const picked = shuffle(facts, rng).slice(0, 4);
  const typeCycle = shuffle(['what', 'tf', 'keys', 'press'], rng);
  let lastCopy = opts.lastCopy || null;
  const out = [];
  picked.forEach((fact, i) => {
    const allowed = allowedTypes(fact);
    let type = typeCycle[i % typeCycle.length];
    if (!allowed.includes(type)) {
      if (type === 'press' && allowed.includes('mouse')) type = 'mouse';
      else type = allowed.includes('what') ? 'what' : allowed[0];
    }
    const ch = buildChallenge(fact, type, { os, lang, rng, lastCopy });
    if (ch.copyWord) lastCopy = ch.copyWord;
    out.push(ch);
  });
  return out;
}

/** 10 items from missions 1–11. Seed = Date.now()+name. No two runs the same. */
export function generateBossGauntlet(opts = {}) {
  const os = opts.os || 'win';
  const lang = opts.lang === 'en' ? 'en' : 'fr';
  const now = opts.now ?? Date.now();
  const rng = opts.rng || mulberry32(seedFrom(opts.name, now));
  const pool = allFacts();
  const picked = shuffle(pool, rng).slice(0, 10);
  const typeCycle = shuffle(['what', 'tf', 'keys', 'press'], rng);
  let lastCopy = opts.lastCopy || null;
  return picked.map((fact, i) => {
    const allowed = allowedTypes(fact);
    let type = typeCycle[i % typeCycle.length];
    if (!allowed.includes(type)) {
      if (type === 'press' && allowed.includes('mouse')) type = 'mouse';
      else type = allowed.includes('what') ? 'what' : allowed[0];
    }
    const ch = buildChallenge(fact, type, { os, lang, rng, lastCopy });
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
