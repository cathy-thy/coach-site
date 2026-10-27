# Jordan Vale Training

A static personal-trainer site used to test a TikTok Pixel on GitHub Pages. Nothing is actually subscribed or charged. Built on the same pattern as `ember-and-bean`.

Coach name, contact info and programs live at the top of `assets/site.js`.

## Deploy

1. Push this folder's contents to the root of a GitHub repo (include `.nojekyll`).
2. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Live at `https://<user>.github.io/<repo>/` after a minute or two.

## Where events fire

| Page | Trigger | Pixel event |
|---|---|---|
| every page | load | `ttq.page()` (PAGE_VIEW) |
| `/` hero | "Book a free consult" click | `ClickButton` |
| `/` consult form | submit | `identify` (hashed email/phone) + `SubmitForm` (`description: free_consult`) |
| `/` starter plan form | submit | `identify` (hashed email) + `SubmitForm` (`description: starter_plan`) |
| `/` starter plan | "Download the plan" | `Download` |
| `/program/?id=...` | load | `ViewContent` |
| `/program/` | "Save for later" | `AddToWishlist` |
| `/subscribe/` | load | `ViewContent` (with plan if `?plan=` is set) |
| `/subscribe/` | "Start membership" | `identify` (hashed email/phone) + `Subscribe` |
| footer Email / Call / TikTok / Instagram | click | `Contact` |

Plan events carry `contents` / `value` / `currency: USD`; `content_id` is `<plan>-monthly` or `<plan>-annual`. Every event gets a unique `event_id`.

Plans (monthly; annual = 10x): `app` $39, `online` $149, `small-group` $199, `one-on-one` $560.

## URL switches

Remembered in localStorage, so set once per browser.

- `?pixel=CODE` — use another pixel (default `DBGIFABC77U8K2BMIOMG`)
- `?debug=1` — floating event log (`?debug=0` hides it)
- `?track=off` — stop code-fired events, leaving only `ttq.page()` (for Event Builder rule testing). `?track=on` restores.

## Event Builder targets

Click ids: `#hero-consult`, `#hero-programs`, `#nav-consult`, `#consult-submit`, `#guide-submit`, `#guide-download`, `#nav-subscribe`, `#programs-compare`, `#subscribe-now`, `#save-program`, `#ask-question`, `#plan-<plan-id>`, `#billing-monthly`, `#billing-annual`, `#start-subscription`, `#contact-email`, `#contact-phone`, `#contact-tiktok`, `#contact-instagram`, `#card-<plan-id>`.
URL rules: `/program/`, `/subscribe/`, `/thank-you/`.

## Verifying

TikTok Pixel Helper Chrome extension, or Events Manager → pixel → Test Events. Ad blockers block `analytics.tiktok.com`.
