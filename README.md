# Shadcn Component Customizer

A powerful web application that allows you to select components from the Shadcn UI library, customize their properties in real-time, and export the generated code.

## Features

- **Component Selection**: Browse and select from various Shadcn UI components
- **Live Preview**: See your customized component in real-time
- **Property Customization**: Adjust component properties with intuitive controls
- **Code Generation**: Generate clean, production-ready React code
- **Export Options**: Copy code to clipboard or download as TypeScript files
- **Syntax Highlighting**: Beautiful code display with syntax highlighting
- **Responsive Design**: Works seamlessly across different screen sizes
- **Split-Pane Interface**: Efficient workspace with resizable panels
- **Dark Mode**: System-aware theming with manual override (light/dark/system), smooth transitions, and accessible color palettes

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript 5+ with strict mode
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand
- **Code Highlighting**: react-syntax-highlighter
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shadcn-component-customizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select a Component**: Choose from the available Shadcn UI components in the left panel
2. **Customize Properties**: Use the property controls in the right panel to adjust the component
3. **Preview Changes**: See your customized component in the center panel
4. **Export Code**: Switch to the Export tab to copy or download the generated code

### Dark Mode & Accessibility
- The app respects your OS preference using system detection and provides a Theme toggle (System/Light/Dark) in the customization panel.
- Color palettes use OKLCH variables for better perceptual consistency and maintain WCAG AA contrast (≥ 4.5:1 for body text; ≥ 3:1 for large text).
- Smooth color transitions are enabled and automatically disabled when users prefer reduced motion.

### Customization UI
- Style Controls now prioritize Reset and basic tools at the top for quick changes.
- Advanced options (borders, hover effects, shadows, spacing, alignment) are grouped under an Accordion with clear indicators and animations.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Client providers (ThemeProvider)
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   │   └── theme-toggle.tsx   # Theme manual override selector
│   ├── features/          # Feature components
│   │   ├── component-selector.tsx
│   │   ├── component-preview.tsx
│   │   ├── property-customizer.tsx
│   │   └── action-buttons.tsx
│   └── layouts/           # Layout components
│       └── app-layout.tsx
├── lib/
│   ├── component-data.ts  # Component data and utilities
│   └── code-generator.ts  # Code generation utilities
├── stores/
│   └── component-store.ts # Zustand state management
└── types/
    └── component.ts       # TypeScript type definitions
```

## Available Components

The application currently supports the following Shadcn UI components:

- Button
- Input
- Badge
- Card
- And more can be easily added...

## Customization Features

### Property Types Supported
- **String**: Text inputs for properties like labels, placeholders
- **Number**: Numeric inputs for sizing and spacing
- **Boolean**: Switch toggles for true/false properties
- **Enum**: Select dropdowns for predefined options

### Quick Variants
Pre-configured component variants for common use cases

### Real-time Preview
See changes instantly as you modify properties

## Code Generation

The application generates:
- Complete TypeScript React components
- Proper import statements
- Type-safe prop definitions
- Clean, formatted code

## Development

### Adding New Components

1. Add component data to `src/lib/component-data.ts`
2. Update the component map in `src/components/features/component-preview.tsx`
3. Add the component to the component selector

### Extending Properties

1. Define new property types in `src/types/component.ts`
2. Update property controls in `src/components/features/property-customizer.tsx`
3. Handle new property types in the code generator

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
