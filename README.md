# Theme Pack for cc-cockpit

`bronos.themes` adds 21 colour themes to cc-cockpit, on any system (macOS and Linux). Pick one in
Settings › Appearance › Theme. Each one colours the app, its panels and the Claude terminals (the
scheme's 16 terminal colours).

The palettes are the ones [Omarchy](https://omarchy.org) ships, turned into cc-cockpit themes with
the same mapping as the [Omarchy Theme](https://github.com/BronOS/cc-cockpit-omarchy-theme) plugin,
so a theme here looks exactly like that plugin's theme for the same Omarchy palette. On Omarchy,
install that plugin to follow your desktop theme live; install this one for fixed themes, or both.

The plugin is plain theme files: it runs no code. It works with any cc-cockpit that has theme
plugins (plugin API 1).

## Themes and credits

| Theme | Kind | Palette by |
|---|---|---|
| Tokyo Night | dark | [enkia](https://github.com/enkia/tokyo-night-vscode-theme) (MIT) |
| Catppuccin Mocha | dark | [Catppuccin](https://github.com/catppuccin/catppuccin) (MIT) |
| Catppuccin Latte | light | [Catppuccin](https://github.com/catppuccin/catppuccin) (MIT) |
| Rosé Pine Dawn | light | [Rosé Pine](https://github.com/rose-pine/rose-pine-theme) (MIT) |
| Nord | dark | [Arctic Ice Studio](https://github.com/nordtheme/nord) (MIT) |
| Gruvbox | dark | [Pavel Pertsev](https://github.com/morhetz/gruvbox) (MIT) |
| Everforest | dark | [sainnhe](https://github.com/sainnhe/everforest) (MIT) |
| Kanagawa | dark | [rebelot](https://github.com/rebelot/kanagawa.nvim) (MIT) |
| Flexoki Light | light | [Steph Ango](https://github.com/kepano/flexoki) (MIT) |
| Miasma | dark | [xero](https://github.com/xero/miasma.nvim) (MIT) |
| Matte Black, Ethereal, Hackerman, Jade Horse, Last Horizon, Retro 82, Solitude, Starship, Vantablack | dark | [Omarchy](https://github.com/basecamp/omarchy) (MIT) |
| Lupine, White | light | [Omarchy](https://github.com/basecamp/omarchy) (MIT) |

The palettes as Omarchy packages them (its `colors.toml` files) are in `palettes/`.

## Development

- `npm run build` writes `themes/*.json` and the theme list in `plugin.json` from `palettes/*.toml`
  through `scripts/palette.js` (a copy of the Omarchy Theme plugin's mapping: keep the two in step).
- `npm test` checks that the committed files match the build, every colour is valid, text is
  readable on every background (contrast at least 4.5:1) and every palette is credited here.
- A new theme: add `palettes/<id>.toml` in Omarchy's format, a row in `THEMES`
  (`scripts/build-themes.js`) and in the table above, then build.

## License

MIT for the plugin. Each palette keeps its authors' licence (all MIT, see the table).
