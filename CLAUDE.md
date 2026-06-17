# CLAUDE.md — Project Binks

## What this project is
Binks is a Jarvis-style personal AI assistant built by Antoine (Villa), founder of
Legacy By Villa. She is a voice-enabled mentor with the persona of a warm,
no-nonsense auntie. This project began as single-file HTML prototypes and is
headed toward a native mobile app (Capacitor) as part of "The Wellness Loop."

Owner context: Antoine is an entrepreneur (Etsy shop "Legacy By Villa" —
motivational wall art; TikTok/Pinterest content; freelance web design). He is
not a traditional developer — explain changes in plain English, one step at a
time, and confirm before destructive actions.

## Project structure

```
BINKS/
├── CLAUDE.md                     ← you are here
├── package.json                  ← Vite + Capacitor deps (install when ready for Phase 2)
├── vite.config.js                ← build config (Phase 2)
├── capacitor.config.json         ← native app config (Phase 4)
├── .gitignore
│
├── binks-mobile_31.html          ← THE REAL APP (current, single-file, deploy this)
│
└── src/                          ← Phase 2 modular version (placeholders only for now)
    ├── index.html
    ├── style/                    ← CSS split by section
    └── js/                       ← JS split by concern
        ├── brain.js              ← SYSTEM_PROMPT + sendMessage
        ├── main.js               ← wires everything, DOM event listeners
        ├── voice/                ← output.js (speak) · input.js (wake word)
        ├── canvas/               ← digital-rain · ember-reactor · ember-field · radar
        ├── holodeck/             ← intent · search · map-engine
        ├── modules/              ← workout · market · charts
        └── ui/                   ← state · panels · boot · standby · systems
```

## Deployment (current — Phase 1)
`binks-mobile_31.html` is self-contained. Drag it to Netlify Drop.
Do NOT remove the `anthropic-dangerous-direct-browser-access` header — required
for direct browser → Anthropic API calls.

## Deployment (Phase 2 — after modular split)
`npm run build` → drag the `dist/` folder to Netlify Drop.

## Architecture — Three acts
1. BOOT — ember particles assemble into the reactor, terminal types init log,
   "neural link" (API key) authorization.
2. STANDBY — dark screen, tap to arm mic, wake word "Hey Binks"
   (regex also matches binx/bings/banks).
3. COMMAND CENTER — Jarvis OS layout: nav strip (locked future tabs), central
   dial stage (chevron ring, satellites U/E/D/M, connector lines), mission
   panels, Market Pulse, locked modules, sysbar, chat feed + input.

## Visual engines (canvas)
- `digitalRain(canvas)` — neural intelligence field: ~70 ember particles
  drifting on pure black with synapse lines connecting nearby ones.
  (Name is legacy — it renders the neural field now, not rain.)
- `emberReactor(canvas)` — local-canvas ember storm for boot/standby orbs.
  Starts scattered and gathers (`reform()` restarts the formation entrance).
- `emberField(canvas, getAnchor)` — full-screen reactive core for the command
  center. States: idle / dispersed / listening / thinking / speaking.
  After speaking she DISPERSES into the rain; she GATHERS to respond.
  Gather is intentionally faster than dissolve. Respect prefers-reduced-motion.

## Brain protocol
- Anthropic Messages API, model `claude-sonnet-4-5`.
- System prompt forces raw-JSON replies:
  `{"say","mode","add_tasks","complete_tasks","recommendations"}`
- `mode` is chosen BY BINKS per response (mentor / strategist / drill) —
  never by UI controls. UI chips + satellite M are indicators only.
- RECITAL OVERRIDE: if Antoine asks for a line word-for-word, `say` contains
  it verbatim.
- Live state (queue/completed/recs) is appended to the system prompt each call.
- Mobile persists tasks/recs in localStorage (`binks_tasks`, `binks_recs`).
- Market Pulse uses the `web_search_20250305` tool, expects
  `{"items":[3 strings]}`.

## Voice
- Output: browser speechSynthesis; prefers female English voices
  (Samantha, Google US English, Aria, Jenny...). Hardened against late
  voice-list load, autoplay block (silent unlock on first pointerdown), and
  Chrome's mid-speech pause (resume keepalive every 3s).
- Input: webkitSpeechRecognition / SpeechRecognition.

## Style / brand rules
- Palette (v31 — purple/violet theme):
  bg `#080412/#0e0820`, gold `#a78bfa`, deep gold `#7c3aed`,
  rose `#d4a017`, cream `#ede9fe`, dim `#4a3a6a`, volt `#e9d5ff`.
- Fonts: Bricolage Grotesque (display), Inter (body), JetBrains Mono (HUD).
- Persona: calls him "Antoine"; NEVER pet names (baby/sugar/honey).
- Listening state tints rose. Keep all three formation/disperse behaviors.

## Holographic projector
- `detectVisualIntent(text)` fires on "show me / pull up / picture of / map of"
  plus category regexes (map, clothing, art, food, interior, landscape).
- `searchHoloImage(query)` distills the subject, searches Wikipedia opensearch →
  REST summary. Pages WITH coordinates return {type:'map', lat, lon};
  others return {type:'img', image}.
- `showHoloMap(lat,lon,label,desc)` — particle cartography engine with
  pan/zoom/pinch, pulsing beacon, constellation links.
- `showHolo(url, caption)` — photo holograph: cyan duotone, scanlines,
  sweep light, edge-glow border, flicker.

## Speed optimizations (keep these)
- web_search tool attached ONLY when message matches a live-data regex.
- History trimmed to last ~12 turns (starting on a user message) per call.
- max_tokens 600.

## Dead / inactive code (clean up in Phase 2)
- `_DEAD_drawHoloFace` (line 2437) — replaced by emberField, safe to delete.
- `initHoloAvatar` (line 2582) — Three.js holographic head; Three.js is not
  loaded, so this never runs. Safe to delete.

## Known issues / next debugging targets
- Wake-word reliability on iOS Safari is best-effort; the session-mode
  rewrite (one "Hey Binks" opens a continuous conversation window) was
  started but rolled back — rebuild it cleanly.
- Map beacon position assumes plate carrée projection; verify against known
  cities and calibrate offsets if needed.

## Roadmap (in priority order)
1. Deploy `binks-mobile_31.html` → Netlify Drop → add to home screen.
   Verify mic + wake word on real device.
2. Light up locked modules one at a time: Content Studio (posting calendar),
   Client CRM (web design leads), Revenue tracker (Etsy numbers).
3. Conversational live lookups (weather/news) via web_search in chat.
4. Phase 2 — modular split: extract CSS/JS into src/, add Vite build step.
5. Capacitor conversion for The Wellness Loop app (stack: Capacitor,
   RevenueCat, Supabase, Stripe, Anthropic API proxy). Move API key
   server-side at this stage.
6. Premium consistent voice (e.g. ElevenLabs) to replace device TTS.

## Working agreements
- Keep `binks-mobile_31.html` runnable as a single file until Phase 2.
- After any edit: check JS with `node --check`, confirm CSS braces balance,
  and confirm every getElementById target exists.
- Never commit or hardcode API keys. The user's key lives only in their
  browser localStorage.
- When something breaks, surface the real error to the UI (sys message),
  not a generic failure line.
