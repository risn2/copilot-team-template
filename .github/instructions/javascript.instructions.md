---
applyTo: "**/*.js,**/*.jsx,**/*.mjs,**/*.cjs"
---

# JavaScript

Follow MDN's [JavaScript guidelines](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript) as the provider-maintained baseline. ECMAScript defines the language but does not prescribe a general coding style.

- Prefer the repository's supported runtimes, module system, formatter, linter, package metadata, and established conventions when they are more specific.
- Use `const` by default and `let` only for reassignment. Avoid `var`, implicit globals, and mutation that obscures data flow.
- Use strict equality and explicit coercion. Handle `null`, `undefined`, `NaN`, and boundary values deliberately.
- Use `async` and `await` for asynchronous flows, await or return every promise, and handle rejection at an appropriate boundary.
- Validate untrusted input and avoid dynamic code execution, unsafe HTML insertion, prototype pollution, and shell-command interpolation.
- Keep browser and Node.js APIs separated where runtime portability matters, and do not assume globals unavailable in the declared target.
- Preserve public API and module compatibility unless a breaking change is explicitly approved.
