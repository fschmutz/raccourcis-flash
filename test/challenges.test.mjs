import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchKeydown, formatCombo, detectOS, eventFromChord, highlightKeys, isOsEaten } from '../js/keys.js';
import {
  shuffle,
  mulberry32,
  seedFrom,
  generateMissionChallenges,
  generateBossGauntlet,
  decoysFor,
  pickCopyWord,
  missionTemplateCounts,
  regularMissionIds,
  allFacts,
  COPY_WORDS
} from '../js/challenges.js';
import { MISSIONS, regularMissions, bossPoolCovers } from '../js/missions.js';

function ev(partial) {
  return {
    key: 'c',
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    shiftKey: false,
    repeat: false,
    ...partial
  };
}

test('combo matcher: Win copy is Ctrl+C, not Cmd+C', () => {
  assert.equal(formatCombo('copy', 'win'), 'Ctrl+C');
  assert.equal(matchKeydown(ev({ key: 'c', ctrlKey: true }), 'copy', 'win'), true);
  assert.equal(matchKeydown(ev({ key: 'C', ctrlKey: true }), 'copy', 'win'), true);
  assert.equal(matchKeydown(ev({ key: 'c', metaKey: true }), 'copy', 'win'), false);
  assert.equal(matchKeydown(ev({ key: 'c' }), 'copy', 'win'), false);
  assert.equal(matchKeydown(ev({ key: 'v', ctrlKey: true }), 'copy', 'win'), false);
});

test('combo matcher: Mac copy is Cmd+C, not Ctrl+C', () => {
  assert.equal(formatCombo('copy', 'mac'), 'Cmd+C');
  assert.equal(matchKeydown(ev({ key: 'c', metaKey: true }), 'copy', 'mac'), true);
  assert.equal(matchKeydown(ev({ key: 'c', ctrlKey: true }), 'copy', 'mac'), false);
  assert.equal(formatCombo('paste', 'mac'), 'Cmd+V');
  assert.equal(formatCombo('cut', 'linux'), 'Ctrl+X');
});

test('combo matcher ignores key repeats', () => {
  assert.equal(matchKeydown(ev({ key: 'c', ctrlKey: true, repeat: true }), 'copy', 'win'), false);
  assert.equal(matchKeydown(ev({ key: 'c', metaKey: true, repeat: true }), 'copy', 'mac'), false);
});

test('combo matcher: redo alts Win Y and Shift+Z, Mac Shift+Z', () => {
  assert.equal(matchKeydown(ev({ key: 'y', ctrlKey: true }), 'redo', 'win'), true);
  assert.equal(matchKeydown(ev({ key: 'z', ctrlKey: true, shiftKey: true }), 'redo', 'win'), true);
  assert.equal(matchKeydown(ev({ key: 'z', metaKey: true, shiftKey: true }), 'redo', 'mac'), true);
  assert.equal(matchKeydown(ev({ key: 'y', metaKey: true }), 'redo', 'mac'), false);
});

test('combo matcher: save / find / zoom differ by OS', () => {
  assert.equal(formatCombo('save', 'win'), 'Ctrl+S');
  assert.equal(formatCombo('save', 'mac'), 'Cmd+S');
  assert.equal(formatCombo('find', 'linux'), 'Ctrl+F');
  assert.equal(matchKeydown(ev({ key: 's', ctrlKey: true }), 'save', 'win'), true);
  assert.equal(matchKeydown(ev({ key: '=', metaKey: true }), 'zoomIn', 'mac'), true);
  assert.equal(matchKeydown(ev({ key: '+', ctrlKey: true }), 'zoomIn', 'win'), true);
  assert.equal(matchKeydown(ev({ key: '0', ctrlKey: true }), 'zoomReset', 'win'), true);
  assert.equal(matchKeydown(ev({ key: '-', metaKey: true }), 'zoomOut', 'mac'), true);
});

test('combo matcher: lock and screenshot are OS-eaten', () => {
  assert.equal(isOsEaten('screenshot'), true);
  assert.equal(isOsEaten('lock'), true);
  assert.equal(isOsEaten('copy'), false);
  assert.equal(formatCombo('lock', 'win'), 'Win+L');
  assert.equal(formatCombo('lock', 'mac'), 'Cmd+Ctrl+Q');
  assert.equal(formatCombo('screenshot', 'win'), 'Win+Shift+S');
  assert.equal(formatCombo('screenshot', 'mac'), 'Cmd+Shift+4');
  assert.ok(highlightKeys('lock', 'mac').includes('cmd'));
  assert.ok(highlightKeys('lock', 'mac').includes('ctrl'));
});

test('detectOS: Mac / Win / Linux', () => {
  assert.equal(detectOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 'MacIntel'), 'mac');
  assert.equal(detectOS('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32'), 'win');
  assert.equal(detectOS('Mozilla/5.0 (X11; Linux x86_64)', 'Linux x86_64'), 'linux');
  assert.equal(detectOS('Mozilla/5.0 (iPad; CPU OS 17_0)', 'iPad'), 'mac');
});

