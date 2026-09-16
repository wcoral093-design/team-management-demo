# Demo maintenance and publishing

The user wants a permanent public preview URL that always points to the latest published demo.

- Edit `index.html`, `styles.css`, and `app.js` as the canonical sources.
- Run `node build.mjs` after changes. It updates both `out/index.html` and the downloadable single-file demo.
- Use the Sites hosting skill to publish every completed update unless the user explicitly requests local-only work.
- Reuse the exact `project_id` in `.openai/hosting.json`. Never create a replacement Site for updates or change the stable URL.
- Preserve the requested public access, so anyone with the URL can preview without an internal network.
- The published artifact is `out/` only. Do not expose project source files, local logs, or unrelated workspace files as static assets.
- Use the repository rooted in this directory for Sites source publishing; never commit the parent workspace.
- This is a front-end demo. Member and credit operations are simulated in the browser and reset on reload.
