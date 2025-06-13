================================================
FILE: README.md
================================================
# 10x Astro Starter

A modern, opinionated starter template for building fast, accessible, and AI-friendly web applications.

## Tech Stack

- [Astro](https://astro.build/) v5.5.5 - Modern web framework for building fast, content-focused websites
- [React](https://react.dev/) v19.0.0 - UI library for building interactive components
- [TypeScript](https://www.typescriptlang.org/) v5 - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) v4.0.17 - Utility-first CSS framework

## Prerequisites

- Node.js v22.14.0 (as specified in `.nvmrc`)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/przeprogramowani/10x-astro-starter.git
cd 10x-astro-starter
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```md
.
├── src/
│   ├── layouts/    # Astro layouts
│   ├── pages/      # Astro pages
│   │   └── api/    # API endpoints
│   ├── components/ # UI components (Astro & React)
│   └── assets/     # Static assets
├── public/         # Public assets
```

## AI Development Support

This project is configured with AI development tools to enhance the development experience, providing guidelines for:

- Project structure
- Coding practices
- Frontend development
- Styling with Tailwind
- Accessibility best practices
- Astro and React guidelines

### Cursor IDE

The project includes AI rules in `.cursor/rules/` directory that help Cursor IDE understand the project structure and provide better code suggestions.

### GitHub Copilot

AI instructions for GitHub Copilot are available in `.github/copilot-instructions.md`

### Windsurf

The `.windsurfrules` file contains AI configuration for Windsurf.

## Contributing

Please follow the AI guidelines and coding practices defined in the AI configuration files when contributing to this project.

## License

MIT



================================================
FILE: astro.config.mjs
================================================
// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), sitemap()],
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
  experimental: { session: true },
});



================================================
FILE: components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/global.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}


================================================
FILE: eslint.config.js
================================================
import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const baseConfig = tseslint.config({
  extends: [eslint.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic],
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
  },
});

const jsxA11yConfig = tseslint.config({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [jsxA11y.flatConfigs.recommended],
  languageOptions: {
    ...jsxA11y.flatConfigs.recommended.languageOptions,
  },
  rules: {
    ...jsxA11y.flatConfigs.recommended.rules,
  },
});

const reactConfig = tseslint.config({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [pluginReact.configs.flat.recommended],
  languageOptions: {
    ...pluginReact.configs.flat.recommended.languageOptions,
    globals: {
      window: true,
      document: true,
    },
  },
  plugins: {
    "react-hooks": eslintPluginReactHooks,
    "react-compiler": reactCompiler,
  },
  settings: { react: { version: "detect" } },
  rules: {
    ...eslintPluginReactHooks.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react-compiler/react-compiler": "error",
  },
});

export default tseslint.config(
  includeIgnoreFile(gitignorePath),
  baseConfig,
  jsxA11yConfig,
  reactConfig,
  eslintPluginAstro.configs["flat/recommended"],
  eslintPluginPrettier
);



================================================
FILE: load-checkpoint.bat
================================================
@ECHO OFF

:: This script updates the local 'master' branch to match a specified checkpoint branch from 'origin'.
:: It is designed for Windows and can be run from the standard Command Prompt (cmd.exe).
:: It does NOT push the changes to the remote repository.

:: Usage: load-checkpoint.bat <checkpoint-branch-name>

:: Check if a branch name is provided
IF [%1]==[] (
    ECHO Usage: %0 ^<checkpoint-branch-name^>
    EXIT /B 1
)

SET CHECKPOINT_BRANCH=%1

ECHO Updating local 'master' branch from 'origin/%CHECKPOINT_BRANCH%'...

:: 1. Fetch the latest updates from origin
ECHO Fetching from origin...
git fetch origin
IF ERRORLEVEL 1 (
    ECHO Error: Failed to fetch from origin.
    EXIT /B 1
)

:: 2. Check out the master branch
ECHO Checking out master...
git checkout master
IF ERRORLEVEL 1 (
    ECHO Error: Failed to checkout master.
    EXIT /B 1
)

:: 3. Hard reset master to the checkpoint branch
ECHO Resetting master to origin/%CHECKPOINT_BRANCH%...
git reset --hard "origin/%CHECKPOINT_BRANCH%"
IF ERRORLEVEL 1 (
    ECHO Error: Failed to reset master branch.
    EXIT /B 1
)

ECHO.
ECHO Successfully updated local 'master' branch to match 'origin/%CHECKPOINT_BRANCH%'.

EXIT /B 0


================================================
FILE: load-checkpoint.sh
================================================
#!/bin/bash

# This script updates the local 'master' branch to match a specified checkpoint branch from 'origin'.
# It does NOT push the changes to the remote repository.
#
# --- Compatibility ---
# macOS & Linux: Works out of the box.
# Windows: This script must be run using a bash-compatible shell.
#          Git Bash, which is included with Git for Windows, is recommended.
# ---------------------

# Usage: ./load-checkpoint.sh <checkpoint-branch-name>

# Check if a branch name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <checkpoint-branch-name>"
  exit 1
fi

CHECKPOINT_BRANCH=$1

echo "Updating local 'master' branch from 'origin/$CHECKPOINT_BRANCH'..."

# 1. Fetch the latest updates from origin
echo "Fetching from origin..."
git fetch origin
if [ $? -ne 0 ]; then
    echo "Error: Failed to fetch from origin."
    exit 1
fi

# 2. Check out the master branch
echo "Checking out master..."
git checkout master
if [ $? -ne 0 ]; then
    echo "Error: Failed to checkout master."
    exit 1
fi

# 3. Hard reset master to the checkpoint branch
echo "Resetting master to origin/$CHECKPOINT_BRANCH..."
git reset --hard "origin/$CHECKPOINT_BRANCH"
if [ $? -ne 0 ]; then
    echo "Error: Failed to reset master branch."
    exit 1
fi

echo ""
echo "Successfully updated local 'master' branch to match 'origin/$CHECKPOINT_BRANCH'."


================================================
FILE: package.json
================================================
{
  "name": "10x-astro-starter",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write ."
  },
  "dependencies": {
    "@astrojs/node": "^9.1.3",
    "@astrojs/react": "4.2.2",
    "@astrojs/sitemap": "3.3.0",
    "@radix-ui/react-slot": "^1.1.2",
    "@tailwindcss/vite": "4.0.17",
    "@types/react": "19.0.12",
    "@types/react-dom": "19.0.4",
    "astro": "5.5.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.487.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "tailwind-merge": "^3.1.0",
    "tailwindcss": "4.0.17",
    "tw-animate-css": "^1.2.5"
  },
  "devDependencies": {
    "@eslint/compat": "1.2.7",
    "@eslint/js": "9.23.0",
    "@typescript-eslint/eslint-plugin": "8.28.0",
    "@typescript-eslint/parser": "8.28.0",
    "eslint": "9.23.0",
    "eslint-config-prettier": "10.1.1",
    "eslint-import-resolver-typescript": "4.2.5",
    "eslint-plugin-astro": "1.3.1",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-prettier": "5.2.5",
    "eslint-plugin-react": "7.37.4",
    "eslint-plugin-react-compiler": "19.0.0-beta-aeaed83-20250323",
    "eslint-plugin-react-hooks": "5.2.0",
    "husky": "9.1.7",
    "lint-staged": "15.5.0",
    "prettier-plugin-astro": "0.14.1",
    "supabase": "2.24.3",
    "typescript-eslint": "8.28.0"
  },
  "lint-staged": {
    "*.{ts,tsx,astro}": [
      "eslint --fix"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}



================================================
FILE: tsconfig.json
================================================
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}



================================================
FILE: .env.example
================================================
SUPABASE_URL=###
SUPABASE_KEY=###
OPENROUTER_API_KEY=###


================================================
FILE: .nvmrc
================================================
22.14.0


================================================
FILE: .prettierrc.json
================================================
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}



================================================
FILE: .windsurfrules
================================================
# AI Rules for {{project-name}}

{{project-description}}

## Tech Stack

- Astro 5
- TypeScript 5
- React 19
- Tailwind 4
- Shadcn/ui

## Project Structure

When introducing changes to the project, always follow the directory structure below:

- `./src` - source code
- `./src/layouts` - Astro layouts
- `./src/pages` - Astro pages
- `./src/pages/api` - API endpoints
- `./src/middleware/index.ts` - Astro middleware
- `./src/db` - Supabase clients and types
- `./src/types.ts` - Shared types for backend and frontend (Entities, DTOs)
- `./src/components` - Client-side components written in Astro (static) and React (dynamic)
- `./src/components/ui` - Client-side components from Shadcn/ui
- `./src/lib` - Services and helpers
- `./src/assets` - static internal assets
- `./public` - public assets

When modifying the directory structure, always update this section.

## Coding practices

### Guidelines for clean code

- Use feedback from linters to improve the code when making changes.
- Prioritize error handling and edge cases.
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Consider using custom error types or error factories for consistent error handling.

## Frontend

### General Guidelines

- Use Astro components (.astro) for static content and layout
- Implement framework components in React only when interactivity is needed

### Guidelines for Styling

#### Tailwind

- Use the @layer directive to organize styles into components, utilities, and base layers
- Use arbitrary values with square brackets (e.g., w-[123px]) for precise one-off designs
- Implement the Tailwind configuration file for customizing theme, plugins, and variants
- Leverage the theme() function in CSS for accessing Tailwind theme values
- Implement dark mode with the dark: variant
- Use responsive variants (sm:, md:, lg:, etc.) for adaptive designs
- Leverage state variants (hover:, focus-visible:, active:, etc.) for interactive elements

### Guidelines for Accessibility

#### ARIA Best Practices

- Use ARIA landmarks to identify regions of the page (main, navigation, search, etc.)
- Apply appropriate ARIA roles to custom interface elements that lack semantic HTML equivalents
- Set aria-expanded and aria-controls for expandable content like accordions and dropdowns
- Use aria-live regions with appropriate politeness settings for dynamic content updates
- Implement aria-hidden to hide decorative or duplicative content from screen readers
- Apply aria-label or aria-labelledby for elements without visible text labels
- Use aria-describedby to associate descriptive text with form inputs or complex elements
- Implement aria-current for indicating the current item in a set, navigation, or process
- Avoid redundant ARIA that duplicates the semantics of native HTML elements

### Guidelines for Astro

- Leverage View Transitions API for smooth page transitions (use ClientRouter)
- Use content collections with type safety for blog posts, documentation, etc.
- Leverage Server Endpoints for API routes
- Use POST, GET  - uppercase format for endpoint handlers
- Use `export const prerender = false` for API routes
- Use zod for input validation in API routes
- Extract logic into services in `src/lib/services`
- Implement middleware for request/response modification
- Use image optimization with the Astro Image integration
- Implement hybrid rendering with server-side rendering where needed
- Use Astro.cookies for server-side cookie management
- Leverage import.meta.env for environment variables

### Guidelines for React

