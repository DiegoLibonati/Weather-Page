# Zephyr

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Zephyr** is a lightweight, framework-free weather web application built with vanilla TypeScript and Vite. It allows users to look up real-time weather conditions for any city or country in the world by querying the OpenWeatherMap API.

Once a search is submitted, the app displays the current temperature in Celsius, a visual weather icon representing the atmospheric conditions, and a short description of the weather (e.g. "Clear sky", "Heavy rain", "Scattered clouds"). The page title updates dynamically to reflect the searched location, giving the interface a clean and responsive feel without any page reloads.

The application is built as a single-page app (SPA) with a clear separation of concerns: pages orchestrate the layout and user interactions, components handle reusable UI rendering, services encapsulate all API communication, and helpers provide pure utility functions for data transformation (Kelvin to Celsius conversion, string capitalization). All API requests are proxied through Vite's dev server to avoid CORS issues during development.

The codebase follows strict TypeScript configuration with exact optional property types, no unused locals or parameters, and enforced code style via ESLint and Prettier with a Husky pre-commit hook. The project also includes a full test suite using Jest, ts-jest, and Testing Library, covering components, pages, services, and helpers with a minimum 70% coverage threshold.

## Technologies used

The project intentionally avoids frameworks and runtime dependencies, relying only on the language and tooling layer:

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

On top of those technologies, the following packages are used exclusively at development time (testing, linting, formatting and the build pipeline):

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"msw": "^2.10.4"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"undici": "^7.25.0"
"vite": "^7.1.5"
```

## Getting Started

With the stack in mind, here's how to run the app locally:

1. Clone the repository
2. Navigate to the project folder
3. Copy the environment template and fill in your credentials:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and set:
   - `VITE_API_KEY` — your OpenWeatherMap API key
   - `VITE_API_URL` — base URL (e.g. `https://api.openweathermap.org/data/2.5`)
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is wired up, you can run the test suite (Jest + ts-jest + Testing Library) covering components, pages, services and helpers:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report (the project enforces a 70% threshold on branches, functions, lines and statements):

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch.

[![CI](https://github.com/DiegoLibonati/Weather-Page/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoLibonati/Weather-Page/actions/workflows/ci.yml)

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│      testing     │─▶│       build      │
│   eslint · tsc       │  │   jest + msw     │  │    vite build    │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — installs dependencies with `npm ci` and runs `npm run lint` (ESLint flat config, v9+) followed by `npm run type-check` (`tsc --noEmit` against `tsconfig.json`).
2. **`testing`** — runs `npm run test` (Jest in verbose mode with `ts-jest`, `jest-environment-jsdom` and MSW for HTTP mocking). Depends on `lint-and-audit`.
3. **`build`** — produces the production Vite bundle via `npm run build`, which first runs `tsc -p tsconfig.app.json` and then `vite build`. Depends on `testing`.

All three jobs use `actions/setup-node@v4` with the Node version pinned via [`.nvmrc`](.nvmrc) (currently Node 22) and the npm cache enabled to speed up installs.

### Where the build outputs live

| Output                                    | Location                     |
| ----------------------------------------- | ---------------------------- |
| Validation logs (lint, type-check, tests) | **Actions** tab on GitHub    |
| Production bundle (`dist/`)               | Ephemeral, inside the runner |

> **Note:** the current pipeline is validation-only — no artifacts, tags or GitHub Releases are produced. The bundle generated by the `build` job is discarded when the runner is torn down.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

Beyond test coverage, it's also worth auditing the dependency tree for known vulnerabilities.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/zephyr`](https://www.diegolibonati.com.ar/#/project/zephyr)
