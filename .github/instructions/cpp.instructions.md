---
applyTo: "**/*.cc,**/*.cpp,**/*.cxx,**/*.hh,**/*.hpp,**/*.hxx"
---

# C++

Follow the [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) as the authoritative baseline.

- Prefer the repository's selected C++ standard, compiler options, formatter, static analyzer, and established conventions when they are more specific.
- Express ownership with RAII and value semantics; use raw pointers and references as non-owning views unless an API explicitly documents otherwise.
- Prefer scoped objects and standard-library facilities over manual resource management, C-style casts, macros, and owning arrays.
- Keep interfaces type-safe and make invalid states difficult to represent. Use `const`, concepts, and compile-time checks where they clarify intent.
- Define error behavior explicitly and preserve invariants on failure. Do not allow exceptions to escape destructors.
- Avoid undefined behavior, unchecked narrowing, invalidated iterators or views, and access beyond an object's lifetime.
- Compile at the repository's strictest warning level and resolve warnings rather than suppressing them without a documented reason.
