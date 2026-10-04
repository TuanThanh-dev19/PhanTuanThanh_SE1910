# FUNewsManagementSystem

SBA301 Assignment 01 - a ReactJS single-page administration application for managing news categories, articles and mock user accounts.

## Technology

- ReactJS with Vite.
- React Router for SPA navigation and protected routes.
- React Context and component state for application data and UI state.
- Browser `localStorage` for mock persistence.
- Plain HTML and CSS for the interface.

The assignment does not use a Spring Boot backend, database, JWT or production authentication.

## Requirements

- Node.js 22.22 or newer and npm.

## Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Production verification:

```bash
npm run lint
npm run build
```

## Test credential

- Username: `Admin`
- Password: `Admin`

The credential is case-sensitive. Other mock Staff records are management data and cannot log in to the administration area.

## Core functions

- Login validation, persistent mock session, protected routes and logout.
- Shared Header, Sidebar and responsive administration layout.
- Navigation for Dashboard, Category, News, Users and Settings.
- Category CRUD and Search with duplicate-name validation.
- News CRUD and Search with Category and creator relations.
- User CRUD and Search with Admin/Staff and Active/Inactive values.
- Popup dialog for Create/Update.
- Confirmation dialog for Delete.
- Empty and no-result states.
- Dashboard summary and a read-only Settings page for the current mock session.

## Data and delete rules

- Category, News and Users are initialized from seed data and persisted in `localStorage`.
- A Category referenced by News cannot be deleted.
- The baseline system Admin cannot be edited or deleted.
- A User referenced as a News creator cannot be deleted.
- User mock passwords are not displayed in the Users table.

## Project structure

```text
src/
├─ components/   Reusable layout, common and entity components
├─ context/      Authentication and shared data providers
├─ data/         Initial mock data and immutable CRUD operations
├─ hooks/        Context access hooks
├─ layouts/      Shared admin layout
├─ pages/        Login and administration pages
├─ routes/       Protected route
├─ services/     localStorage access
└─ utils/        Form validation and ID generation
```

## Verification documents

- `docs/requirements.md`: requirement traceability and data rules.
- `docs/design.md`: component, state, persistence and CRUD design decisions.
- `docs/code-flow.md`: concise Login, CRUD, Search and reload execution flows.
- `docs/test-matrix.md`: manual test cases and actual results.
- `docs/debug-log.md`: defects, root causes, fixes and retests.
- `docs/ai-usage-log.md`: AI prompts, applied suggestions and verification.

## Limitations

- Authentication and passwords are only mock assignment data.
- Data belongs to one browser origin and can be removed by clearing browser storage.
- There is no backend synchronization or multi-user concurrency.
- Staff authorization is outside the core scope; only `Admin/Admin` can log in.

## AI usage

AI was used for requirement analysis, implementation review, test-case preparation, debugging suggestions and the original FUNews logo. Every applied result is recorded and verified in `docs/ai-usage-log.md`.
