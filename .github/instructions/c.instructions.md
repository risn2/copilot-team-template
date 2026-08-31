---
applyTo: "**/*.c,**/*.h"
---

# C

Follow the [SEI CERT C Coding Standard](https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard) as the authoritative baseline. The ISO C standard defines the language but does not prescribe a general coding style.

- This template assigns `.h` files to C. A C++ project that uses `.h` for C++ headers must move that glob to its C++ instructions when adopting the template.
- Prefer the repository's selected C standard, compiler options, formatter, static analyzer, and established conventions when they are more specific.
- Keep interfaces small; give declarations internal linkage unless they are intentionally public, and make ownership and lifetimes explicit.
- Check ranges before conversions and arithmetic. Avoid undefined, unspecified, and implementation-defined behavior unless the dependency is documented and tested.
- Validate external input, check library and system-call results, and leave resources in a well-defined state on every error path.
- Use bounds-aware operations and track buffer capacity separately from content length. Never form or access an object outside its valid bounds or lifetime.
- Compile at the repository's strictest warning level and resolve warnings rather than suppressing them without a documented reason.
