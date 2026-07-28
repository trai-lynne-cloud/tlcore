# Contributing

## Workflow

1. Create a focused branch.
2. Install dependencies with `npm install`.
3. Make the smallest coherent change within the owning domain.
4. Add or update Jest tests.
5. Run `npm test` before opening a pull request.
6. Update the relevant page under `docs/` when behavior or an endpoint changes.

## Design guidelines

- Keep business logic in its domain, not in Express route handlers.
- Validate data at domain boundaries.
- Access shared state through the owning store or controller.
- Preserve CommonJS module style unless the project adopts a coordinated migration.
- Keep tests deterministic by clearing mutable stores between cases.
- Document current behavior and label proposed behavior as roadmap work.

Pull requests should explain the behavior change, verification performed, and any compatibility or operational implications.
