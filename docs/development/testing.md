# Testing

TLCore uses Jest. Run all tests from the project root:

```bash
npm test
```

Tests currently cover runtime controllers and services, telemetry schema/emission/storage, failure state, and incident schema/lifecycle/storage.

## Testing stateful modules

Several modules export process-local stores. Tests that mutate them should reset state in `beforeEach` or `afterEach` using the available helpers:

- `clearMetrics()`
- `clearIncidentStore()`
- `clearIncidentTransitionStore()`

Runtime and failure state do not currently expose dedicated reset helpers, so tests should restore any changed state explicitly.

## Timer-based code

Prefer testing a service's `behavior()` or the monitor's `runEvaluation()` directly. If a test exercises `start()`, use Jest fake timers and clean up timers after the test so the process can exit.

Add regression tests for boundary values, invalid transitions, duplicate operations, and interactions between stabilization and degradation timing.
