# Health architecture

The health monitor converts raw metrics into a stable system state and feeds degradation detection.

Every 10 seconds it:

1. reads the most recent 50 metrics;
2. averages up to 10 values for each health-relevant metric type;
3. classifies the current state;
4. appends that result to a five-entry history;
5. derives a stable state;
6. records a transition if that stable state changed; and
7. checks whether degradation has lasted long enough to create an incident.

States are `UNKNOWN`, `HEALTHY`, `DEGRADED`, and `FAILING`. The first empty evaluation is `UNKNOWN`. State-transition records include the previous state, next state, timestamp, and the most recent 20 metrics.

The health domain reads telemetry but does not mutate metrics. It delegates incident creation to the incident domain.

See [Health evaluation](../concepts/health-evaluation.md) and [Sustained degradation](../concepts/sustained-degradation.md).
