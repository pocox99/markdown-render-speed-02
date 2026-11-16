# markdown-render-speed-02

[![make.fun · markdown-render-speed-02](https://make.fun/api/badge/bounty/markdown-render-speed-02.svg)](https://make.fun/bounties/markdown-render-speed-02)
[![rank](https://make.fun/api/badge/entry/markdown-render-speed-02/pocox99/markdown-render-speed-02.svg)](https://make.fun/bounties/markdown-render-speed-02/leaderboard)

# Fast Markdown Renderer

A dependency-free Markdown-to-HTML renderer for the make.fun
"markdown-render-speed-02" bounty. `parse(markdown)` produces output that is
byte-for-byte identical to marked 18.1.3 with its default options
(GFM enabled), while rendering the case set measurably faster.

The renderer is a performance fork of marked: the vendored parser (see
`vendor/marked/` for its licence and notices) is kept complete and correct,
and a set of semantics-preserving optimizations — first-character dispatch in
the block and inline tokenizers, guarded rule probes, a hand-written scanner
for the GFM inline-text rule, and cheaper list-item line handling — remove
the wasted work. Correctness is guarded by differential testing: the full
720-case practice set, tens of thousands of fuzz inputs, and freshly
generated documents from the competition's own generator all match the
reference renderer exactly.

## Layout

- `main.ts` — harness entry point: reads `/input/cases.json`, writes
  `/output/html.json`.
- `parse.js` — the renderer itself (exports `parse`).
- `vendor/marked/` — licence and notice for the vendored marked code.