test('eventFromChord round-trips through the matcher', () => {
  for (const os of ['win', 'mac', 'linux']) {
    for (const id of ['copy', 'paste', 'undo', 'save', 'find', 'selectAll']) {
      assert.equal(matchKeydown(eventFromChord(id, os), id, os), true, id + ' ' + os);
    }
  }
});

test('shuffle is a permutation and not the identity', () => {
  const src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let differed = 0;
  for (let seed = 1; seed <= 40; seed++) {
    const out = shuffle(src, mulberry32(seed));
    assert.deepEqual([...out].sort((a, b) => a - b), src);
    if (out.some((v, i) => v !== src[i])) differed += 1;
  }
  assert.ok(differed >= 30, 'shuffle stayed identity too often: ' + differed);
});

test('every regular mission has ≥4 challenge templates', () => {
  const counts = missionTemplateCounts();
  for (const m of regularMissions()) {
    assert.ok(m.facts.length >= 4, m.id + ' has ' + m.facts.length);
    assert.ok(counts[m.id] >= 4, m.id);
    const ch = generateMissionChallenges(m.id, { os: 'win', lang: 'fr', now: 1, name: 'Paloma' });
    assert.equal(ch.length, 4, m.id + ' generated');
  }
});

test('boss pool covers missions 1–11', () => {
  const ids = regularMissionIds();
  assert.deepEqual(ids, [
    'copy', 'undo', 'select', 'save', 'tabs', 'find',
    'zoom', 'windows', 'mouse', 'capture', 'safety'
  ]);
  const covered = bossPoolCovers();
  for (const id of ids) {
    assert.ok(covered.includes(id), 'boss pool missing ' + id);
  }
  const gauntlet = generateBossGauntlet({ os: 'mac', lang: 'en', name: 'Paloma', now: 99 });
  assert.equal(gauntlet.length, 10);
  const gauntlet2 = generateBossGauntlet({ os: 'mac', lang: 'en', name: 'Paloma', now: 100 });
  const same = gauntlet.every((c, i) => c.factId === gauntlet2[i].factId && c.type === gauntlet2[i].type);
  assert.equal(same, false, 'two boss seeds should differ');
});

test('decoys never equal the answer', () => {
  const facts = allFacts();
  for (const os of ['win', 'mac', 'linux']) {
    for (const lang of ['fr', 'en']) {
      for (const fact of facts) {
        const d = decoysFor(fact, os, lang, mulberry32(42), 3);
        assert.equal(d.length, 3, fact.id);
        const does = fact.does[lang] || fact.does.fr;
        for (const x of d) {
          assert.notEqual(x, does, 'decoy equals raw does for ' + fact.id);
          assert.ok(x && x.length > 0);
        }
      }
    }
  }
  for (const m of regularMissions()) {
    const chs = generateMissionChallenges(m.id, { os: 'linux', lang: 'en', now: 7, name: 'Léo' });
    for (const ch of chs) {
      if (ch.type === 'what') {
        assert.equal(ch.options.length, 4);
        assert.ok(ch.options.includes(ch.answer));
        const others = ch.options.filter((o) => o !== ch.answer);
        assert.equal(others.length, 3);
        for (const o of others) assert.notEqual(o, ch.answer);
        for (const d of ch.decoys) assert.notEqual(d, ch.answer);
      }
    }
  }
});

test('press challenges never use OS-eaten combos', () => {
  for (const m of regularMissions()) {
    for (let n = 1; n <= 8; n++) {
      const chs = generateMissionChallenges(m.id, { os: 'win', lang: 'fr', now: n, name: 'Paloma' });
      for (const ch of chs) {
        if (ch.type === 'press' || ch.type === 'mouse') {
          assert.equal(isOsEaten(ch.comboId), false, m.id + ' ' + ch.comboId);
        }
      }
    }
  }
  for (let n = 1; n <= 12; n++) {
    const g = generateBossGauntlet({ os: 'mac', lang: 'fr', name: 'Paloma', now: n * 17 });
    for (const ch of g) {
      if (ch.type === 'press') assert.equal(isOsEaten(ch.comboId), false, ch.comboId);
    }
  }
});

test('copy words never repeat twice in a row', () => {
  const rng = mulberry32(3);
  let last = null;
  for (let i = 0; i < 30; i++) {
    const w = pickCopyWord(rng, 'fr', last);
    assert.ok(COPY_WORDS.fr.includes(w));
    if (last !== null) assert.notEqual(w, last);
    last = w;
  }
});

test('seedFrom(name, now) changes when the clock moves', () => {
  assert.notEqual(seedFrom('Paloma', 1), seedFrom('Paloma', 2));
  assert.notEqual(seedFrom('Paloma', 10), seedFrom('Léo', 10));
});

test('MISSIONS linear order is 12 long with a boss last', () => {
  assert.equal(MISSIONS.length, 12);
  assert.equal(MISSIONS[0].id, 'copy');
  assert.equal(MISSIONS[11].id, 'boss');
  assert.equal(MISSIONS[11].isBoss, true);
  MISSIONS.forEach((m, i) => assert.equal(m.index, i + 1));
});
