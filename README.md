# Falling Pickaxe — Vercel backend

This project keeps the supplied Falling Pickaxe `index.html` and its three image assets, and adds a Vercel serverless backend.

## Two independent Telegram bots

### Bot #1 — 1win postbacks only
Endpoint:
- `/api/postback/1win` — generic endpoint
- `/api/postback/1win/registration`
- `/api/postback/1win/first-deposit`
- `/api/postback/1win/redeposit`

The handler accepts GET and POST and the exact 1win placeholders supplied for the integration:
`event_id`, `date`, `hash_id`, `hash_name`, `source_id`, `source_name`, `amount`, `transaction_id`, `country`, `user_id`, `sub1` ... `sub10`.

**Important:** the code does not invent an `event_id` mapping. If 1win sends only an event id and no explicit event type, the Telegram message is labelled `1WIN EVENT`. The explicit event URLs above can be used when the 1win UI allows a separate postback URL per event.

### Bot #2 — website tracking only
Endpoint:
- `/api/track`

The supplied site already sends `page_view`, tab clicks, CTA clicks, external-link clicks and attribution/click_id data to this endpoint. The server formats those events for Bot #2.

### Affiliate redirect
Endpoint:
- `/go/1win`

The supplied site already rewrites its affiliate buttons through this same-origin endpoint. The redirect uses `ONEWIN_AFFILIATE_URL` and can optionally pass the site's `fp_*` click id into a partner parameter via `ONEWIN_CLICK_PARAM`.

## Environment variables

Copy `.env.example` to your Vercel project Environment Variables. Never put Telegram bot tokens into `index.html`.

If a Telegram bot token was ever exposed publicly, rotate it in BotFather before production.

## 1win click attribution

The site generates click ids such as `fp_...` and the postback reader detects the same format in any of `sub1` ... `sub10`.

To make end-to-end attribution work, the 1win affiliate link must be configured so the click id is returned in one of those sub fields. The backend therefore leaves `ONEWIN_CLICK_PARAM` empty by default instead of guessing which 1win parameter is correct.

If your 1win link is configured to accept `sub1`, set:
`ONEWIN_CLICK_PARAM=sub1`

## Deployment

1. Put this folder in GitHub.
2. Import the repository into Vercel.
3. Add the five required Telegram/affiliate variables in Vercel Environment Variables.
4. Deploy.
5. Verify:
   - `https://YOUR-DOMAIN/api/track`
   - `https://YOUR-DOMAIN/go/1win?button=main_cta&click_id=fp_test12345678`
   - the 1win postback URL(s) configured in the 1win partner panel.

No VPS is required; the API files under `api/` are Vercel Functions.


## Bot #2 source codes

Current short source codes:

- `tt1` → TikTok · Brasil
- `tt2` → TikTok · Chile
- `ig1` → Instagram · falling.pickaxe1
- `fb1` → Facebook · Matias Gonzales

Public URLs:

- `/tt1`
- `/tt2`
- `/ig1`
- `/fb1`

The public URL keeps the short code, while Telegram shows the configured human-readable source name. Bot #2 edits one visitor card instead of sending a new Telegram message for every event.

When adding a new source, update both `SOURCE_MAP` locations (`api/track.js` and the browser tracker in `index.html`) and add the corresponding rewrite in `vercel.json`. Source codes in the URL override any older saved visitor source, so returning visitors who open `/tt1`, `/tt2`, `/ig1`, or `/fb1` are attributed to that code.