- Use functional components with hooks instead of class components
- Never use "use client" and other Next.js directives as we use React with Astro
- Extract logic into custom hooks in `src/components/hooks`
- Implement React.memo() for expensive components that render often with the same props
- Utilize React.lazy() and Suspense for code-splitting and performance optimization
- Use the useCallback hook for event handlers passed to child components to prevent unnecessary re-renders
- Prefer useMemo for expensive calculations to avoid recomputation on every render
- Implement useId() for generating unique IDs for accessibility attributes
- Consider using the new useOptimistic hook for optimistic UI updates in forms
- Use useTransition for non-urgent state updates to keep the UI responsive

### Backend and Database

- Use Supabase for backend services, including authentication and database interactions.
- Follow Supabase guidelines for security and performance.
- Use Zod schemas to validate data exchanged with the backend.
- Use supabase from context.locals in Astro routes instead of importing supabaseClient directly
- Use SupabaseClient type from `src/db/supabase.client.ts`, not from `@supabase/supabase-js`


================================================
FILE: docs/api-plan.md
================================================
# REST API Plan

## 1. Resources

- **Users**
  - *Database Table*: `users`
  - Managed through Supabase Auth; operations such as registration and login may be handled via Supabase or custom endpoints if needed.

- **Flashcards**
  - *Database Table*: `flashcards`
  - Fields include: `id`, `front`, `back`, `source`, `created_at`, `updated_at`, `generation_id`, `user_id`.

- **Generations**
  - *Database Table*: `generations`
  - Stores metadata and results of AI generation requests (e.g., `model`, `generated_count`, `source_text_hash`, `source_text_length`, `generation_duration`).

- **Generation Error Logs**
  - *Database Table*: `generation_error_logs`
  - Used for logging errors encountered during AI flashcard generation.

## 2. Endpoints

### 2.2. Flashcards

- **GET `/flashcards`**
  - **Description**: Retrieve a paginated, filtered, and sortable list of flashcards for the authenticated user.
  - **Query Parameters**:
    - `page` (default: 1)
    - `limit` (default: 10)
    - `sort` (e.g., `created_at`)
    - `order` (`asc` or `desc`)
    - Optional filters (e.g., `source`, `generation_id`).
  - **Response JSON**:
    ```json
    {
      "data": [
        { "id": 1, "front": "Question", "back": "Answer", "source": "manual", "created_at": "...", "updated_at": "..." }
      ],
      "pagination": { "page": 1, "limit": 10, "total": 100 }
    }
    ```
  - **Errors**: 401 Unauthorized if token is invalid.

- **GET `/flashcards/{id}`**
  - **Description**: Retrieve details for a specific flashcard.
  - **Response JSON**: Flashcard object.
  - **Errors**: 404 Not Found, 401 Unauthorized.

- **POST `/flashcards`**
  - **Description**: Create one or more flashcards (manually or from AI generation).
  - **Request JSON**:
    ```json
    {
      "flashcards": [
        {
          "front": "Question 1",
          "back": "Answer 1",
          "source": "manual",
          "generation_id": null
        },
        {
          "front": "Question 2",
          "back": "Answer 2",
          "source": "ai-full",
          "generation_id": 123
        }
      ]
    }
    ```
  - **Response JSON**:
    ```json
    {
      "flashcards": [
        { "id": 1, "front": "Question 1", "back": "Answer 1", "source": "manual", "generation_id": null },
        { "id": 2, "front": "Question 2", "back": "Answer 2", "source": "ai-full", "generation_id": 123 }
      ]
    }
    ```
  - **Validations**:
    - `front` maximum length: 200 characters.
    - `back` maximum length: 500 characters.
    - `source`: Must be one of `ai-full`, `ai-edited`, or `manual`.
    - `generation_id`: Required for `ai-full` and `ai-edited` sources, must be null for `manual` source.
  - **Errors**: 400 for invalid inputs, including validation errors for any flashcard in the array.

- **PUT `/flashcards/{id}`**
  - **Description**: Edit an existing flashcard.
  - **Request JSON**: Fields to update.
  - **Response JSON**: Updated flashcard object.
  - **Errors**: 400 for invalid input, 404 if flashcard not found, 401 Unauthorized.

- **DELETE `/flashcards/{id}`**
  - **Description**: Delete a flashcard.
  - **Response JSON**: Success message.
  - **Errors**: 404 if flashcard not found, 401 Unauthorized.

### 2.3. Generations

- **POST `/generations`**
  - **Description**: Initiate the AI generation process for flashcards proposals based on user-provided text.
  - **Request JSON**:
    ```json
    {
      "source_text": "User provided text (1000 to 10000 characters)",
    }
    ```
  - **Business Logic**:
    - Validate that `source_text` length is between 1000 and 10000 characters.
    - Call the AI service to generate flashcards proposals.
    - Store the generation metadata and return flashcard proposals to the user.
  - **Response JSON**:
    ```json
    {
      "generation_id": 123,
      "flashcards_proposals": [
         { "front": "Generated Question", "back": "Generated Answer", "source": "ai-full" }
      ],
      "generated_count": 5
    }
    ```
  - **Errors**:
    - 400: Invalid input.
    - 500: AI service errors (logs recorded in `generation_error_logs`).

- **GET `/generations`**
  - **Description**: Retrieve a list of generation requests for the authenticated user.
  - **Query Parameters**: Supports pagination as needed.
  - **Response JSON**: List of generation objects with metadata.

- **GET `/generations/{id}`**
  - **Description**: Retrieve detailed information of a specific generation including its flashcards.
  - **Response JSON**: Generation details and associated flashcards.
  - **Errors**: 404 Not Found.

### 2.4. Generation Error Logs

*(Typically used internally or by admin users)*

- **GET `/generation-error-logs`**
  - **Description**: Retrieve error logs for AI flashcard generation for the authenticated user or admin.
  - **Response JSON**: List of error log objects.
  - **Errors**:
    - 401 Unauthorized if token is invalid.
    - 403 Forbidden if access is restricted to admin users.

## 3. Authentication and Authorization

- **Mechanism**: Token-based authentication using Supabase Auth.
- **Process**:
  - Users authenticate via `/auth/login` or `/auth/register`, receiving a bearer token.
  - Protected endpoints require the token in the `Authorization` header.
  - Database-level Row-Level Security (RLS) ensures that users access only records with matching `user_id`.
- **Additional Considerations**: Use HTTPS, rate limiting, and secure error messaging to mitigate security risks.

## 4. Validation and Business Logic

- **Validation Rules**:
  - **Flashcards**:
    - `front`: Maximum length of 200 characters.
    - `back`: Maximum length of 500 characters.
    - `source`: Must be one of `ai-full`, `ai-edited`, or `manual`.
  - **Generations**:
    - `source_text`: Must have a length between 1000 and 10000 characters.
    - `source_text_hash`: Computed for duplicate detection.

- **Business Logic Implementation**:
  - **AI Generation**:
    - Validate inputs and call the AI service upon POST `/generations`.
    - Record generation metadata (model, generated_count, duration) and send generated flashcards proposals to the user.
    - Log any errors in `generation_error_logs` for auditing and debugging.
  - **Flashcard Management**:
    - Automatic update of the `updated_at` field via database triggers when flashcards are modified.



================================================
FILE: docs/db-plan.md
================================================
# 10xCards Database Schema

## 1. Tabele

### 1.1. users

This table is managed by Supabase Auth.

- id: UUID PRIMARY KEY
- email: VARCHAR(255) NOT NULL UNIQUE
- encrypted_password: VARCHAR NOT NULL
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- confirmed_at: TIMESTAMPTZ

### 1.2. flashcards

- id: BIGSERIAL PRIMARY KEY
- front: VARCHAR(200) NOT NULL
- back: VARCHAR(500) NOT NULL
- source: VARCHAR NOT NULL CHECK (source IN ('ai-full', 'ai-edited', 'manual'))
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- generation_id: BIGINT REFERENCES generations(id) ON DELETE SET NULL
- user_id: UUID NOT NULL REFERENCES users(id)

*Trigger: Automatically update the `updated_at` column on record updates.*

### 1.3. generations

- id: BIGSERIAL PRIMARY KEY
- user_id: UUID NOT NULL REFERENCES users(id)
- model: VARCHAR NOT NULL
- generated_count: INTEGER NOT NULL
- accepted_unedited_count: INTEGER NULLABLE
- accepted_edited_count: INTEGER NULLABLE
- source_text_hash: VARCHAR NOT NULL
- source_text_length: INTEGER NOT NULL CHECK (source_text_length BETWEEN 1000 AND 10000)
- generation_duration: INTEGER NOT NULL
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

### 1.4. generation_error_logs

- id: BIGSERIAL PRIMARY KEY
- user_id: UUID NOT NULL REFERENCES users(id)
- model: VARCHAR NOT NULL
- source_text_hash: VARCHAR NOT NULL
- source_text_length: INTEGER NOT NULL CHECK (source_text_length BETWEEN 1000 AND 10000)
- error_code: VARCHAR(100) NOT NULL
- error_message: TEXT NOT NULL
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()

## 2. Relacje

- Jeden użytkownik (users) ma wiele fiszek (flashcards).
- Jeden użytkownik (users) ma wiele rekordów w tabeli generations.
- Jeden użytkownik (users) ma wiele rekordów w tabeli generation_error_logs.
- Każda fiszka (flashcards) może opcjonalnie odnosić się do jednej generacji (generations) poprzez generation_id.

## 3. Indeksy

- Indeks na kolumnie `user_id` w tabeli flashcards.
- Indeks na kolumnie `generation_id` w tabeli flashcards.
- Indeks na kolumnie `user_id` w tabeli generations.
- Indeks na kolumnie `user_id` w tabeli generation_error_logs.

## 4. Zasady RLS (Row-Level Security)

- W tabelach flashcards, generations oraz generation_error_logs wdrożyć polityki RLS, które pozwalają użytkownikowi na dostęp tylko do rekordów, gdzie `user_id` odpowiada identyfikatorowi użytkownika z Supabase Auth (np. auth.uid() = user_id).

## 5. Dodatkowe uwagi

- Trigger w tabeli flashcards ma automatycznie aktualizować kolumnę `updated_at` przy każdej modyfikacji rekordu.



================================================
FILE: docs/generations-endpoint-implementation-plan.md
================================================
# API Endpoint Implementation Plan: POST /generations

## 1. Przegląd punktu końcowego
Endpoint służy do inicjowania procesu generowania propozycji fiszek przez AI na podstawie tekstu dostarczonego przez użytkownika. Jego zadaniem jest:
- Walidacja danych wejściowych (w szczególności długości `source_text`)
- Wywołanie zewnętrznego serwisu AI generującego propozycje fiszek
- Zapisanie metadanych generacji w bazie danych (tabela `generations`)
- Zwrot wygenerowanych propozycji fiszek oraz liczby wygenerowanych pozycji

## 2. Szczegóły żądania
- **Metoda HTTP**: POST
- **URL**: /generations
- **Parametry**:
  - **Wymagane**:
    - `source_text` (string) – tekst wejściowy o długości od 1000 do 10000 znaków
  - **Opcjonalne**: brak
- **Przykład Request Body**:
  ```json
  {
    "source_text": "User provided text with length between 1000 and 10000 characters"
  }
  ```

