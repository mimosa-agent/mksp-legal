# mksp-legal

Public legal pages (privacy policies, terms) for 株式会社MKSP apps, served by GitHub Pages from `main`.
This repo is PUBLIC: never put secrets, app code or private notes here.

- Fairway privacy policy, terms and support moved to https://fairway.tokyo/privacy/, /terms/, /support/ (repo `fairway-site`) on 2026-10-09; `fairway/{privacy,terms,support}/` here are redirect stubs (older app versions link to them). Edit the pages in fairway-site. The β policy (`fairway/beta/privacy/`) and `fairway/badge-rarity.json` stay here.
- Fairway β (TestFlight beta, accounts + Clubhouse) privacy policy: `fairway/beta/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/fairway/beta/privacy/ (Mike approved 2026-10-01 for external testers; fold into the main policy when accounts ship).
- 5th Floor (private beta: iPhone via TestFlight + web app 5th.mksp.tokyo) privacy policy: `fifth-floor/beta/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/fifth-floor/beta/privacy/ (Mike approved publishing 2026-10-05; source draft and data map live in the 5th-floor repo, `docs/product/`). Update it when 5F adds messaging, AI translation or dinners.
- Hagumori (はぐもり, waitlist site hagumori.mksp.tokyo) privacy policy: `hagumori/privacy/index.html` → https://mimosa-agent.github.io/mksp-legal/hagumori/privacy/ (Mike approved 2026-10-06; covers the website and waitlist only). Before the app launches, write the app policy; before the first waitlist email, name the email provider.
- 5th Floor terms of use: `fifth-floor/beta/terms/index.html` → https://mimosa-agent.github.io/mksp-legal/fifth-floor/beta/terms/ (linked from the app's join screen and the web payment page).
- 5th Floor 特定商取引法に基づく表記 (dinner sales; Stripe and Japanese law require it before live payments): `fifth-floor/tokushoho/index.html` → https://mimosa-agent.github.io/mksp-legal/fifth-floor/tokushoho/
- Plain HTML, no build step. Edit, commit, push; Pages redeploys in about a minute.
- When an app adds data collection (accounts, sync, purchases, new analytics), update its policy and the effective date before release.

Set up on a new machine: `gh repo clone mimosa-agent/mksp-legal ~/lab/mksp-legal`.
