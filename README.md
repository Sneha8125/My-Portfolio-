# Sneha Mirani — Portfolio

A responsive, recruiter-focused personal portfolio for Sneha Ajaybhai Mirani, a
Computer Engineering student and full-stack developer. Built with plain
HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

## Structure

```
portfolio/
├── index.html                 # All page content and sections
├── style.css                  # Design tokens, layout, responsive rules, theme
├── script.js                  # Nav, theme toggle, reveal animations, form validation
├── Sneha_Mirani_Resume.pdf    # Downloadable résumé (linked from the Hero section)
└── README.md
```

## Sections

1. Hero — name, role, one-line pitch, CTAs (View Projects / Download Résumé / Contact)
2. About — background, focus areas, certifications callout
3. Education — timeline (B.Tech in progress, HSC, SSC)
4. Skills — categorized languages, web dev, databases, tools, networking, productivity
5. Projects — EventHub, HostelPaglu, EditVerse, Time Machine, styled as code-editor windows
6. Experience & Leadership — techfest coordination, volunteering, club roles
7. Certifications — Corizo cybersecurity training badge
8. Contact — direct links (email, phone, LinkedIn, GitHub) + validated contact form
9. Footer — quick nav, social links, copyright

## Features

- Fully responsive (desktop / tablet / mobile), semantic HTML, visible focus states
- Dark/light theme toggle (persists via `localStorage` when available)
- Scroll-triggered reveal animations and animated skill bars (respects
  `prefers-reduced-motion`)
- Sticky nav with smooth-scroll anchors, mobile hamburger menu
- Client-side contact form validation (name, email format, message length)
- Back-to-top button

## Running locally

No build tools or dependencies are required. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally, e.g.:

```bash
npx serve .
# or
python3 -m http.server 5500
```

Then visit the printed local URL.

## Notes / next steps

- The contact form validates input in the browser but does **not** send
  email — there's no backend. Wire the `fetch` call in `script.js`
  (`initContactForm`) to a form service (e.g. Formspree, EmailJS) or your
  own API endpoint to actually deliver messages.
- Replace `Sneha_Mirani_Resume.pdf` if the résumé is updated — the filename
  is referenced directly in `index.html`.
- To strengthen the portfolio further, consider adding: live demo links or
  screenshots/GIFs for each project, a profile photo, and quantified
  outcomes (e.g. actual usage numbers) once available.
