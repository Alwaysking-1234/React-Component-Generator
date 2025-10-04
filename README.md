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

## Alternative: Deploy to Vercel
Vercel offers zero-config Next.js deployments (SSR supported):
- Push your repo to GitHub
- Import the project at vercel.com/new
- Vercel will build and deploy automatically
