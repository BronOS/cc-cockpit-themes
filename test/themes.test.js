'use strict'
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { THEMES, build, json } = require('../scripts/build-themes')
const { contrast } = require('../scripts/palette')

const ROOT = path.join(__dirname, '..')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'plugin.json'), 'utf8'))
const COLOR = /^(#[0-9a-f]{6}|rgba\(\d{1,3}, \d{1,3}, \d{1,3}, [01](\.\d+)?\))$/

test('the committed theme files and manifest are what the build writes', () => {
  for (const [id, name] of THEMES) {
    assert.equal(fs.readFileSync(path.join(ROOT, 'themes', `${id}.json`), 'utf8'), json(build(id, name)), `${id}: run npm run build`)
  }
  assert.deepEqual(manifest.contributes.themes, THEMES.map(([id]) => ({ id, file: `themes/${id}.json` })))
  // Every palette is in the pack, and nothing else is in themes/.
  assert.deepEqual(fs.readdirSync(path.join(ROOT, 'palettes')).sort(), THEMES.map(([id]) => `${id}.toml`).sort())
  assert.deepEqual(fs.readdirSync(path.join(ROOT, 'themes')).sort(), THEMES.map(([id]) => `${id}.json`).sort())
})

test('a theme-only plugin: no host code, ids the app takes', () => {
  assert.equal(manifest.main, undefined)
  for (const { id } of manifest.contributes.themes) assert.match(`${manifest.id}/${id}`, /^[A-Za-z0-9][A-Za-z0-9._/-]{0,63}$/)
})

test('every theme has valid colours, readable text and a full terminal palette', () => {
  for (const [id] of THEMES) {
    const t = JSON.parse(fs.readFileSync(path.join(ROOT, 'themes', `${id}.json`), 'utf8'))
    for (const [k, v] of [...Object.entries(t.vars), ...Object.entries(t.xterm)]) assert.match(v, COLOR, `${id} ${k}`)
    assert.equal(Object.keys(t.xterm).length, 21, id)
    assert.ok(contrast(t.vars['--cc-fg'], t.vars['--cc-bg']) >= 4.5, `${id}: text on background`)
    assert.ok(contrast(t.vars['--cc-accent-fg'], t.vars['--cc-accent']) >= 2.5, `${id}: text on accent`)
  }
})

test('README credits every palette source', () => {
  const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8')
  for (const [, name] of THEMES) assert.ok(readme.includes(name), `README lacks ${name}`)
})
