# Estatly - Real Estate Demo

A small, single-page demo real estate website built with plain HTML, CSS and
vanilla JavaScript. No framework, no build step, no server needed.

## Run it

Just double-click `index.html` - it opens straight in the browser.

To serve it over http:// instead of file:// (nicer for testing):

    npx serve .
    # or, if you have Python
    python -m http.server 8000

## Structure

    realestate-demo/
    |- index.html             home page (the only page for now)
    \- assets/
       |- css/style.css
       \- js/main.js

## Sections on the home page

Sticky header with mobile menu - hero with search bar - animated stat counters -
6 featured property cards - why-us features - testimonials - callback form - footer.

## Animations

Hero text fades up on load, the headline underline draws itself, floating blurred
blobs drift in the background, sections reveal on scroll (IntersectionObserver),
stat numbers count up when they enter the viewport, and cards lift on hover.
Everything is disabled automatically under `prefers-reduced-motion`.

## Notes

- Icons are one inline `<symbol>` sprite at the top of `index.html`, reused with
  `<use href="#i-name">`. Their size and stroke are styled from `.icon` in the CSS.
- Property photos load from Unsplash, so they need an internet connection.
  Swap the `src` values for local files to work fully offline.
- Both forms are demo only; JavaScript shows a thank-you on the button and
  nothing is submitted or stored.

## Putting it online

Because it is pure static HTML, it can go anywhere:

- GitHub Pages - push this folder to a repo, then Settings > Pages > deploy
  from `main` / root. Free https://username.github.io/repo/ link.
- Netlify / Vercel - drag the folder onto their dashboard, done in seconds.
- Hostinger or any web host - upload the files into `public_html`.
