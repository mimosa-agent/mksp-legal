# mksp-legal

Public legal pages (privacy policies, terms) for 株式会社MKSP apps, served by GitHub Pages from `main`.
This repo is PUBLIC: never put secrets, app code or private notes here.

- Fairway privacy policy: `fairway/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/fairway/privacy/
- Fairway β (TestFlight beta, accounts + Clubhouse) privacy policy: `fairway/beta/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/fairway/beta/privacy/ (Mike approved 2026-10-01 for external testers; fold into the main policy when accounts ship).
- 5th Floor (private beta: iPhone via TestFlight + web app 5th.mksp.tokyo) privacy policy: `fifth-floor/beta/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/fifth-floor/beta/privacy/ (Mike approved publishing 2026-10-05; source draft and data map live in the 5th-floor repo, `docs/product/`). Update it when 5F adds messaging, AI translation or dinners.
- Hagumori (はぐもり, waitlist site hagumori.mksp.tokyo) privacy policy: `hagumori/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/hagumori/privacy/ (Mike approved 2026-10-06; covers the website and waitlist only). Before the app launches, write the app policy; before the first waitlist email, name the email provider.
- Plain HTML, no build step. Edit, commit, push; Pages redeploys in about a minute.
- When an app adds data collection (accounts, sync, purchases, new analytics), update its policy and the effective date before release.

Set up on a new machine: `gh repo clone mimosa-agent/mksp-legal ~/lab/mksp-legal`.
