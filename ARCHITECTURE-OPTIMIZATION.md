# Dashboard Integration Structure Optimization

This document outlines practical structural improvements for the dashboard integration codebase.

## 1) Split large files into feature modules

Current card files are large and combine multiple concerns (rendering, styles, translation, actions, history logic, and editor).

Recommended structure per card:

- `cards/<card-name>/index.js` (registration + public exports)
- `cards/<card-name>/component.js` (runtime card class)
- `cards/<card-name>/editor.js` (Lovelace editor class)
- `cards/<card-name>/styles.js` (CSS template literals)
- `cards/<card-name>/i18n.js` (translations)
- `cards/<card-name>/config.js` (defaults + validation)
- `cards/<card-name>/services.js` (Home Assistant service calls)

Benefits:

- better maintainability
- lower merge conflict rate
- easier testability
- clearer code ownership

## 2) Introduce shared utility modules

Move repeated logic to `shared/`:

- `shared/i18n.js`: language resolving + translation merge
- `shared/config.js`: schema validation and numeric clamping
- `shared/dom.js`: escaping and safe DOM helpers
- `shared/ha.js`: wrappers for `callService` and state access

Benefits:

- less duplication
- consistent behavior across cards
- easier to add new cards

## 3) Replace full-template rerenders with partial updates

Some cards rebuild large HTML strings on updates. Prefer:

- one-time DOM creation
- targeted text/attribute/class updates
- CSS variables for dynamic visual changes

Benefits:

- fewer layout thrashes
- improved dashboard responsiveness
- reduced garbage creation

## 4) Centralize translation dictionaries

Create one translation source per locale with section namespaces:

- `i18n/en.js`, `i18n/de.js`, ...
- keys grouped by card/editor section

Add a translation lint step that checks for missing keys per locale.

Benefits:

- fewer missing labels
- easier contribution workflow for translators

## 5) Add configuration schema + migration layer

Define schema for every card config and normalize older options through a migration function.

Benefits:

- backward compatibility with explicit versioned migrations
- clearer error messages in UI editor
- safer future refactors

## 6) Reduce loader complexity and define packaging strategy

The loader currently attempts many fallback URLs. Keep compatibility, but move fallback resolution into a dedicated helper and define a single preferred resource path in docs.

Benefits:

- easier troubleshooting
- less runtime complexity

## 7) Add automated checks

Suggested CI checks:

- ESLint + Prettier
- unit tests for config normalization and translation fallback
- snapshot tests for generated editor markup
- optional visual regression for card variants

## 8) Suggested implementation phases

1. **Foundation**: extract shared helpers (`i18n`, `config`, `dom`) and keep public behavior unchanged.
2. **Card split**: split each card into `component/editor/styles` modules.
3. **Performance**: replace full rerenders with granular updates.
4. **Stability**: add migration and CI checks.

This phased approach lowers risk while improving code quality steadily.
