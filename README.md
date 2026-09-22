# Portfolio

Personal portfolio website for **Arsh Verma** — a single-page application showcasing projects, experience, research, open-source contributions, and coding profiles with live data from GitHub, LeetCode, and YouTube.

**Live:** [arshverma.com](https://arshverma.com)

## Tech Stack

| Layer     | Technology                                                  |
| --------- | ----------------------------------------------------------- |
| Frontend  | React 19, TypeScript, Tailwind CSS                          |
| Build     | Vite                                                        |
| Backend   | Express (Vercel Serverless Functions)                       |
| Animation | Framer Motion, Lenis (smooth scroll)                        |
| Icons     | Lucide React                                                |
| Hosting   | Vercel                                                      |

## Sections

- **Hero** — introduction with animated profile photo
- **About** — background and personal summary
- **Education** — academic history
- **Tech Stack** — languages, frameworks, and tools
- **Projects** — featured software projects
- **AI Projects** — machine-learning and AI work
- **Experience** — professional work history
- **Hackathons** — competition highlights
- **Research** — publications and research work
- **Certifications** — professional certifications
- **Open Source** — merged PRs and contributions
- **GitHub** — live contribution graph, streak, top languages, and pinned repos
- **LeetCode** — solve stats, rating, contest history, and recent submissions
- **YouTube** — latest videos from the channel
- **Coding Profiles** — links to competitive programming profiles
- **Contact** — reach-out form and social links
- **Support** — ways to support the work

## API Routes

The Express backend proxies external APIs to keep tokens server-side and avoid CORS issues.

| Endpoint         | Source             | Description                                         |
| ---------------- | ------------------ | --------------------------------------------------- |
| `GET /api/github`   | GitHub GraphQL API | Profile, repos, contribution calendar, PRs, issues  |
| `GET /api/leetcode` | LeetCode GraphQL   | Solve stats, contest ranking, recent submissions    |
| `GET /api/youtube`  | YouTube RSS Feed   | Latest videos from the channel                      |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A **GitHub personal access token** (for the GitHub section)

### Setup

```bash
# Clone the repository
git clone https://github.com/ArshVermaGit/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create a .env file
cp .env.example .env   # or create manually
```

Add your tokens to `.env`:

```
GITHUB_TOKEN=ghp_your_token_here
```

### Development

```bash
# Start both frontend (Vite) and backend (Express) concurrently
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

You can also run them independently:

```bash
npm run dev:frontend   # Vite dev server only
npm run dev:backend    # Express API server only
```

### Build & Preview

```bash
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview the production build locally
```

### Testing

```bash
npm test           # Unit tests (Vitest)
npm run test:e2e   # End-to-end tests (Playwright)
```

### Lint

```bash
npm run lint       # ESLint
```

## Project Structure

```
├── api/
│   └── index.js            # Express API (GitHub, LeetCode, YouTube routes)
├── public/                 # Static assets (images, icons, branding)
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   └── sections/       # All page sections (Hero, About, Projects, etc.)
│   ├── styles/             # Additional stylesheets
│   ├── App.tsx             # Root component with smooth-scroll + animated profile
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── .github/                # Issue/PR templates, Dependabot config
├── vercel.json             # Vercel routing (rewrites /api/* to the Express handler)
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
├── playwright.config.ts    # Playwright E2E config
└── package.json
```

## Deployment

The site is deployed on **Vercel**. The `vercel.json` rewrites all `/api/*` requests to the Express serverless function at `api/index.js`. Push to `main` to trigger a deploy.

## Contributing

Contributions are welcome! Please see the [pull request template](.github/PULL_REQUEST_TEMPLATE.md) and [issue templates](.github/ISSUE_TEMPLATE/) for guidelines.

## License

This project is open source. See the repository for license details.
