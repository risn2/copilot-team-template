---
applyTo: "**/*.py,**/*.pyi"
---

# Python

Follow [PEP 8](https://peps.python.org/pep-0008/) for code style and [PEP 257](https://peps.python.org/pep-0257/) for docstrings.

- Prefer the repository's supported Python versions, `pyproject.toml`, formatter, linter, type checker, and established conventions when they are more specific.
- Use clear `snake_case` names for functions and variables, `PascalCase` for classes, and explicit imports.
- Add precise type annotations to new and changed interfaces. Keep stubs and runtime signatures consistent.
- Keep side effects visible and controllable; do not perform network, filesystem, or process work at import time.
- Catch the narrowest useful exception, preserve exception context, and use context managers for resources.
- Validate data at trust boundaries and avoid `eval`, `exec`, unsafe deserialization, shell interpolation, and mutable default arguments.
- Write docstrings for public modules, classes, functions, and methods, focusing on behavior, inputs, outputs, and raised exceptions.
