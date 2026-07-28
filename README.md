# TLCore

TLCore is a lightweight distributed-systems laboratory for exploring service runtime behavior, telemetry, health evaluation, incident lifecycles, and controlled failure injection.

The project runs as a single Node.js process with in-memory state and one HTTP server.

## Quick start

```bash
npm install
npm start
```

The server listens at `http://localhost:3000`. Run the test suite with:

```bash
npm test
```

## API overview

All application routes use the `/api` prefix.

| Area | Routes |
| --- | --- |
| Runtime | `GET /api/runtime/status`, `POST /api/ctrl/runtime/{start,stop,restart}` |
| Failures | `GET /api/fail-state`, `POST /api/ctrl/fail/{trigger,recover}/:flag` |
| Metrics | `POST /api/metrics`, `GET /api/debug` |
| Incidents | `GET /api/incidents`, `POST /api/ctrl/incidents/trigger` |

For example:

```bash
curl http://localhost:3000/api/runtime/status
curl -X POST http://localhost:3000/api/ctrl/fail/trigger/latencySpike
curl http://localhost:3000/api/debug
curl -X POST http://localhost:3000/api/ctrl/fail/recover/latencySpike
```

Runtime status currently represents logical intent; runtime service timers execute independently of that status.

## Documentation

- [Architecture overview](docs/architecture/architecture-overview.md)
- [Runtime architecture](docs/architecture/runtime.md)
- [API reference](docs/api/runtime.md)
- [Core concepts](docs/concepts/health-evaluation.md)
- [Project structure](docs/development/project-structure.md)
- [Testing](docs/development/testing.md)
- [Contributing](docs/development/contributing.md)
- [Future roadmap](docs/diagrams/future-roadmap.md)

## Project status

TLCore is an educational simulator, not a production monitoring system. Metrics, health state, failure flags, and incidents reset when the process exits.
