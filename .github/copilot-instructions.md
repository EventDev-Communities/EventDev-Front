# EventDev Communities - Copilot Instructions

## General Guidelines

- Write code with focus on readability and maintainability
- Use descriptive variable and function names
- Always use absolute imports with `@/`, never relative paths
- Check for existing similar functionality before creating new code
- Keep files under 200-300 lines, refactor when exceeding this limit
- Avoid if/else chains, enforce single responsibility principle
- Use `export default function` components
- Follow the established routing structure in `App.jsx`
- Should not create README for new implementations performed by copilot

## Import/Export Standards

- Always use absolute imports with `@/` alias
- Import MUI components individually: `import Button from '@mui/material/Button'`
- Never use barrel imports from MUI root: `import { Button } from '@mui/material'` ❌

## String Literals

- Always use single quotes `'` for strings
- Use template literals for string interpolation

## Styling

- Use MUI components as the primary UI library
- Use `sx` prop for component-specific styling
- Use CSS modules for component-specific styles when needed
- Place CSS module files alongside components: `Component.module.css`

## Component Structure

```bash
@/shared/components/ComponentName/
├── index.jsx
└── ComponentName.module.css (if needed)
```

## Component Guidelines

- Keep components focused and single-purpose
- Pass props destructuring in function parameters

## Code Organization

### Folder Structure

```bash
src/
├── App.jsx
├── main.jsx
├── pages/                    # Route components
├── shared/
│   ├── components/          # Reusable UI components
│   ├── providers/           # Context providers
│   ├── themes/             # Theme configurations
│   ├── styles/             # Global styles
│   └── assets/             # Static assets
```

## File Naming

- Use PascalCase for component files and folders
- Use PascalCase for CSS modules
- Use camelCase for utility functions and hooks

## Hooks & Functions

- Use camelCase for function names
- Use `use` prefix for custom hooks
- Keep hooks pure and focused
- Place custom hooks in `@/hooks` (create if needed)

## ESLint Rules (Always Enforced)

- Disallow relative imports (`./`, `../`)
- No unused variables (except React in JSX files)
- Proper React hooks dependencies
- No console.log in production code
- Consistent quote usage (single quotes)
