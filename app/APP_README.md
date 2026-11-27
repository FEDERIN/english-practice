# English Practice (PWA)

A small React app for the **iPad mini 2**. It uses the vocabulary and grammar notes in the parent folder and runs in Safari as an installable, offline-capable web app.

## Why a PWA and not React Native?

The iPad mini 2 stops at **iOS 12.5.8**. Current React Native versions require iOS 13.4 or 15.1, so a native build would need an old, unsupported stack. This web app is built with `build.target: safari12` and avoids CSS/JS features newer than Safari 12.

## Features

- **Sentence Builder** — combine a subject, a verb and a time expression across 12 tenses. The evaluator checks **grammar** (structure) and **naturalness** (time-marker fit) as two separate results, then offers an AI prompt for deeper feedback online.
- **Fill in the blank** — 24 exercises generated from the “Ejercicios / Ejemplos de práctica” sections of `modales.md`, `there_is_there_are.md`, `adjetivos.md` and `presente_continuo.md`.
- **Flashcards** — 18 vocabulary entries from `vocabulario.md`, with a “Known” marker.
- **Grammar notes** — 18 topic summaries from `reglas_ingles.md`, searchable and expandable.
- **Progress** — answers and known cards saved in `localStorage`.
- **Offline** — a small service worker caches the app shell after the first visit.

## Build locally

From this folder:

```powershell
npm.cmd install
npm.cmd run icons   # optional: icons are already included in public/icons
npm.cmd run dev
```

Run the evaluator tests:

```powershell
npm.cmd test
```

Production build:

```powershell
npm.cmd run build
```

The output is in `dist/`. Serve it over HTTPS (or `localhost`) — service workers do not run from `file://`.

## Use it on the iPad

1. Serve `dist/` at an address the iPad can reach over HTTPS.
2. Open the address in **Safari** on the iPad mini 2.
3. Tap **Share** → **Add to Home Screen**.
4. Open the new icon. It runs full screen and keeps working offline.

## Updating content

Edit `src/data/content.js`:

- `topics` — grammar reference cards.
- `exercises` — fill-in-the-blank questions (`prompt`, `answer`, `sentence`).
- `flashcards` — English/Spanish pairs.

Edit `src/data/sentenceBuilder.js` to extend the Sentence Builder:

- `subjects` — allowed subjects, with their `am/is/are`, `was/were` and `have/has` forms.
- `verbs` — base, third-person, `-ing`, past and participle forms (`src/data/verbs.js`).
- `timeExpressions` — each one lists `preferred` tense ids plus a short `note`. This is what drives the offline naturalness check.
- `verbExamples` (in `src/data/timeExpressionCategories.js`) — per-tense allow-list: when a verb is listed for a tense, that expression only appears for those verbs.
- `excludedVerbs` (same file) — per-tense deny-list: verbs listed here are removed for that expression. Use it when fewer verbs need excluding than including. Both filters can be combined; exclusions are applied after the allow-list.
- `tenses` — rule, form, use, example and exceptions for each tense.

Add new practice sentences to the `.md` notes and use the `english-practice` MCP tools (`generate_exercise` + `check_answer`) to produce more fill-in-the-blank items.

## Grammar vs naturalness

The Sentence Builder deliberately returns two independent verdicts. A sentence can match the tense structure perfectly and still sound unnatural with a given time expression (for example, “I will be studying yesterday”). The offline rules catch the common cases; the **Copy AI prompt** button hands the exact combination to an online AI for the nuanced judgment.

## Notes

- UI language is English; vocabulary meanings stay in Spanish because that is what the notes contain.
- The service worker cache name is `english-practice-v7`. Bump it in `public/sw.js` when you deploy a new version so iPads refresh their cached files.
- **TTS (optional):** the 🔊 button uses VoiceRSS. Get a free key at https://www.voicerss.org/ and set VOICERSS_KEY in .env.local (local) or as a Vercel environment variable. Without a key the button stays silent. Do not commit your key.
