# HowIFeel

A small static site: three screens, no framework, no build step.

Live at **https://pigienne.github.io/HowIFeel/**

## Screens

| Screen | Anchor | What it is |
| --- | --- | --- |
| Landing | `#landing` | Full-bleed orange, one sentence, click anywhere to enter |
| Model | `#model` | Four sliders driving a set of derived values |
| Feedback | `#feedback` | A form that opens a pre-filled email |

Each screen has its own anchor, so `…/HowIFeel/#model` links straight to the sliders.

## Files

| File | Contents |
| --- | --- |
| `index.html` | Markup for all three screens |
| `styles.css` | Palette, type scale, breakpoints at 480px and 760px |
| `script.js` | The model, the dot meters, routing, form handling |
| `robots.txt` | Keeps search engines out |

## Run it locally

Open `index.html` in a browser. Nothing to install.

In VS Code, the Live Server extension adds auto-reload: right click `index.html` → "Open with Live Server".

## Publish

Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
The first build takes a minute or two. Every push after that redeploys automatically.

## The model

All of it lives in `update()` in `script.js`. The relationships matter, the constants don't:

- talking lowers insecurity itself, then lowers the pain again on top
- a share of that pain lands on the other person as weight
- one side's wellbeing is multiplied by the other's freedom, so zero anywhere is zero everywhere
- what the two have together is the lower of the two, never the average

Change a coefficient and everything downstream follows.