## 3. Wykorzystywane typy
- **GenerateFlashcardsCommand**: Model wejściowy zawierający pole `source_text`.
- **GenerationCreateResponseDto**: Model odpowiedzi zawierający:
  - `generation_id` (number)
  - `flashcards_proposals` (tablica obiektów typu FlashcardProposalDto)
  - `generated_count` (number)
- **FlashcardProposalDto**: Pojedyncza propozycja fiszki z polami:
  - `front` (string)
  - `back` (string)
  - `source` – wartość stała: "ai-full"

## 4. Szczegóły odpowiedzi
- **Sukces (HTTP 201)**:
  ```json
  {
    "generation_id": 123,
    "flashcards_proposals": [
       { "front": "Generated Question", "back": "Generated Answer", "source": "ai-full" }
    ],
    "generated_count": 5
  }
  ```
- **Kody statusu**:
  - 201: Pomyślne utworzenie generacji
  - 400: Błędne dane wejściowe (np. niepoprawna długość `source_text`)
  - 500: Błąd serwera (np. awaria serwisu AI lub błąd zapisu do bazy danych)

## 5. Przepływ danych
1. Odbiór żądania POST z ciałem zawierającym `source_text`.
2. Walidacja danych wejściowych za pomocą biblioteki `zod`, sprawdzającej, że długość `source_text` wynosi od 1000 do 10000 znaków.
3. Wywołanie dedykowanego serwisu (np. `generation.service`), który:
   - Przekazuje `source_text` do zewnętrznego serwisu AI w celu wygenerowania propozycji fiszek.
   - Oblicza i zapisuje metadane generacji w tabeli `generations` (m.in. `model`, `generated_count`, `source_text_hash`, `source_text_length`, `generation_duration`).
4. W przypadku wystąpienia błędu podczas wywołania AI, rejestrowanie błędu w tabeli `generation_error_logs` z odpowiednimi danymi (np. `error_code`, `error_message`, `model`).
5. Zwrócenie odpowiedzi do klienta z danymi zgodnymi z modelem `GenerationCreateResponseDto`.

## 6. Względy bezpieczeństwa
- **Uwierzytelnianie i autoryzacja**: Endpoint powinien być zabezpieczony przy użyciu Supabase Auth. Upewnij się, że tylko autoryzowani użytkownicy mogą inicjować generacje.
- **Walidacja danych**: Dokładna walidacja `source_text` przy pomocy `zod`, aby uniknąć potencjalnych ataków (np. SQL injection, przekroczenie limitów długości).
- **Ograniczenie ekspozycji błędów**: Szczegóły błędów nie powinny być zwracane użytkownikowi. Niepełne informacje o błędach powinny być logowane wewnętrznie.

## 7. Obsługa błędów
- **Błędne dane wejściowe (400)**: Jeżeli `source_text` nie mieści się w wymaganym zakresie długości, zwróć błąd 400 z odpowiednią wiadomością.
- **Błąd serwisu AI (500)**: W przypadku awarii podczas komunikacji z serwisem AI, złap wyjątek, zaloguj błąd (oraz zapisz wpis w tabeli `generation_error_logs`) i zwróć błąd 500.
- **Błąd bazy danych (500)**: W przypadku problemów z zapisem do bazy danych, zwróć błąd 500 wraz z logowaniem błędu.

## 8. Rozważania dotyczące wydajności
- **Timeout dla wywołania AI**: 60 sekund na czas oczekiwania, inaczej błąd timeout.
- **Asynchroniczne przetwarzanie**: Rozważ możliwość przetwarzania asynchronicznego generacji, zwłaszcza w warunkach dużego obciążenia.
- **Monitoring**: Implementuj mechanizmy monitorowania wydajności endpointu i serwisu AI.

## 9. Etapy wdrożenia
1. Utworzenie pliku endpointu w katalogu `/src/pages/api`, np. `generations.ts`.
2. Implementacja walidacji żądania przy użyciu `zod` (sprawdzenie długości `source_text`).
3. Stworzenie serwisu (`/src/lib/generation.service`), który:
   - Integruje się z zewnętrznym serwisem AI. Na etapie developmentu skorzystamy z mocków zamiast wywoływania serwisu AI.
   - Obsługuje logikę zapisu do tabeli `generations` oraz rejestracji błędów w `generation_error_logs`.
4. Dodanie mechanizmu uwierzytelniania poprzez Supabase Auth.
5. Implementacja logiki endpointu, wykorzystującej utworzony serwis.
6. Dodanie szczegółowego logowania akcji i błędów.



================================================
FILE: docs/prd.md
================================================
# Dokument wymagań produktu (PRD) – 10x-cards

## 1. Przegląd produktu
Projekt 10x-cards ma na celu umożliwienie użytkownikom szybkiego tworzenia i zarządzania zestawami fiszek edukacyjnych. Aplikacja wykorzystuje modele LLM (poprzez API) do generowania sugestii fiszek na podstawie dostarczonego tekstu.

## 2. Problem użytkownika
Manualne tworzenie wysokiej jakości fiszek wymaga dużych nakładów czasu i wysiłku, co zniechęca do korzystania z efektywnej metody nauki, jaką jest spaced repetition. Celem rozwiązania jest skrócenie czasu potrzebnego na tworzenie odpowiednich pytań i odpowiedzi oraz uproszczenie procesu zarządzania materiałem do nauki.

## 3. Wymagania funkcjonalne
1. Automatyczne generowanie fiszek:
   - Użytkownik wkleja dowolny tekst (np. fragment podręcznika).
   - Aplikacja wysyła tekst do modelu LLM za pośrednictwem API.
   - Model LLM proponuje zestaw fiszek (pytania i odpowiedzi).
   - Fiszki są przedstawiane użytkownikowi w formie listy z możliwością akceptacji, edycji lub odrzucenia.

2. Ręczne tworzenie i zarządzanie fiszkami:
   - Formularz do ręcznego tworzenia fiszek (przód i tył fiszki).
   - Opcje edycji i usuwania istniejących fiszek.
   - Ręczne tworzenie i wyświetlanie w ramach widoku listy "Moje fiszki"

3. Podstawowy system uwierzytelniania i kont użytkowników:
   - Rejestracja i logowanie.
   - Możliwość usunięcia konta i powiązanych fiszek na życzenie.

4. Integracja z algorytmem powtórek:
   - Zapewnienie mechanizmu przypisywania fiszek do harmonogramu powtórek (korzystanie z gotowego algorytmu).
   - Brak dodatkowych metadanych i zaawansowanych funkcji powiadomień w MVP.

5. Przechowywanie i skalowalność:
   - Dane o fiszkach i użytkownikach przechowywane w sposób zapewniający skalowalność i bezpieczeństwo.

6. Statystyki generowania fiszek:
   - Zbieranie informacji o tym, ile fiszek zostało wygenerowanych przez AI i ile z nich ostatecznie zaakceptowano.

7. Wymagania prawne i ograniczenia:
   - Dane osobowe użytkowników i fiszek przechowywane zgodnie z RODO.
   - Prawo do wglądu i usunięcia danych (konto wraz z fiszkami) na wniosek użytkownika.

## 4. Granice produktu
1. Poza zakresem MVP:
   - Zaawansowany, własny algorytm powtórek (korzystamy z gotowego rozwiązania, biblioteki open-source).
   - Mechanizmy gamifikacji.
   - Aplikacje mobilne (obecnie tylko wersja web).
   - Import wielu formatów dokumentów (PDF, DOCX itp.).
   - Publicznie dostępne API.
   - Współdzielenie fiszek między użytkownikami.
   - Rozbudowany system powiadomień.
   - Zaawansowane wyszukiwanie fiszek po słowach kluczowych.

## 5. Historyjki użytkowników

ID: US-001
Tytuł: Rejestracja konta
Opis: Jako nowy użytkownik chcę się zarejestrować, aby mieć dostęp do własnych fiszek i móc korzystać z generowania fiszek przez AI.
Kryteria akceptacji:
- Formularz rejestracyjny zawiera pola na adres e-mail i hasło.
- Po poprawnym wypełnieniu formularza i weryfikacji danych konto jest aktywowane.
- Użytkownik otrzymuje potwierdzenie pomyślnej rejestracji i zostaje zalogowany.

ID: US-002
Tytuł: Logowanie do aplikacji
Opis: Jako zarejestrowany użytkownik chcę móc się zalogować, aby mieć dostęp do moich fiszek i historii generowania.
Kryteria akceptacji:
- Po podaniu prawidłowych danych logowania użytkownik zostaje przekierowany do widoku generowania fiszek.
- Błędne dane logowania wyświetlają komunikat o nieprawidłowych danych.
- Dane dotyczące logowania przechowywane są w bezpieczny sposób.

ID: US-003
Tytuł: Generowanie fiszek przy użyciu AI
Opis: Jako zalogowany użytkownik chcę wkleić kawałek tekstu i za pomocą przycisku wygenerować propozycje fiszek, aby zaoszczędzić czas na ręcznym tworzeniu pytań i odpowiedzi.
Kryteria akceptacji:
- W widoku generowania fiszek znajduje się pole tekstowe, w którym użytkownik może wkleić swój tekst.
- Pole tekstowe oczekuje od 1000 do 10 000 znaków.
- Po kliknięciu przycisku generowania aplikacja komunikuje się z API modelu LLM i wyświetla listę wygenerowanych propozycji fiszek do akceptacji przez użytkownika.
- W przypadku problemów z API lub braku odpowiedzi modelu użytkownik zobaczy stosowny komunikat o błędzie.

ID: US-004
Tytuł: Przegląd i zatwierdzanie propozycji fiszek
Opis: Jako zalogowany użytkownik chcę móc przeglądać wygenerowane fiszki i decydować, które z nich chcę dodać do mojego zestawu, aby zachować tylko przydatne pytania i odpowiedzi.
Kryteria akceptacji:
- Lista wygenerowanych fiszek jest wyświetlana pod formularzem generowania.
- Przy każdej fiszce znajduje się przycisk pozwalający na jej zatwierdzenie, edycję lub odrzucenie.
- Po zatwierdzeniu wybranych fiszek użytkownik może kliknąć przycisk zapisu i dodać je do bazy danych.

ID: US-005
Tytuł: Edycja fiszek utworzonych ręcznie i generowanych przez AI
Opis: Jako zalogowany użytkownik chcę edytować stworzone lub wygenerowane fiszki, aby poprawić ewentualne błędy lub dostosować pytania i odpowiedzi do własnych potrzeb.
Kryteria akceptacji:
- Istnieje lista zapisanych fiszek (zarówno ręcznie tworzonych, jak i zatwierdzonych wygenerowanych).
- Każdą fiszkę można kliknąć i wejść w tryb edycji.
- Zmiany są zapisywane w bazie danych po zatwierdzeniu.

ID: US-006
Tytuł: Usuwanie fiszek
Opis: Jako zalogowany użytkownik chcę usuwać zbędne fiszki, aby zachować porządek w moim zestawie.
Kryteria akceptacji:
- Przy każdej fiszce na liście (w widoku "Moje fiszki") widoczna jest opcja usunięcia.
- Po wybraniu usuwania użytkownik musi potwierdzić operację, zanim fiszka zostanie trwale usunięta.
- Fiszki zostają trwale usunięte z bazy danych po potwierdzeniu.

