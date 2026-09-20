# Brian Bays portfolio

A responsive, accessible static portfolio: Home, Portfolio, About, Resume, and Contact. Plain HTML/CSS, a tiny JavaScript enhancement, and a dependency-free Node builder. Pages remain readable without JavaScript. No database, analytics, or nonfunctional contact form.

## Preview and edit

Requires Node.js 22 or newer and Git. No package installation required.

```sh
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Stop the preview with Ctrl+C.

- Edit `projects.json` for project titles, descriptions, video URLs, and images. Empty URLs show a working email inquiry link. Add hosted YouTube/Vimeo links; do not commit full-length videos.
- Place project images in `site/assets/`, then set a project's `image` to `assets/filename.jpg`. The initial film thumbnails come from Brian's public YouTube videos. Empty image fields use a typographic title treatment.
- Edit `scripts/build.mjs` for page copy and navigation. Do not edit generated HTML directly; builds replace it.
- Edit `site/assets/style.css` for design and `site/assets/main.js` for behavior.
- Replace `site/files/Brian_Bays_Resume.pdf` to update the downloadable resume. The initial public copy preserves the supplied resume with its street address removed; the source document is unchanged.
- Google Fonts supplies DM Sans and Playfair Display; system fonts are included as fallbacks.

## Publish updates

```sh
git pull --ff-only
node scripts/build.mjs
node scripts/check.mjs
git add projects.json scripts/build.mjs site
git commit -m "Update portfolio"
git push
```

The Pages workflow checks and publishes only `site/`. Source files and documentation are not part of the deployed site. In repository Settings → Pages, choose **GitHub Actions** as the source. View deployment status in the repository's Actions tab.

## Selected media and optional refinements

- The Evil in Me: public series playlist on Brian's @bdbays YouTube channel.
- Head Games: Trailer 3 on the same channel.
- Editing sample: RFK - Social Media PSA, clearly labeled as parody.
- Optional: add Steve Robbins clips, higher-resolution project stills, a portrait, and a LinkedIn URL when supplied.

Awards, audience metrics, and unverified credits have been omitted. The work is represented without invented video URLs.

## Domain

The custom domain is **brianbays.com**, registered at Porkbun and connected to GitHub Pages. Domain ownership is verified in Brian's GitHub account. See [DOMAIN.md](DOMAIN.md) for the saved DNS configuration and maintenance instructions.
