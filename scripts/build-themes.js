'use strict'
// Builds the pack: each palettes/<id>.toml (Omarchy's colors.toml format) becomes themes/<id>.json
// through scripts/palette.js, and plugin.json's contributes.themes lists them in THEMES order.
// `npm run build`; test/themes.test.js checks that the committed files are what this writes.
const fs = require('node:fs')
const path = require('node:path')
const { parseColors, themeOf } = require('./palette')

const ROOT = path.join(__dirname, '..')

// id, the name shown in Settings › Appearance, and where the palette comes from (README credits).
const THEMES = [
  ['tokyo-night', 'Tokyo Night', 'enkia, Tokyo Night (MIT)'],
  ['catppuccin', 'Catppuccin Mocha', 'Catppuccin (MIT)'],
  ['catppuccin-latte', 'Catppuccin Latte', 'Catppuccin (MIT)'],
  ['rose-pine', 'Rosé Pine Dawn', 'Rosé Pine (MIT)'],
  ['nord', 'Nord', 'Arctic Ice Studio, Nord (MIT)'],
  ['gruvbox', 'Gruvbox', 'Pavel Pertsev, gruvbox (MIT)'],
  ['everforest', 'Everforest', 'sainnhe, Everforest (MIT)'],
  ['kanagawa', 'Kanagawa', 'rebelot, kanagawa.nvim (MIT)'],
  ['flexoki-light', 'Flexoki Light', 'Steph Ango, Flexoki (MIT)'],
  ['miasma', 'Miasma', 'xero, miasma.nvim (MIT)'],
  ['matte-black', 'Matte Black', 'Omarchy (MIT)'],
  ['ethereal', 'Ethereal', 'Omarchy (MIT)'],
  ['hackerman', 'Hackerman', 'Omarchy (MIT)'],
  ['jade-horse', 'Jade Horse', 'Omarchy (MIT)'],
  ['last-horizon', 'Last Horizon', 'Omarchy (MIT)'],
  ['lupine', 'Lupine', 'Omarchy (MIT)'],
  ['retro-82', 'Retro 82', 'Omarchy (MIT)'],
  ['solitude', 'Solitude', 'Omarchy (MIT)'],
  ['starship', 'Starship', 'Omarchy (MIT)'],
  ['vantablack', 'Vantablack', 'Omarchy (MIT)'],
  ['white', 'White', 'Omarchy (MIT)'],
]

/** The theme file of one palette: { id, name, kind, vars, xterm }. Throws on a palette the mapping refuses. */
function build(id, name) {
  const t = themeOf(parseColors(fs.readFileSync(path.join(ROOT, 'palettes', `${id}.toml`), 'utf8')), id)
  if (t.error) throw new Error(`${id}: ${t.error}`)
  return { id, name, kind: t.kind, vars: t.vars, xterm: t.xterm }
}

const json = (v) => `${JSON.stringify(v, null, 2)}\n`

function main() {
  for (const [id, name] of THEMES) fs.writeFileSync(path.join(ROOT, 'themes', `${id}.json`), json(build(id, name)))
  const manifestPath = path.join(ROOT, 'plugin.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  manifest.contributes = { themes: THEMES.map(([id]) => ({ id, file: `themes/${id}.json` })) }
  fs.writeFileSync(manifestPath, json(manifest))
}

module.exports = { THEMES, build, json }
if (require.main === module) main()
