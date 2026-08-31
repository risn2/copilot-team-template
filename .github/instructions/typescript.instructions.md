---
applyTo: "**/*.ts,**/*.tsx,**/*.mts,**/*.cts"
---

# TypeScript

Microsoft's [TypeScript coding guidelines](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines) apply to the TypeScript codebase rather than prescribing a universal community style. Use them as the language-provider reference where this repository has no more specific convention.

- Prefer the repository's `tsconfig`, supported runtimes, formatter, linter, package metadata, and established conventions when they are more specific.
- Preserve strict type safety. Avoid `any`; use `unknown` with narrowing when a value's type is not yet known.
- Model domain states with precise interfaces, unions, and generics. Avoid type assertions that merely silence errors.
- Keep runtime validation at trust boundaries because static types are erased. Do not trust parsed JSON, environment variables, or external responses without validation.
- Use `async` and `await` for asynchronous flows, await or return every promise, and handle rejection at an appropriate boundary.
- Treat exported types and declarations as public API; keep `.d.ts` output accurate and avoid unintended compatibility breaks.
- Narrow nullable and optional values explicitly, and make exhaustive checks fail at compile time where practical.
