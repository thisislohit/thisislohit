# Scene clips

Drop a video here (mp4/h264 or webm) and reference it in `manifest.json`:

```json
{ "loom": { "src": "/scenes/loom.mp4", "flashAt": 12 } }
```

- Plays full-screen when the visitor clicks **Prune this timeline** (after the page crumbles).
- `flashAt` — second of the clip where the page begins to re-form underneath. Omit it to use "1.5s before the end".
- Plays with sound when the browser allows it, otherwise muted. A **Skip scene** button is always shown.
- If no clip is configured, the built-in Loom scene plays. If a clip fails to play, the page just re-forms.
- Keep clips short and compressed (a few MB) — they are served to visitors as-is.
