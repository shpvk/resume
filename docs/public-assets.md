# Assets still to add to `public/`

Files here are copied to the site root as-is.

| File                   | What it is                                                 | How to make it                                                        |
| ---------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| `og.png`               | 1200x630 social preview card (Telegram, LinkedIn, Twitter) | Any design tool. Dark background, your name, role, one accent colour. |
| `apple-touch-icon.png` | 180x180 iOS home-screen icon                               | Render `favicon.svg` to PNG at 180x180.                               |

Until `og.png` exists, links to the site simply render without a preview
image - nothing breaks.

## Why this file is not in `public/`

Everything in `public/` is copied to the site root verbatim, so a README
there would have been served at `https://your-site/README.md`.