ID: US-007
Tytuł: Ręczne tworzenie fiszek
Opis: Jako zalogowany użytkownik chcę ręcznie stworzyć fiszkę (określając przód i tył fiszki), aby dodawać własny materiał, który nie pochodzi z automatycznie generowanych treści.
Kryteria akceptacji:
- W widoku "Moje fiszki" znajduje się przycisk dodania nowej fiszki.
- Naciśnięcie przycisku otwiera formularz z polami "Przód" i "Tył".
- Po zapisaniu nowa fiszka pojawia się na liście.

ID: US-008
Tytuł: Sesja nauki z algorytmem powtórek
Opis: Jako zalogowany użytkownik chcę, aby dodane fiszki były dostępne w widoku "Sesja nauki" opartym na zewnętrznym algorytmie, aby móc efektywnie się uczyć (spaced repetition).
Kryteria akceptacji:
- W widoku "Sesja nauki" algorytm przygotowuje dla mnie sesję nauki fiszek
- Na start wyświetlany jest przód fiszki, poprzez interakcję użytkownik wyświetla jej tył
- Użytkownik ocenia zgodnie z oczekiwaniami algorytmu na ile przyswoił fiszkę
- Następnie algorytm pokazuje kolejną fiszkę w ramach sesji nauki

ID: US-009
Tytuł: Bezpieczny dostęp i autoryzacja
Opis: Jako zalogowany użytkownik chcę mieć pewność, że moje fiszki nie są dostępne dla innych użytkowników, aby zachować prywatność i bezpieczeństwo danych.
Kryteria akceptacji:
- Tylko zalogowany użytkownik może wyświetlać, edytować i usuwać swoje fiszki.
- Nie ma dostępu do fiszek innych użytkowników ani możliwości współdzielenia.

## 6. Metryki sukcesu
1. Efektywność generowania fiszek:
   - 75% wygenerowanych przez AI fiszek jest akceptowanych przez użytkownika.
   - Użytkownicy tworzą co najmniej 75% fiszek z wykorzystaniem AI (w stosunku do wszystkich nowo dodanych fiszek).
3. Zaangażowanie:
   - Monitorowanie liczby wygenerowanych fiszek i porównanie z liczbą zatwierdzonych do analizy jakości i użyteczności.



================================================
FILE: docs/tech-stack.md
================================================
Frontend - Astro z React dla komponentów interaktywnych:
- Astro 5 pozwala na tworzenie szybkich, wydajnych stron i aplikacji z minimalną ilością JavaScript
- React 19 zapewni interaktywność tam, gdzie jest potrzebna
- TypeScript 5 dla statycznego typowania kodu i lepszego wsparcia IDE
- Tailwind 4 pozwala na wygodne stylowanie aplikacji
- Shadcn/ui zapewnia bibliotekę dostępnych komponentów React, na których oprzemy UI

Backend - Supabase jako kompleksowe rozwiązanie backendowe:
- Zapewnia bazę danych PostgreSQL
- Zapewnia SDK w wielu językach, które posłużą jako Backend-as-a-Service
- Jest rozwiązaniem open source, które można hostować lokalnie lub na własnym serwerze
- Posiada wbudowaną autentykację użytkowników

AI - Komunikacja z modelami przez usługę Openrouter.ai:
- Dostęp do szerokiej gamy modeli (OpenAI, Anthropic, Google i wiele innych), które pozwolą nam znaleźć rozwiązanie zapewniające wysoką efektywność i niskie koszta
- Pozwala na ustawianie limitów finansowych na klucze API

CI/CD i Hosting:
- Github Actions do tworzenia pipeline’ów CI/CD
- DigitalOcean do hostowania aplikacji za pośrednictwem obrazu docker



================================================
FILE: src/env.d.ts
================================================
interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
  readonly OPENROUTER_API_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}



================================================
FILE: src/types.ts
================================================
// src/types.ts
import type { Database } from "./db/database.types";

// ------------------------------------------------------------------------------------------------
// Aliases for base database types extracted from the Database model definitions
// ------------------------------------------------------------------------------------------------
export type Flashcard = Database["public"]["Tables"]["flashcards"]["Row"];
export type FlashcardInsert = Database["public"]["Tables"]["flashcards"]["Insert"];
export type Generation = Database["public"]["Tables"]["generations"]["Row"];
export type GenerationErrorLog = Database["public"]["Tables"]["generation_error_logs"]["Row"];

// ------------------------------------------------------------------------------------------------
// 1. Flashcard DTO
//    Represents a flashcard as returned by the API endpoints (GET /flashcards, GET /flashcards/{id})
// ------------------------------------------------------------------------------------------------
export type FlashcardDto = Pick<
  Flashcard,
  "id" | "front" | "back" | "source" | "generation_id" | "created_at" | "updated_at"
>;

// ------------------------------------------------------------------------------------------------
// 2. Pagination DTO
//    Contains pagination details used in list responses
// ------------------------------------------------------------------------------------------------
export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
}

// ------------------------------------------------------------------------------------------------
// 3. Flashcards List Response DTO
//    Combines an array of flashcards with pagination metadata (GET /flashcards)
// ------------------------------------------------------------------------------------------------
export interface FlashcardsListResponseDto {
  data: FlashcardDto[];
  pagination: PaginationDto;
}

// ------------------------------------------------------------------------------------------------
// 4. Flashcard Create DTO & Command Model
//    Used in the POST /flashcards endpoint to create one or more flashcards.
//    Validation rules:
//      - front: maximum length 200 characters
//      - back: maximum length 500 characters
//      - source: must be one of "ai-full", "ai-edited", or "manual"
//      - generation_id: required for "ai-full" and "ai-edited", must be null for "manual"
// ------------------------------------------------------------------------------------------------
export type Source = "ai-full" | "ai-edited" | "manual";

export interface FlashcardCreateDto {
  front: string;
  back: string;
  source: Source;
  generation_id: number | null;
}

export interface FlashcardsCreateCommand {
  flashcards: FlashcardCreateDto[];
}

// ------------------------------------------------------------------------------------------------
// 5. Flashcard Update DTO (Command Model)
//    For the PUT /flashcards/{id} endpoint to update existing flashcards.
//    This model is a partial update of flashcard fields.
// ------------------------------------------------------------------------------------------------
export type FlashcardUpdateDto = Partial<{
  front: string;
  back: string;
  source: "ai-full" | "ai-edited" | "manual";
  generation_id: number | null;
}>;

// ------------------------------------------------------------------------------------------------
// 6. Generate Flashcards Command
//    Used in the POST /generations endpoint to initiate the AI flashcard generation process.
//    The "source_text" must be between 1000 and 10000 characters.
// ------------------------------------------------------------------------------------------------
export interface GenerateFlashcardsCommand {
  source_text: string;
}

// ------------------------------------------------------------------------------------------------
// 7. Flashcard Proposal DTO
//    Represents a single flashcard proposal generated from AI, always with source "ai-full".
// ------------------------------------------------------------------------------------------------
export interface FlashcardProposalDto {
  front: string;
  back: string;
  source: "ai-full";
}

// ------------------------------------------------------------------------------------------------
// 8. Generation Create Response DTO
//    This type describes the response from the POST /generations endpoint.
// ------------------------------------------------------------------------------------------------
export interface GenerationCreateResponseDto {
  generation_id: number;
  flashcards_proposals: FlashcardProposalDto[];
  generated_count: number;
}

// ------------------------------------------------------------------------------------------------
// 9. Generation Detail DTO
//    Provides detailed information for a generation request (GET /generations/{id}),
//    including metadata from the generations table and optionally, the associated flashcards.
// ------------------------------------------------------------------------------------------------
export type GenerationDetailDto = Generation & {
  flashcards?: FlashcardDto[];
};

// ------------------------------------------------------------------------------------------------
// 10. Generation Error Log DTO
//     Represents an error log entry for the AI flashcard generation process (GET /generation-error-logs).
// ------------------------------------------------------------------------------------------------
export type GenerationErrorLogDto = Pick<
  GenerationErrorLog,
  "id" | "error_code" | "error_message" | "model" | "source_text_hash" | "source_text_length" | "created_at" | "user_id"
>;



================================================
FILE: src/components/Welcome.astro
================================================
<div
  class="relative w-full mx-auto min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 sm:p-8"
>
  <div
    class="relative max-w-4xl mx-auto backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-2xl shadow-2xl p-8 text-white border border-white/10"
  >
    <div class="space-y-8">
      <div class="text-center">
        <h1
          class="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text drop-shadow-lg"
        >
          Witaj w 10xDevs Astro Starter!
        </h1>
        <p class="text-xl text-blue-100/90 drop-shadow-md">
          Ten projekt został zbudowany w oparciu o nowoczesny stack technologiczny:
        </p>
      </div>

      <div class="flex flex-col gap-6 max-w-2xl mx-auto">
        <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2
            class="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
          >
            Core
          </h2>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm">Astro v5.5.5</span>
              <span class="text-blue-100/90">- Metaframework do aplikacji webowych</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm">React v19</span>
              <span class="text-blue-100/90">- Biblioteka UI do komponentów interaktywnych</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm">TypeScript</span>
              <span class="text-blue-100/90">- Typowanie statyczne</span>
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2
            class="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
          >
            Stylowanie
          </h2>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm"
                >Tailwind CSS v4</span
              >
              <span class="text-blue-100/90">- Utility-first CSS framework</span>
            </li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2
            class="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200"
          >
            Statyczna analiza kodu
          </h2>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm">ESLint v9</span>
              <span class="text-blue-100/90">- Lintowanie kodu</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm">Prettier</span>
              <span class="text-blue-100/90">- Formatowanie kodu</span>
            </li>
            <li class="flex items-center space-x-3">
              <span class="font-mono bg-blue-900/50 px-3 py-1.5 rounded-lg text-blue-200 shadow-sm"
                >Husky i Lint-staged</span
              >
              <span class="text-blue-100/90">- Automatyczna analiza kodu przed commitowaniem</span>
            </li>
          </ul>
        </div>
      </div>

      <p class="text-lg text-center text-blue-100/90 mt-8 leading-relaxed">
        Starter zawiera wszystko, czego potrzebujesz do rozpoczęcia tworzenia <br class="hidden sm:block" />
        <span class="font-semibold bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text"
          >nowoczesnych aplikacji webowych!</span
        >
      </p>
    </div>
  </div>
</div>



================================================
FILE: src/components/ui/button.tsx
================================================
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }



