# Acme Notes — Agentiqa QA sandbox site

This is a deliberately small, dependency-free static website ("Acme Notes") used as a **QA sandbox for Agentiqa CI experiments**. It exists to be navigated and asserted against by an autonomous browser-testing agent, so it favors stable, literal strings and deterministic behavior over visual polish. It is plain HTML + CSS + vanilla JS with **no build step and no external dependencies** (no CDNs), and is deployed to GitHub Pages under the base path `/agentiqa-qa-sandbox-site/`.

## Two builds

The site ships in two interchangeable states, toggled by a single line in `form.js`:

- **healthy** — `deliverMessage()` returns `true`; the contact form shows the success block, and `<body data-build>` reads `v1-healthy`.
- **broken-form** — flip `deliverMessage()` to `return false`; the contact form shows the error block instead of success, and `<body data-build>` should be changed to `v1-broken-form` so runs can assert which build they hit.

## URL layout (GitHub Pages)

Base: `https://<org>.github.io/agentiqa-qa-sandbox-site/`

| Path                 | Page          |
| -------------------- | ------------- |
| `/` or `/index.html` | Acme Notes landing |
| `/features.html`     | Features      |
| `/pricing.html`      | Pricing       |
| `/contact.html`      | Contact us    |
| (any unknown path)   | `404.html` (served by GitHub Pages) |
