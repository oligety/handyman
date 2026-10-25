# M5 Handyman

A modern, high-performance website for **M5 Handyman**, providing professional handyman, carpentry, remedial defect, plastering, rendering, tiling, painting, and roofing services across the **Central Coast, New South Wales, Australia**.

Built with [Astro](https://astro.build) in hybrid rendering mode (Static Site Generation + Server-Side Rendering) powered by Node.js 24 and containerized with Docker.

---

## 🛠️ Services Offered

- **Carpentry Work**: Custom timber framing, skirting, architraves, door hanging, deck repairs, and bespoke woodwork.
- **Remedial & Defects Work**: Structural crack rectification, waterproofing repairs, facade maintenance, and building defect fixes.
- **General Repairs & Maintenance**: Fixture installations, locks, drywall patch-ups, door adjustments, and property maintenance.
- **Plastering & Rendering**: Gyprock wall and ceiling repairs, patchwork, exterior acrylic rendering, and smooth skimming.
- **Tiling & Grouting**: Wall and floor re-tiling, leaking shower re-grouting, silicone resealing, and tile repairs.
- **Painting & Finishing**: Interior and exterior painting, weatherboarding refresh, stain removal, and protective coatings.
- **Roofing & Gutters**: Roof leak detection, broken tile replacements, gutter clearing, flashing, and downpipe repairs.

---

## 📍 Business Details

- **Business Name**: M5 Handyman
- **Service Area**: Central Coast, New South Wales, Australia (Gosford, Wyong, Terrigal, Erina, Woy Woy, and surrounding areas)
- **NSW Contractor Licence**: `342519C`
- **Australian Business Number (ABN)**: `311025368848`
- **Mobile / Direct Phone**: `0498 376 968`
- **Email**: `marlon_adap@yahoo.com`

---

## ✨ Features & Architecture

- **Astro Hybrid Mode**: Blazingly fast pre-rendered static marketing pages with server-rendered dynamic API endpoints (`@astrojs/node` standalone).
- **SEO & Local Search Optimized**:
  - Validated Schema.org `HomeAndConstructionBusiness` JSON-LD structured data with geo-coverage and service catalogs.
  - OpenGraph and Twitter card social meta tags.
  - Automated XML sitemap generation via `@astrojs/sitemap`.
  - Canonical URL management and `robots.txt`.
- **Mobile & Desktop Responsive**:
  - Sticky mobile conversion bar with direct one-tap calling (`tel:0498376968`) and quote navigation, supporting `env(safe-area-inset-bottom)`.
  - Input font sizing ($16\text{px}$) to prevent iOS Safari auto-zoom on field focus.
  - Defensive grid sizing (`minmax(min(100%, 300px), 1fr)`) preventing horizontal overflow on small devices ($320\text{px}$–$360\text{px}$).
- **Accessibility (WCAG 2.2 Level AA)**:
  - Skip-to-main-content keyboard link (`#main-content`).
  - High-contrast `:focus-visible` ring indicators with offsets.
  - Visual and programmatic error synchronization (`:user-invalid` $\leftrightarrow$ `aria-invalid="true"`).
  - Screen-reader disambiguated interactive targets (`.visually-hidden`).
- **High Performance**:
  - Deferred rendering for below-the-fold content (`content-visibility: auto; contain-intrinsic-size: auto 600px;`).
  - High-priority, eager-loaded Largest Contentful Paint (LCP) hero branding image.
  - Automated WebP image optimization and caching.

---

## 📁 Project Structure

```text
handyman/
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI test, build & typecheck on Node 24
│       └── docker.yml        # Build & publish multi-arch Docker image to GHCR
├── public/
│   ├── favicon.png           # Transparent brand favicon
│   └── robots.txt            # Search crawler directives & sitemap reference
├── src/
│   ├── assets/
│   │   ├── logo-m5-handyman.jpeg   # Source logo asset
│   │   └── logo-m5-handyman.png    # High-res transparent emblem
│   ├── components/
│   │   └── Welcome.astro     # Landing page (hero, services, why choose us, quote form, footer)
│   ├── layouts/
│   │   └── Layout.astro      # Root HTML shell, SEO meta, Schema.org JSON-LD, global styles
│   ├── pages/
│   │   ├── api/
│   │   │   └── health.ts     # SSR healthcheck endpoint (export const prerender = false)
│   │   └── index.astro       # Home landing page route
│   └── test/
│       └── example.test.ts   # Vitest unit & container component tests
├── compose.yaml              # Production Docker Compose stack
├── Dockerfile                # Multi-stage production build on node:24-alpine
├── package.json              # Project scripts and dependencies (Node >= 24)
├── tsconfig.json             # TypeScript configuration
└── vitest.config.ts          # Vitest testing configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v24.0.0` or higher
- **npm**: `v10.0.0` or higher

### Installation

```bash
git clone https://github.com/oligety/handyman.git
cd handyman
npm install
```

### Development Server

Start the local Astro development server:

```bash
npm run dev
```

For background mode (as recommended in development rules):

```bash
npx astro dev --background
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Quality Checks & Testing

Run TypeScript diagnostics, component tests, and production build checks:

```bash
# Type check and Astro template diagnostics
npm run check

# Run Vitest test suite
npm test

# Run tests in watch mode
npm run test:watch
```

### Production Build & Preview

```bash
# Compile static assets and standalone server bundle into ./dist
npm run build

# Preview the built production bundle locally
npm run preview
```

---

## 🐳 Docker & Homelab Deployment

### Multi-Stage Dockerfile

The included `Dockerfile` uses a 5-stage build targeting `node:24-alpine`:
1. **Base**: Minimal Alpine Node.js 24 image.
2. **Deps**: Installs full dependencies for compilation.
3. **Builder**: Builds production assets into `./dist`.
4. **Prod-Deps**: Prunes development dependencies with `npm ci --omit=dev`.
5. **Runner**: Runs unprivileged as user `node` with built-in `HEALTHCHECK`.

### Docker Compose

Deploy the container using `compose.yaml`:

```bash
docker compose up --build -d
```

To view container logs and status:

```bash
docker compose logs -f handyman
docker compose ps
```

---

## 🔄 CI/CD Automation

- **`.github/workflows/ci.yml`**: Runs on pull requests and pushes to `main`. Executes `astro check`, `vitest run`, and `astro build` on Node.js 24.
- **`.github/workflows/docker.yml`**: Triggers on releases and version tags. Builds multi-architecture (`linux/amd64`, `linux/arm64`) Docker images using Docker Buildx and publishes to GitHub Container Registry (`ghcr.io/oligety/handyman`).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
