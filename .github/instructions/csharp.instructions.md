---
applyTo: "**/*.cs"
---

# C#

Follow Microsoft's [.NET coding conventions for C#](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions).

- Prefer the repository's `.editorconfig`, analyzer rules, target framework, formatter, and established conventions when they are more specific.
- Use `PascalCase` for types and public members, `camelCase` for parameters and local variables, and meaningful names rather than abbreviations.
- Enable nullable reference types where the project permits it, model nullability accurately, and validate public method arguments.
- Use `async` and `await` for asynchronous work; propagate `CancellationToken`, avoid blocking waits, and use the `Async` suffix for awaitable methods.
- Dispose owned resources deterministically with `using` or `await using`. Do not dispose resources owned by callers.
- Catch only exceptions that can be handled meaningfully; preserve the original exception when rethrowing and avoid exceptions for normal control flow.
- Keep public APIs documented and backward-compatible unless a breaking change is explicitly approved.
