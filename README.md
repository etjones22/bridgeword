# BridgeWord

BridgeWord is a daily word bridge game. Each puzzle consists of four clue words and one secret
"bridge" word that forms a common phrase with each clue. For example, if the clues are
`rain`, `snow`, `ice` and `thunder` the bridge word could be `storm` because it forms
`rain storm`, `snow storm`, `ice storm` and `thunderstorm`.

## Features

* **Daily puzzle logic** – Puzzles are generated server‑side and stored in a database. A simple
  API returns the current puzzle and validates guesses.
* **Guess feedback** – Each guess returns how many of the four clues combine with the guessed
  word to form valid phrases. Players get up to ten guesses.
* **Shareable results** – After solving the puzzle (or running out of guesses) an emoji grid
  summarising the results can be copied to the clipboard, similar to Wordle.
* **Archive** – Browse and replay previous puzzles via the archive page.
* **Privacy & compliance** – The site includes clear legal pages, a cookie consent banner, and
  integrates Google AdSense and Analytics only after the user accepts cookies. An `ads.txt` file
  is provided at the site root.
* **Accessibility** – Built with semantic HTML, high contrast styles and keyboard accessible
  components.

## Getting Started

### Prerequisites

* Node.js 18 or later
* npm or pnpm

### Installation

```bash
git clone <REPO_URL>
cd bridgeword
pnpm install # or npm install

# Generate the Prisma client and create the SQLite database
npx prisma generate
npx prisma migrate dev --name init

# Seed the database with a few sample puzzles
pnpm seed

# Start the development server
pnpm dev
```

Visit `http://localhost:3000` in your browser to play the game.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the appropriate values:

* `DATABASE_URL` – connection string for SQLite or Postgres.
* `DATABASE_PROVIDER` – `sqlite` or `postgresql`.
* `NEXTAUTH_SECRET` – secret used by NextAuth (unused by default but required by Next.js).
* `ADSENSE_ID` – your Google AdSense publisher ID.
* `GA_ID` – your Google Analytics 4 measurement ID.
* `SITE_URL` – the fully qualified domain of your deployed site.
* `ADMIN_KEY` – secret key used to authorise the puzzle generation endpoint.

### Running Tests

Unit tests are written with Vitest and can be run via:

```bash
pnpm test
```

End‑to‑end tests use Playwright. Launch them with:

```bash
pnpm e2e
```

### Deployment

The app is configured to run on [Vercel](https://vercel.com/) but can be deployed on any platform
that supports Next.js. For Vercel:

1. Create a new project and import this repository.
2. Set the environment variables from `.env.example` in the Vercel dashboard.
3. Configure a cron job to hit the `/api/admin/generate` endpoint daily at 00:00 UTC. In Vercel
   this can be done with [Vercel Cron](https://vercel.com/docs/cron-jobs) or with a GitHub Action.

## Post‑Launch Checklist

1. **Verify AdSense account** – Add your site in AdSense and complete the verification process.
2. **Replace placeholder IDs** – Update `ADSENSE_ID`, ad slot IDs in the `AdUnit` component,
   and `GA_ID` with your real credentials.
3. **Custom domain** – Point your domain to the deployment and update `SITE_URL` in the
   environment variables.
4. **Submit `ads.txt`** – Ensure that `https://YOURDOMAIN.com/ads.txt` is accessible and contains
   the correct publisher ID.
5. **Review legal pages** – Update the Privacy Policy and Terms of Service with your final
   wording and ensure the last updated date is current.
6. **Accessibility audit** – Run a Lighthouse audit and fix any remaining issues.
7. **Content generation** – Prepare a bank of curated puzzles and update the puzzle generator
   to pull from them rather than using random examples.

## License

This project is provided for educational purposes and comes with no warranty. Feel free to fork
and modify it for your own use.