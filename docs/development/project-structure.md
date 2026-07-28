# Project structure

```text
tlcore/
├── ctrl/          # Express control API and routes
├── health/        # Evaluation, monitor, and health-state stores
├── incidents/     # Creation, degradation detection, lifecycle, and stores
├── runtime/       # Simulated services, ingestion API, runtime/failure state
├── telemetry/     # Metric schema, validation, emission, and storage
├── shared/        # Small cross-domain utilities
├── tests/         # Jest tests organized by domain
├── docs/          # Architecture, API, concepts, development, and diagrams
└── index.js       # Process composition and startup
```

## Where changes belong

- Add simulated service behavior under `runtime/servs/`.
- Add metric construction or storage behavior under `telemetry/metrics/`.
- Add health rules under `health/eval/` and orchestration under `health/monitor/`.
- Add incident rules under `incidents/`.
- Add external command/query routing under `ctrl/routes/`.
- Put generic, domain-neutral helpers under `shared/` only when reuse is real.

The runtime ingestion API lives under `runtime/api/` because it is composed with runtime startup, but it writes through the telemetry domain.