================================================
FILE: src/db/database.types.ts
================================================
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  graphql_public: {
    Tables: Record<never, never>;
    Views: Record<never, never>;
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
  public: {
    Tables: {
      flashcards: {
        Row: {
          back: string;
          created_at: string;
          front: string;
          generation_id: number | null;
          id: number;
          source: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          back: string;
          created_at?: string;
          front: string;
          generation_id?: number | null;
          id?: number;
          source: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          back?: string;
          created_at?: string;
          front?: string;
          generation_id?: number | null;
          id?: number;
          source?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_generation";
            columns: ["generation_id"];
            isOneToOne: false;
            referencedRelation: "generations";
            referencedColumns: ["id"];
          },
        ];
      };
      generation_error_logs: {
        Row: {
          created_at: string;
          error_code: string;
          error_message: string;
          id: number;
          model: string;
          source_text_hash: string;
          source_text_length: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          error_code: string;
          error_message: string;
          id?: number;
          model: string;
          source_text_hash: string;
          source_text_length: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          error_code?: string;
          error_message?: string;
          id?: number;
          model?: string;
          source_text_hash?: string;
          source_text_length?: number;
          user_id?: string;
        };
        Relationships: [];
      };
      generations: {
        Row: {
          accepted_edited_count: number | null;
          accepted_unedited_count: number | null;
          created_at: string;
          generated_count: number;
          generation_duration: number;
          id: number;
          model: string;
          source_text_hash: string;
          source_text_length: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          accepted_edited_count?: number | null;
          accepted_unedited_count?: number | null;
          created_at?: string;
          generated_count: number;
          generation_duration: number;
          id?: number;
          model: string;
          source_text_hash: string;
          source_text_length: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          accepted_edited_count?: number | null;
          accepted_unedited_count?: number | null;
          created_at?: string;
          generated_count?: number;
          generation_duration?: number;
          id?: number;
          model?: string;
          source_text_hash?: string;
          source_text_length?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
}

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;



================================================
FILE: src/db/mock-data.ts
================================================
export const DEFAULT_USER_ID = "43454c13-032d-4a61-8f7c-356fab613472";



================================================
FILE: src/db/supabase.client.ts
================================================
import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
export type SupabaseClient = typeof supabaseClient;



================================================
FILE: src/layouts/Layout.astro
================================================
---
import "../styles/global.css";

interface Props {
  title?: string;
}

const { title = "10x Astro Starter" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>

<style>
  html,
  body {
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>



================================================
FILE: src/lib/generation.service.ts
================================================
/**
 * @module generation.service
 * @description Service responsible for generating flashcards using AI through OpenRouter integration.
 * This module provides functionality for creating, processing, and storing flashcard generations.
 */

import crypto from "crypto";
import type { FlashcardProposalDto, GenerationCreateResponseDto } from "../types";
import type { SupabaseClient } from "../db/supabase.client";
import { DEFAULT_USER_ID } from "../db/mock-data";
import { OpenRouterService } from "./openrouter.service";
import { OpenRouterError } from "./openrouter.types";

/**
 * Service class for handling flashcard generation using AI.
 * @class GenerationService
 * @description Manages the process of generating flashcards from source text using OpenRouter AI service,
 * including error handling, metadata storage, and generation logging.
 *
 * @requires OpenRouterService
 * @requires SupabaseClient
 *
 * @example
 * ```typescript
 * const generationService = new GenerationService(supabaseClient, { apiKey: 'your-openrouter-api-key' });
 * const result = await generationService.generateFlashcards('Your source text here');
 * ```
 */
export class GenerationService {
  private readonly openRouter: OpenRouterService;
  private readonly model = "openai/gpt-4o-mini";

  /**
   * Creates an instance of GenerationService.
   * @constructor
   * @param {SupabaseClient} supabase - Supabase client instance for database operations
   * @param {Object} [openRouterConfig] - Configuration object for OpenRouter
   * @param {string} openRouterConfig.apiKey - OpenRouter API key
   * @throws {Error} When OpenRouter API key is not provided
   */
  constructor(
    private readonly supabase: SupabaseClient,
    openRouterConfig?: { apiKey: string }
  ) {
    if (!openRouterConfig?.apiKey) {
      throw new Error("OpenRouter API key is required");
    }
    this.openRouter = new OpenRouterService({
      apiKey: openRouterConfig.apiKey,
      timeout: 60000, // 60 seconds timeout for longer generations
    });

    // Configure OpenRouter
    this.openRouter.setModel(this.model, {
      temperature: 0.7,
      top_p: 1,
    });

    this.openRouter
      .setSystemMessage(`You are an AI assistant specialized in creating high-quality flashcards from provided text.
Generate concise, clear, and effective flashcards that capture key concepts and knowledge.
Each flashcard should have a front (question/prompt) and back (answer/explanation).
Focus on important facts, definitions, concepts, and relationships.`);

    this.openRouter.setResponseFormat({
      name: "flashcards",
      schema: {
        type: "object",
        properties: {
          flashcards: {
            type: "array",
            items: {
              type: "object",
              properties: {
                front: { type: "string" },
                back: { type: "string" },
              },
              required: ["front", "back"],
            },
          },
        },
        required: ["flashcards"],
      },
    });
  }

  /**
   * Generates flashcards from provided source text.
   * @async
   * @param {string} sourceText - The text to generate flashcards from
   * @returns {Promise<GenerationCreateResponseDto>} Object containing generation ID, flashcard proposals, and count
   * @throws {Error} When AI service fails or database operations fail
   *
   * @example
   * ```typescript
   * const result = await generationService.generateFlashcards('Your text here');
   * console.log(`Generated ${result.generated_count} flashcards`);
   * ```
   */
  async generateFlashcards(sourceText: string): Promise<GenerationCreateResponseDto> {
    try {
      // 1. Calculate metadata
      const startTime = Date.now();
      const sourceTextHash = await this.calculateHash(sourceText);

      // 2. Call AI service through OpenRouter
      const proposals = await this.callAIService(sourceText);

      // 3. Save generation metadata
      const generationId = await this.saveGenerationMetadata({
        sourceText,
        sourceTextHash,
        generatedCount: proposals.length,
        durationMs: Date.now() - startTime,
      });

      return {
        generation_id: generationId,
        flashcards_proposals: proposals,
        generated_count: proposals.length,
      };
    } catch (error) {
      // Log error and save to generation_error_logs
      await this.logGenerationError(error, {
        sourceTextHash: await this.calculateHash(sourceText),
        sourceTextLength: sourceText.length,
      });
      throw error;
    }
  }

  /**
   * Calculates MD5 hash of provided text.
   * @private
   * @param {string} text - Text to hash
   * @returns {Promise<string>} MD5 hash of the text
   */
  private async calculateHash(text: string): Promise<string> {
    return crypto.createHash("md5").update(text).digest("hex");
  }

  /**
   * Calls the AI service to generate flashcards.
   * @private
   * @param {string} text - Source text for flashcard generation
   * @returns {Promise<FlashcardProposalDto[]>} Array of generated flashcard proposals
   * @throws {Error} When AI service returns invalid response or encounters an error
   */
  private async callAIService(text: string): Promise<FlashcardProposalDto[]> {
    try {
      // Set the user message with the source text
      this.openRouter.setUserMessage(`Generate flashcards from the following text:\n\n${text}`);

      // Get response from OpenRouter
      const response = await this.openRouter.sendChatMessage();

      // Parse the JSON response
      const data = JSON.parse(response);

      // Validate response structure
      if (!data.flashcards || !Array.isArray(data.flashcards)) {
        throw new Error("Invalid response format: missing flashcards array");
      }

      // Convert to FlashcardProposalDto format
      return data.flashcards.map((card: { front: string; back: string }) => ({
        front: card.front,
        back: card.back,
        source: "ai-full" as const,
      }));
    } catch (error) {
      if (error instanceof OpenRouterError) {
        throw new Error(`AI Service error: ${error.message} (${error.code})`);
      }
      if (error instanceof Error) {
        throw new Error(`AI Service error: ${error.message}`);
      }
      throw new Error("An unknown error occurred in the AI service.");
    }
  }

  /**
   * Saves generation metadata to the database.
   * @private
   * @param {Object} data - Generation metadata
   * @param {string} data.sourceText - Original source text
   * @param {string} data.sourceTextHash - Hash of the source text
   * @param {number} data.generatedCount - Number of generated flashcards
   * @param {number} data.durationMs - Generation duration in milliseconds
   * @returns {Promise<number>} ID of the saved generation record
   * @throws {Error} When database operation fails
   */
  private async saveGenerationMetadata(data: {
    sourceText: string;
    sourceTextHash: string;
    generatedCount: number;
    durationMs: number;
  }): Promise<number> {
    const { data: generation, error } = await this.supabase
      .from("generations")
      .insert({
        user_id: DEFAULT_USER_ID,
        source_text_hash: data.sourceTextHash,
        source_text_length: data.sourceText.length,
        generated_count: data.generatedCount,
        generation_duration: data.durationMs,
        model: this.model,
      })
      .select("id")
      .single();

    if (error) throw error;
    return generation.id;
  }

  /**
   * Logs generation errors to the database.
   * @private
   * @param {unknown} error - Error that occurred during generation
   * @param {Object} data - Additional error context
   * @param {string} data.sourceTextHash - Hash of the source text
   * @param {number} data.sourceTextLength - Length of the source text
   * @returns {Promise<void>}
   */
  private async logGenerationError(
    error: unknown,
    data: {
      sourceTextHash: string;
      sourceTextLength: number;
    }
  ): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = error instanceof Error ? error.name : "UNKNOWN";

    await this.supabase.from("generation_error_logs").insert({
      user_id: DEFAULT_USER_ID,
      error_code: errorCode,
      error_message: errorMessage,
      model: this.model,
      source_text_hash: data.sourceTextHash,
      source_text_length: data.sourceTextLength,
    });
  }
}



================================================
FILE: src/lib/openrouter.service.ts
================================================
/**
 * @module openrouter.service
 * @description Mock service for OpenRouter integration.
 * This service simulates the behavior of the real OpenRouterService by returning mock data.
 * It is intended for development and testing purposes.
 */

/**
 * Mock implementation of the OpenRouterService.
 * @class OpenRouterService
 * @description This class provides a mock implementation of the OpenRouterService for development and testing.
 * It has methods to configure the "AI" and to "generate" flashcards, but it returns static mock data.
 *
 * @example
 * ```typescript
 * const openRouter = new OpenRouterService({ apiKey: 'mock-key', timeout: 60000 });
 * const response = await openRouter.sendChatMessage();
 * const data = JSON.parse(response);
 * console.log(data.flashcards);
 * ```
 */
export class OpenRouterService {
  /**
   * Creates an instance of the mock OpenRouterService.
   * @constructor
   * @param {object} config - Configuration object (not used in mock).
   * @param {string} config.apiKey - The API key (mocked).
   * @param {number} config.timeout - The timeout duration (mocked).
   */
  constructor(_config: { apiKey: string; timeout: number }) {}

  /**
   * Mocks setting the model for the AI.
   * @param {string} _model - The model name to be set.
   * @param {any} _options - Configuration options for the model.
   */
  setModel(_model: string, _options: unknown) {}

  /**
   * Mocks setting the system message for the AI.
   * @param {string} _message - The system message.
   */
  setSystemMessage(_message: string) {}

  /**
   * Mocks setting the response format.
   * @param {any} _format - The response format configuration.
   */
  setResponseFormat(_format: unknown) {}

  /**
   * Mocks setting the user message.
   * @param {string} _message - The user message.
   */
  setUserMessage(_message: string) {}

  /**
   * Mocks sending a chat message to the AI and returns a promise with mock flashcard data.
   * @async
   * @returns {Promise<string>} A promise that resolves to a JSON string of mock flashcards.
   */
  async sendChatMessage(): Promise<string> {
    const mockResponse = {
      flashcards: [
        {
          front: "What is Astro?",
          back: "A web framework for building content-driven websites.",
        },
        {
          front: "What is Supabase?",
          back: "An open source Firebase alternative.",
        },
        {
          front: "What is Tailwind CSS?",
          back: "A utility-first CSS framework.",
        },
        { front: "What is React?", back: "A JavaScript library for building user interfaces." },
        {
          front: "What is TypeScript?",
          back: "A typed superset of JavaScript that compiles to plain JavaScript.",
        },
      ],
    };
    return JSON.stringify(mockResponse);
  }
}



================================================
FILE: src/lib/openrouter.types.ts
================================================
/**
 * @module openrouter.types
 * @description This module defines the types used for OpenRouter integration.
 */

/**
 * Custom error class for OpenRouter specific errors.
 * @class OpenRouterError
 * @extends {Error}
 * @param {string} message - The error message.
 * @param {string} [code] - An optional error code.
 *
 * @example
 * throw new OpenRouterError("Invalid API key", "401");
 */
export class OpenRouterError extends Error {
  constructor(
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}



================================================
FILE: src/lib/utils.ts
================================================
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: src/middleware/index.ts
================================================
import { defineMiddleware } from "astro:middleware";

import { supabaseClient } from "../db/supabase.client";

export const onRequest = defineMiddleware((context, next) => {
  context.locals.supabase = supabaseClient;
  return next();
});



================================================
FILE: src/pages/index.astro
================================================
---
import Welcome from "../components/Welcome.astro";
import Layout from "../layouts/Layout.astro";
---

<Layout>
  <Welcome />
</Layout>



================================================
FILE: src/pages/api/generations.ts
================================================
/// <reference types="astro/client" />
import { z } from "zod";
import type { APIRoute } from "astro";
import type { GenerateFlashcardsCommand } from "../../types";
import { GenerationService } from "../../lib/generation.service";

export const prerender = false;

// Validation schema for the request body
const generateFlashcardsSchema = z.object({
  source_text: z
    .string()
    .min(1000, "Text must be at least 1000 characters long")
    .max(10000, "Text must not exceed 10000 characters"),
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse and validate request body
    const body = (await request.json()) as GenerateFlashcardsCommand;
    const validationResult = generateFlashcardsSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request data",
          details: validationResult.error.errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Initialize service and generate flashcards
    const generationService = new GenerationService(locals.supabase, {
      apiKey: "open-router-api-key",
    });
    const result = await generationService.generateFlashcards(body.source_text);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error processing generation request:", errorMessage, error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};



================================================
FILE: src/styles/global.css
================================================
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}



================================================
FILE: supabase/config.toml
================================================
# For detailed configuration reference documentation, visit:
# https://supabase.com/docs/guides/local-development/cli/config
# A string used to distinguish different Supabase projects on the same host. Defaults to the
# working directory name when running `supabase init`.
project_id = "ai-workshop-project"

[api]
enabled = true
# Port to use for the API URL.
port = 54321
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. `public` and `graphql_public` schemas are included by default.
schemas = ["public", "graphql_public"]
# Extra schemas to add to the search_path of every request.
extra_search_path = ["public", "extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000

[api.tls]
# Enable HTTPS endpoints locally using a self-signed certificate.
enabled = false

[db]
# Port to use for the local database URL.
port = 54322
# Port used by db diff command to initialize the shadow database.
shadow_port = 54320
# The database major version to use. This has to be the same as your remote database's. Run `SHOW
# server_version;` on the remote database to check.
major_version = 15

[db.pooler]
enabled = false
# Port to use for the local connection pooler.
port = 54329
# Specifies when a server connection can be reused by other clients.
# Configure one of the supported pooler modes: `transaction`, `session`.
pool_mode = "transaction"
# How many server connections to allow per user/database pair.
default_pool_size = 20
# Maximum number of client connections allowed.
max_client_conn = 100

# [db.vault]
# secret_key = "env(SECRET_VALUE)"

[db.migrations]
# Specifies an ordered list of schema files that describe your database.
# Supports glob patterns relative to supabase directory: "./schemas/*.sql"
schema_paths = []

[db.seed]
# If enabled, seeds the database after migrations during a db reset.
enabled = true
# Specifies an ordered list of seed files to load during db reset.
# Supports glob patterns relative to supabase directory: "./seeds/*.sql"
sql_paths = ["./seed.sql"]

[realtime]
enabled = true
# Bind realtime via either IPv4 or IPv6. (default: IPv4)
# ip_version = "IPv6"
# The maximum length in bytes of HTTP request headers. (default: 4096)
# max_header_length = 4096

[studio]
enabled = true
# Port to use for Supabase Studio.
port = 54323
# External URL of the API server that frontend connects to.
api_url = "http://127.0.0.1"
# OpenAI API Key to use for Supabase AI in the Supabase Studio.
openai_api_key = "env(OPENAI_API_KEY)"

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
enabled = true
# Port to use for the email testing server web interface.
port = 54324
# Uncomment to expose additional ports for testing user applications that send emails.
# smtp_port = 54325
# pop3_port = 54326
# admin_email = "admin@email.com"
# sender_name = "Admin"

[storage]
enabled = true
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

# Image transformation API is available to Supabase Pro plan.
# [storage.image_transformation]
# enabled = true

# Uncomment to configure local storage buckets
# [storage.buckets.images]
# public = false
# file_size_limit = "50MiB"
# allowed_mime_types = ["image/png", "image/jpeg"]
# objects_path = "./images"

[auth]
enabled = true
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://127.0.0.1:3000"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://127.0.0.1:3000"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 (1 week).
jwt_expiry = 3600
# If disabled, the refresh token will never expire.
enable_refresh_token_rotation = true
# Allows refresh tokens to be reused after expiry, up to the specified interval in seconds.
# Requires enable_refresh_token_rotation = true.
refresh_token_reuse_interval = 10
# Allow/disallow new user signups to your project.
enable_signup = true
# Allow/disallow anonymous sign-ins to your project.
enable_anonymous_sign_ins = false
# Allow/disallow testing manual linking of accounts
enable_manual_linking = false
# Passwords shorter than this value will be rejected as weak. Minimum 6, recommended 8 or more.
minimum_password_length = 6
# Passwords that do not meet the following requirements will be rejected as weak. Supported values
# are: `letters_digits`, `lower_upper_letters_digits`, `lower_upper_letters_digits_symbols`
password_requirements = ""

[auth.rate_limit]
# Number of emails that can be sent per hour. Requires auth.email.smtp to be enabled.
email_sent = 2
# Number of SMS messages that can be sent per hour. Requires auth.sms to be enabled.
sms_sent = 30
# Number of anonymous sign-ins that can be made per hour per IP address. Requires enable_anonymous_sign_ins = true.
anonymous_users = 30
# Number of sessions that can be refreshed in a 5 minute interval per IP address.
token_refresh = 150
# Number of sign up and sign-in requests that can be made in a 5 minute interval per IP address (excludes anonymous users).
sign_in_sign_ups = 30
# Number of OTP / Magic link verifications that can be made in a 5 minute interval per IP address.
token_verifications = 30

# Configure one of the supported captcha providers: `hcaptcha`, `turnstile`.
# [auth.captcha]
# enabled = true
# provider = "hcaptcha"
# secret = ""

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false
# If enabled, users will need to reauthenticate or have logged in recently to change their password.
secure_password_change = false
# Controls the minimum amount of time that must pass before sending another signup confirmation or password reset email.
max_frequency = "1s"
# Number of characters used in the email OTP.
otp_length = 6
# Number of seconds before the email OTP expires (defaults to 1 hour).
otp_expiry = 3600

# Use a production-ready SMTP server
# [auth.email.smtp]
# enabled = true
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
# admin_email = "admin@email.com"
# sender_name = "Admin"

# Uncomment to customize email template
# [auth.email.template.invite]
# subject = "You have been invited"
# content_path = "./supabase/templates/invite.html"

[auth.sms]
# Allow/disallow new user signups via SMS to your project.
enable_signup = false
# If enabled, users need to confirm their phone number before signing in.
enable_confirmations = false
# Template for sending OTP to users
template = "Your code is {{ .Code }}"
# Controls the minimum amount of time that must pass before sending another sms otp.
max_frequency = "5s"

# Use pre-defined map of phone number to OTP for testing.
# [auth.sms.test_otp]
# 4152127777 = "123456"

# Configure logged in session timeouts.
# [auth.sessions]
# Force log out after the specified duration.
# timebox = "24h"
# Force log out if the user has been inactive longer than the specified duration.
# inactivity_timeout = "8h"

# This hook runs before a token is issued and allows you to add additional claims based on the authentication method used.
# [auth.hook.custom_access_token]
# enabled = true
# uri = "pg-functions://<database>/<schema>/<hook_name>"

# Configure one of the supported SMS providers: `twilio`, `twilio_verify`, `messagebird`, `textlocal`, `vonage`.
[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"

# Multi-factor-authentication is available to Supabase Pro plan.
[auth.mfa]
# Control how many MFA factors can be enrolled at once per user.
max_enrolled_factors = 10

# Control MFA via App Authenticator (TOTP)
[auth.mfa.totp]
enroll_enabled = false
verify_enabled = false

# Configure MFA via Phone Messaging
[auth.mfa.phone]
enroll_enabled = false
verify_enabled = false
otp_length = 6
template = "Your code is {{ .Code }}"
max_frequency = "5s"

# Configure MFA via WebAuthn
# [auth.mfa.web_authn]
# enroll_enabled = true
# verify_enabled = true

# Use an external OAuth provider. The full list of providers are: `apple`, `azure`, `bitbucket`,
# `discord`, `facebook`, `github`, `gitlab`, `google`, `keycloak`, `linkedin_oidc`, `notion`, `twitch`,
# `twitter`, `slack`, `spotify`, `workos`, `zoom`.
[auth.external.apple]
enabled = false
client_id = ""
# DO NOT commit your OAuth provider secret to git. Use environment variable substitution instead:
secret = "env(SUPABASE_AUTH_EXTERNAL_APPLE_SECRET)"
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""
# If enabled, the nonce check will be skipped. Required for local sign in with Google auth.
skip_nonce_check = false

# Use Firebase Auth as a third-party provider alongside Supabase Auth.
[auth.third_party.firebase]
enabled = false
# project_id = "my-firebase-project"

# Use Auth0 as a third-party provider alongside Supabase Auth.
[auth.third_party.auth0]
enabled = false
# tenant = "my-auth0-tenant"
# tenant_region = "us"

# Use AWS Cognito (Amplify) as a third-party provider alongside Supabase Auth.
[auth.third_party.aws_cognito]
enabled = false
# user_pool_id = "my-user-pool-id"
# user_pool_region = "us-east-1"

# Use Clerk as a third-party provider alongside Supabase Auth.
[auth.third_party.clerk]
enabled = false
# Obtain from https://clerk.com/setup/supabase
# domain = "example.clerk.accounts.dev"

[edge_runtime]
enabled = true
# Configure one of the supported request policies: `oneshot`, `per_worker`.
# Use `oneshot` for hot reload, or `per_worker` for load testing.
policy = "oneshot"
# Port to attach the Chrome inspector for debugging edge functions.
inspector_port = 8083
# The Deno major version to use.
deno_version = 1

# [edge_runtime.secrets]
# secret_key = "env(SECRET_VALUE)"

[analytics]
enabled = true
port = 54327
# Configure one of the supported backends: `postgres`, `bigquery`.
backend = "postgres"

# Experimental features may be deprecated any time
[experimental]
# Configures Postgres storage engine to use OrioleDB (S3)
orioledb_version = ""
# Configures S3 bucket URL, eg. <bucket_name>.s3-<region>.amazonaws.com
s3_host = "env(S3_HOST)"
# Configures S3 bucket region, eg. us-east-1
s3_region = "env(S3_REGION)"
# Configures AWS_ACCESS_KEY_ID for S3 bucket
s3_access_key = "env(S3_ACCESS_KEY)"
# Configures AWS_SECRET_ACCESS_KEY for S3 bucket
s3_secret_key = "env(S3_SECRET_KEY)"



================================================
FILE: supabase/.gitignore
================================================
# Supabase
.branches
.temp

# dotenvx
.env.keys
.env.local
.env.*.local



================================================
FILE: supabase/migrations/20240320143000_create_generations_table.sql
================================================
-- Migration: Create generations table
-- Description: Creates the generations table with RLS policies
-- Author: AI Assistant
-- Date: 2024-03-20

-- Create the generations table
create table public.generations (
    id bigserial primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    model varchar not null,
    generated_count integer not null,
    accepted_unedited_count integer,
    accepted_edited_count integer,
    source_text_hash varchar not null,
    source_text_length integer not null check (source_text_length between 1000 and 10000),
    generation_duration integer not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Create index
create index generations_user_id_idx on public.generations(user_id);

-- Enable Row Level Security
alter table public.generations enable row level security;

-- Create RLS policies for authenticated users
create policy "Users can view their own generations"
    on public.generations
    for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can create their own generations"
    on public.generations
    for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update their own generations"
    on public.generations
    for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own generations"
    on public.generations
    for delete
    to authenticated
    using (auth.uid() = user_id);

-- Create handle_updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create trigger for updating updated_at
create trigger set_updated_at
    before update on public.generations
    for each row
    execute function public.handle_updated_at();

-- Comments
comment on table public.generations is 'Stores information about flashcard generation sessions';
comment on column public.generations.model is 'The AI model used for generation';
comment on column public.generations.generated_count is 'Number of flashcards generated in this session';
comment on column public.generations.accepted_unedited_count is 'Number of flashcards accepted without edits';
comment on column public.generations.accepted_edited_count is 'Number of flashcards accepted after editing';
comment on column public.generations.source_text_hash is 'Hash of the source text used for generation';
comment on column public.generations.source_text_length is 'Length of the source text in characters';
comment on column public.generations.generation_duration is 'Duration of generation process in milliseconds';


================================================
FILE: supabase/migrations/20240320143001_create_flashcards_table.sql
================================================
-- Migration: Create flashcards table
-- Description: Creates the flashcards table with RLS policies
-- Author: AI Assistant
-- Date: 2024-03-20

-- Create the flashcards table
create table public.flashcards (
    id bigserial primary key,
    front varchar(200) not null,
    back varchar(500) not null,
    source varchar not null check (source in ('ai-full', 'ai-edited', 'manual')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    generation_id bigint,
    user_id uuid not null references auth.users(id) on delete cascade,
    constraint fk_generation foreign key (generation_id) references generations(id) on delete set null
);

-- Create indexes
create index flashcards_user_id_idx on public.flashcards(user_id);
create index flashcards_generation_id_idx on public.flashcards(generation_id);

-- Enable Row Level Security
alter table public.flashcards enable row level security;

-- Create RLS policies for authenticated users
create policy "Users can view their own flashcards"
    on public.flashcards
    for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can create their own flashcards"
    on public.flashcards
    for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update their own flashcards"
    on public.flashcards
    for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own flashcards"
    on public.flashcards
    for delete
    to authenticated
    using (auth.uid() = user_id);

-- Create trigger for updating updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at
    before update on public.flashcards
    for each row
    execute function public.handle_updated_at();

-- Comments
comment on table public.flashcards is 'Stores flashcards created by users';
comment on column public.flashcards.front is 'Front side of the flashcard, limited to 200 characters';
comment on column public.flashcards.back is 'Back side of the flashcard, limited to 500 characters';
comment on column public.flashcards.source is 'Source of the flashcard: ai-full (unedited AI generation), ai-edited (edited AI generation), or manual';


================================================
FILE: supabase/migrations/20240320143002_create_generation_error_logs_table.sql
================================================
-- Migration: Create generation_error_logs table
-- Description: Creates the generation_error_logs table with RLS policies
-- Author: AI Assistant
-- Date: 2024-03-20

-- Create the generation_error_logs table
create table public.generation_error_logs (
    id bigserial primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    model varchar not null,
    source_text_hash varchar not null,
    source_text_length integer not null check (source_text_length between 1000 and 10000),
    error_code varchar(100) not null,
    error_message text not null,
    created_at timestamptz not null default now()
);

-- Create index
create index generation_error_logs_user_id_idx on public.generation_error_logs(user_id);

-- Enable Row Level Security
alter table public.generation_error_logs enable row level security;

-- Create RLS policies for authenticated users
create policy "Users can view their own error logs"
    on public.generation_error_logs
    for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can create their own error logs"
    on public.generation_error_logs
    for insert
    to authenticated
    with check (auth.uid() = user_id);

-- Note: Update and Delete policies are intentionally omitted as error logs should be immutable

-- Comments
comment on table public.generation_error_logs is 'Stores error logs from flashcard generation attempts';
comment on column public.generation_error_logs.model is 'The AI model that encountered the error';
comment on column public.generation_error_logs.source_text_hash is 'Hash of the source text that caused the error';
comment on column public.generation_error_logs.source_text_length is 'Length of the source text in characters';
comment on column public.generation_error_logs.error_code is 'Error code for categorizing the error';
comment on column public.generation_error_logs.error_message is 'Detailed error message';


================================================
FILE: supabase/migrations/20240320143003_disable_rls_policies.sql
================================================
-- Migration: Disable RLS policies
-- Description: Disables all RLS policies from flashcards, generations and generation_error_logs tables
-- Author: AI Assistant
-- Date: 2024-04-03

-- Disable policies for flashcards table
drop policy if exists "Users can view their own flashcards" on public.flashcards;
drop policy if exists "Users can create their own flashcards" on public.flashcards;
drop policy if exists "Users can update their own flashcards" on public.flashcards;
drop policy if exists "Users can delete their own flashcards" on public.flashcards;

-- Disable policies for generations table
drop policy if exists "Users can view their own generations" on public.generations;
drop policy if exists "Users can create their own generations" on public.generations;
drop policy if exists "Users can update their own generations" on public.generations;
drop policy if exists "Users can delete their own generations" on public.generations;

-- Disable policies for generation_error_logs table
drop policy if exists "Users can view their own error logs" on public.generation_error_logs;
drop policy if exists "Users can create their own error logs" on public.generation_error_logs;

-- Disable RLS on all tables
alter table public.flashcards disable row level security;
alter table public.generations disable row level security;
alter table public.generation_error_logs disable row level security;


================================================
FILE: .cursor/rules/api-supabase-astro-init.mdc
================================================
---
description: 
globs: 
alwaysApply: false
---
# Supabase Astro Initialization

This document provides a reproducible guide to create the necessary file structure for integrating Supabase with your Astro project.

## Prerequisites

- Your project should use Astro 5, TypeScript 5, React 19, and Tailwind 4.
- Install the `@supabase/supabase-js` package.
- Ensure that `/supabase/config.toml` exists
- Ensure that a file `/src/db/database.types.ts` exists and contains the correct type definitions for your database.

IMPORTANT: Check prerequisites before perfoming actions below. If they're not met, stop and ask a user for the fix.

## File Structure and Setup

### 1. Supabase Client Initialization

Create the file `/src/db/supabase.client.ts` with the following content:

```ts
import { createClient } from '@supabase/supabase-js';

import type { Database } from '../db/database.types.ts';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_KEY;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

This file initializes the Supabase client using the environment variables `SUPABASE_URL` and `SUPABASE_KEY`.


### 2. Middleware Setup

Create the file `/src/middleware/index.ts` with the following content:

```ts
import { defineMiddleware } from 'astro:middleware';

import { supabaseClient } from '../db/supabase.client.ts';

export const onRequest = defineMiddleware((context, next) => {
  context.locals.supabase = supabaseClient;
  return next();
});
```

This middleware adds the Supabase client to the Astro context locals, making it available throughout your application.


### 3. TypeScript Environment Definitions

Create the file `src/env.d.ts` with the following content:

```ts
/// <reference types="astro/client" />

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './db/database.types.ts';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
    }
  }
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

This file augments the global types to include the Supabase client on the Astro `App.Locals` object, ensuring proper typing throughout your application.



================================================
FILE: .cursor/rules/astro.mdc
================================================
---
description: 
globs: *.astro
alwaysApply: false
---
### Guidelines for Astro

- Leverage View Transitions API for smooth page transitions (use ClientRouter)
- Use content collections with type safety for blog posts, documentation, etc.
- Leverage Server Endpoints for API routes
- Use POST, GET  - uppercase format for endpoint handlers
- Use `export const prerender = false` for API routes
- Use zod for input validation in API routes
- Extract logic into services in `src/lib/services`
- Implement middleware for request/response modification
- Use image optimization with the Astro Image integration
- Implement hybrid rendering with server-side rendering where needed
- Use Astro.cookies for server-side cookie management
- Leverage import.meta.env for environment variables



================================================
FILE: .cursor/rules/backend.mdc
================================================
---
description: 
globs: src/db/*.ts,src/middleware/*.ts,src/lib/*.ts
alwaysApply: false
---
### Backend and Database

- Use Supabase for backend services, including authentication and database interactions.
- Follow Supabase guidelines for security and performance.
- Use Zod schemas to validate data exchanged with the backend.
- Use supabase from context.locals in Astro routes instead of importing supabaseClient directly
- Use SupabaseClient type from `src/db/supabase.client.ts`, not from `@supabase/supabase-js`


================================================
FILE: .cursor/rules/db-supabase-migrations.mdc
================================================
---
description: 
globs: 
alwaysApply: false
---
# Database: Create migration

You are a Postgres Expert who loves creating secure database schemas.

This project uses the migrations provided by the Supabase CLI.

## Creating a migration file

Given the context of the user's message, create a database migration file inside the folder `supabase/migrations/`.

The file MUST following this naming convention:

The file MUST be named in the format `YYYYMMDDHHmmss_short_description.sql` with proper casing for months, minutes, and seconds in UTC time:

1. `YYYY` - Four digits for the year (e.g., `2024`).
2. `MM` - Two digits for the month (01 to 12).
3. `DD` - Two digits for the day of the month (01 to 31).
4. `HH` - Two digits for the hour in 24-hour format (00 to 23).
5. `mm` - Two digits for the minute (00 to 59).
6. `ss` - Two digits for the second (00 to 59).
7. Add an appropriate description for the migration.

For example:

```
20240906123045_create_profiles.sql
```


## SQL Guidelines

Write Postgres-compatible SQL code for Supabase migration files that:

- Includes a header comment with metadata about the migration, such as the purpose, affected tables/columns, and any special considerations.
- Includes thorough comments explaining the purpose and expected behavior of each migration step.
- Write all SQL in lowercase.
- Add copious comments for any destructive SQL commands, including truncating, dropping, or column alterations.
- When creating a new table, you MUST enable Row Level Security (RLS) even if the table is intended for public access.
- When creating RLS Policies
  - Ensure the policies cover all relevant access scenarios (e.g. select, insert, update, delete) based on the table's purpose and data sensitivity.
  - If the table  is intended for public access the policy can simply return `true`.
  - RLS Policies should be granular: one policy for `select`, one for `insert` etc) and for each supabase role (`anon` and `authenticated`). DO NOT combine Policies even if the functionality is the same for both roles.
  - Include comments explaining the rationale and intended behavior of each security policy

The generated SQL code should be production-ready, well-documented, and aligned with Supabase's best practices.



================================================
FILE: .cursor/rules/frontend.mdc
================================================
---
description: 
globs: *.tsx,*.astro
alwaysApply: false
---
## Frontend

### General Guidelines

- Use Astro components (.astro) for static content and layout
- Implement framework components in React only when interactivity is needed

### Guidelines for Styling

#### Tailwind

- Use the @layer directive to organize styles into components, utilities, and base layers
- Use arbitrary values with square brackets (e.g., w-[123px]) for precise one-off designs
- Implement the Tailwind configuration file for customizing theme, plugins, and variants
- Leverage the theme() function in CSS for accessing Tailwind theme values
- Implement dark mode with the dark: variant
- Use responsive variants (sm:, md:, lg:, etc.) for adaptive designs
- Leverage state variants (hover:, focus-visible:, active:, etc.) for interactive elements

### Guidelines for Accessibility

#### ARIA Best Practices

- Use ARIA landmarks to identify regions of the page (main, navigation, search, etc.)
- Apply appropriate ARIA roles to custom interface elements that lack semantic HTML equivalents
- Set aria-expanded and aria-controls for expandable content like accordions and dropdowns
- Use aria-live regions with appropriate politeness settings for dynamic content updates
- Implement aria-hidden to hide decorative or duplicative content from screen readers
- Apply aria-label or aria-labelledby for elements without visible text labels
- Use aria-describedby to associate descriptive text with form inputs or complex elements
- Implement aria-current for indicating the current item in a set, navigation, or process
- Avoid redundant ARIA that duplicates the semantics of native HTML elements


================================================
FILE: .cursor/rules/react.mdc
================================================
---
description: 
globs: *.tsx
alwaysApply: false
---
### Guidelines for React

- Use functional components with hooks instead of class components
- Never use "use client" and other Next.js directives as we use React with Astro
- Extract logic into custom hooks in `src/components/hooks`
- Implement React.memo() for expensive components that render often with the same props
- Utilize React.lazy() and Suspense for code-splitting and performance optimization
- Use the useCallback hook for event handlers passed to child components to prevent unnecessary re-renders
- Prefer useMemo for expensive calculations to avoid recomputation on every render
- Implement useId() for generating unique IDs for accessibility attributes
- Consider using the new useOptimistic hook for optimistic UI updates in forms
- Use useTransition for non-urgent state updates to keep the UI responsive


================================================
FILE: .cursor/rules/shared.mdc
================================================
---
description: 
globs: 
alwaysApply: true
---
# AI Rules for {app-name}

{project-description}

## Tech Stack

- Astro 5
- TypeScript 5
- React 19
- Tailwind 4
- Shadcn/ui

## Project Structure

When introducing changes to the project, always follow the directory structure below:

- `./src` - source code
- `./src/layouts` - Astro layouts
- `./src/pages` - Astro pages
- `./src/pages/api` - API endpoints
- `./src/middleware/index.ts` - Astro middleware
- `./src/db` - Supabase clients and types
- `./src/types.ts` - Shared types for backend and frontend (Entities, DTOs)
- `./src/components` - Client-side components written in Astro (static) and React (dynamic)
- `./src/components/ui` - Client-side components from Shadcn/ui
- `./src/lib` - Services and helpers 
- `./src/assets` - static internal assets
- `./public` - public assets

When modifying the directory structure, always update this section.

## Coding practices

### Guidelines for clean code

- Use feedback from linters to improve the code when making changes.
- Prioritize error handling and edge cases.
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Consider using custom error types or error factories for consistent error handling.



================================================
FILE: .cursor/rules/ui-shadcn-helper.mdc
================================================
---
description: 
globs: 
alwaysApply: false
---
# Shadcn UI Components

Ten projekt wykorzystuje @shadcn/ui dla komponentów interfejsu użytkownika. Są to pięknie zaprojektowane, dostępne komponenty, które można dostosować do swojej aplikacji.

## Odszukiwanie zainstalowanych komponentów

Komponenty są dostępne w folderze `src/components/ui`, zgodnie z aliasami z pliku `components.json`

## Wykorzystanie komponentu

Zaimportuj komponent zgodnie ze skonfigurowanym aliasem `@/`

```tsx
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
```

Przykładowe wykorzsytanie komponnetów:

```tsx
<Button variant="outline">Click me</Button>

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

## Instalowanie dodatkowych komponentów

Wiele innych komponentów jest dostępnych, ale nie są one obecnie zainstalowane. Pełną listę można znaleźć na stronie https://ui.shadcn.com/r

Aby zainstalować nowy komponent, wykorzystaj shadcn CLI


```bash
npx shadcn@latest add [component-name]
```

Przykładowo, aby dodać komponent accordion

```bash
npx shadcn@latest add accordion
```

Ważne: `npx shadcn-ui@latest` zostało wycofane, korzystaj z `npx shadcn@latest`

Niektóre popularne komponenty to:

- Accordion
- Alert
- AlertDialog
- AspectRatio
- Avatar
- Calendar
- Checkbox
- Collapsible
- Command
- ContextMenu
- DataTable
- DatePicker
- Dropdown Menu
- Form
- Hover Card
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- ScrollArea
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Switch
- Table
- Textarea
- Sonner (previously Toast)
- Toggle
- Tooltip

## Component Styling

Ten projekt wykorzystuje wariant stylu „new-york” z kolorem bazowym "neutral" i zmiennymi CSS do tworzenia motywów, zgodnie z konfiguracją w sekcji `components.json`.


================================================
FILE: .github/copilot-instructions.md
================================================
# AI Rules for {{project-name}}

{{project-description}}

## Tech Stack

- Astro 5
- TypeScript 5
- React 19
- Tailwind 4
- Shadcn/ui

## Project Structure

When introducing changes to the project, always follow the directory structure below:

- `./src` - source code
- `./src/layouts` - Astro layouts
- `./src/pages` - Astro pages
- `./src/pages/api` - API endpoints
- `./src/middleware/index.ts` - Astro middleware
- `./src/db` - Supabase clients and types
- `./src/types.ts` - Shared types for backend and frontend (Entities, DTOs)
- `./src/components` - Client-side components written in Astro (static) and React (dynamic)
- `./src/components/ui` - Client-side components from Shadcn/ui
- `./src/lib` - Services and helpers
- `./src/assets` - static internal assets
- `./public` - public assets

When modifying the directory structure, always update this section.

## Coding practices

### Guidelines for clean code

- Use feedback from linters to improve the code when making changes.
- Prioritize error handling and edge cases.
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Consider using custom error types or error factories for consistent error handling.

## Frontend

### General Guidelines

- Use Astro components (.astro) for static content and layout
- Implement framework components in React only when interactivity is needed

### Guidelines for Styling

#### Tailwind

- Use the @layer directive to organize styles into components, utilities, and base layers
- Use arbitrary values with square brackets (e.g., w-[123px]) for precise one-off designs
- Implement the Tailwind configuration file for customizing theme, plugins, and variants
- Leverage the theme() function in CSS for accessing Tailwind theme values
- Implement dark mode with the dark: variant
- Use responsive variants (sm:, md:, lg:, etc.) for adaptive designs
- Leverage state variants (hover:, focus-visible:, active:, etc.) for interactive elements

### Guidelines for Accessibility

#### ARIA Best Practices

- Use ARIA landmarks to identify regions of the page (main, navigation, search, etc.)
- Apply appropriate ARIA roles to custom interface elements that lack semantic HTML equivalents
- Set aria-expanded and aria-controls for expandable content like accordions and dropdowns
- Use aria-live regions with appropriate politeness settings for dynamic content updates
- Implement aria-hidden to hide decorative or duplicative content from screen readers
- Apply aria-label or aria-labelledby for elements without visible text labels
- Use aria-describedby to associate descriptive text with form inputs or complex elements
- Implement aria-current for indicating the current item in a set, navigation, or process
- Avoid redundant ARIA that duplicates the semantics of native HTML elements

### Guidelines for Astro

- Leverage View Transitions API for smooth page transitions (use ClientRouter)
- Use content collections with type safety for blog posts, documentation, etc.
- Leverage Server Endpoints for API routes
- Use POST, GET  - uppercase format for endpoint handlers
- Use `export const prerender = false` for API routes
- Use zod for input validation in API routes
- Extract logic into services in `src/lib/services`
- Implement middleware for request/response modification
- Use image optimization with the Astro Image integration
- Implement hybrid rendering with server-side rendering where needed
- Use Astro.cookies for server-side cookie management
- Leverage import.meta.env for environment variables

### Guidelines for React

- Use functional components with hooks instead of class components
- Never use "use client" and other Next.js directives as we use React with Astro
- Extract logic into custom hooks in `src/components/hooks`
- Implement React.memo() for expensive components that render often with the same props
- Utilize React.lazy() and Suspense for code-splitting and performance optimization
- Use the useCallback hook for event handlers passed to child components to prevent unnecessary re-renders
- Prefer useMemo for expensive calculations to avoid recomputation on every render
- Implement useId() for generating unique IDs for accessibility attributes
- Consider using the new useOptimistic hook for optimistic UI updates in forms
- Use useTransition for non-urgent state updates to keep the UI responsive

### Backend and Database

- Use Supabase for backend services, including authentication and database interactions.
- Follow Supabase guidelines for security and performance.
- Use Zod schemas to validate data exchanged with the backend.
- Use supabase from context.locals in Astro routes instead of importing supabaseClient directly
- Use SupabaseClient type from `src/db/supabase.client.ts`, not from `@supabase/supabase-js`


================================================
FILE: .husky/pre-commit
================================================
npx lint-staged


