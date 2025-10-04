# Shadcn Component Customizer

A powerful web application that lets you select Shadcn UI components, customize their properties in real-time, and export generated code with a live preview. It includes an accessible, system-aware dark mode, robust style controls, toast customization, and code generation.

## Overview
This repository contains the implementation of Shadcn Component Customizer, designed to customize and generate Shadcn-style UI components with a live preview.

## Key Features
- Live component preview with generated code output
- System-aware dark mode with manual override and smooth transitions
- Theme toggle (system, light, dark) with persistent storage
- Style controls with reset and advanced options
- Toast customization preview (Sonner) with per-instance attributes
- Responsive and accessible UI with OKLCH-based palettes

## Technology Stack
### Core Libraries
- Next.js (App Router, Turbopack): 15.5.4
- React: 19.1.0

### Supporting Libraries
- Tailwind CSS v4 + custom global CSS tokens/utilities
- Radix UI primitives: Accordion, Select, Dialog, Tabs, etc.
- Zustand: 5.0.8
- next-themes: 0.4.6
- Sonner: 2.0.7
- react-syntax-highlighter

## Implementation Details
- Dark mode
  - ThemeProvider configured with attribute="class", defaultTheme="system", enableSystem in src/app/providers.tsx
  - Smooth theme transitions and reduced-motion fallback in src/app/globals.css
  - Hydration-safe ThemeToggle in src/components/ui/theme-toggle.tsx (mounted flag prevents SSR/CSR text mismatch)
- Style controls
  - Centralized stylePresetClassName in Zustand store (src/stores/component-store.ts)
  - Reset of visual state when switching components to prevent style bleed (StyleControls + store)
  - Basic tools prominently displayed; advanced options grouped in an Accordion (src/components/features/style-controls.tsx)
- Toasts
  - Wrapper Toaster binds to current theme via useTheme (src/components/ui/sonner.tsx)
  - Preview Toaster accepts position, richColors, and duration so changes reflect live (src/components/features/component-preview.tsx)
- Code generation
  - Preview via react-syntax-highlighter
  - Code generation helpers in src/lib/code-generator.ts

## Installation
1. Clone the repository:
   git clone <your-repository-url>
   cd comp-gen

2. Install dependencies:
   npm install

## Usage
Start the dev server:
   npm run dev

- Optional port:
   npm run dev -- --port 3003

## Configuration
Modify these files to customize behavior:
- next.config.ts: build/dev options
- src/app/providers.tsx: ThemeProvider settings (attribute, defaultTheme, enableSystem)
- src/app/globals.css: color tokens and theme transitions
- components.json: registry of available UI components and their props

## Contribution Guidelines
1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License
MIT License (see LICENSE.txt)

---

## Deploy to GitHub Pages with CI/CD

You can deploy this Next.js App Router project to GitHub Pages using GitHub Actions. GitHub Pages serves static files, so we’ll use Next’s static export.

### 1) Prepare the repository
1. Create a GitHub repo (e.g., comp-gen).
2. Add the remote and push your local project:
   - git init
   - git add .
   - git commit -m "Initial commit"
   - git branch -M main
   - git remote add origin https://github.com/<your-username>/comp-gen.git
   - git push -u origin main

### 2) Configure Next.js for static export
Add the following to next.config.ts:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a static export in the `out/` folder at build time
  output: "export",
  // For Project Pages (https://<user>.github.io/<repo>/), set basePath to "/<repo>"
  // Leave empty for User/Org Pages (https://<user>.github.io)
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // assetPrefix helps static assets resolve under the basePath
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH
  //   ? `${process.env.NEXT_PUBLIC_BASE_PATH}/`
  //   : undefined,
};

export default nextConfig;
```

Notes:
- If you deploy to Project Pages (repo site at https://<user>.github.io/<repo>), you must set basePath to "/<repo>" (and optionally assetPrefix) for client-side routing and assets to work.
- If you deploy to User/Org Pages (https://<user>.github.io), leave basePath empty.

### 3) Add a GitHub Actions workflow
Create .github/workflows/deploy.yml in your repo with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build (Turbopack)
        run: npm run build

      - name: Static export
        run: npx next export

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then, in your GitHub repository:
- Settings → Pages → Source: “Deploy from a branch” or “GitHub Actions” → select GitHub Actions.

Optional: For Project Pages, set the base path via environment variable
- In the workflow, add:
  ```yaml
  env:
    NEXT_PUBLIC_BASE_PATH: "/<repo>"
  ```
  and uncomment basePath/assetPrefix in next.config.ts.

### 4) Test locally (optional)
- Build and export:
  - npm run build
  - npx next export
- Serve the static site locally:
  - npx serve out -p 5000
  - Open http://localhost:5000 (or http://localhost:5000/<repo> if using basePath).

### 5) Limitations and tips
- GitHub Pages is static-only. Avoid server-only features (API routes, dynamic SSR) when using output: "export".
- This project primarily uses client components and should export cleanly.
- If you need SSR or Edge functions, prefer deploying to Vercel.

---

## Alternative: Deploy to Vercel
Vercel offers zero-config Next.js deployments (SSR supported):
- Push your repo to GitHub
- Import the project at vercel.com/new
- Vercel will build and deploy automatically
