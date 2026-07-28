# Architecture overview

TLCore models the feedback loop of an observable distributed system inside one Node.js process. Domain boundaries are represented by modules and in-memory stores rather than separately deployed services.

## Domains

| Domain | Owns | Entry points |
| --- | --- | --- |
| Runtime | Simulated services and logical runtime state | `runtime/` |
| Telemetry | Metric validation, creation, and storage | `telemetry/` |
| Health | Metric evaluation and health-state history | `health/` |
| Incidents | Incident creation, lifecycle, and degradation detection | `incidents/` |
| Control | HTTP commands and queries | `ctrl/` |

## Data flow

```text
simulated services ──► metric store ──► health monitor
       ▲                                      │
       │ failure flags                        ▼
control API ◄──────────────────────── incident store
```

At startup, `index.js` starts the control server, service timers, ingestion server, and health monitor. Services emit metrics into a shared store. Every 10 seconds, the monitor evaluates recent metrics, stabilizes the result, records changes, and checks for sustained degradation. A sustained unhealthy state can create an incident.

## Architectural constraints

- All state is process-local and volatile.
- Runtime services use independent timers.
- API handlers delegate to domain modules.
- Logical runtime state is not connected to the service timers.
- There is no authentication, persistence, distributed transport, or retention limit.

See [Architecture diagram](../diagrams/architecture.md) and [Future roadmap](../diagrams/future-roadmap.md).
