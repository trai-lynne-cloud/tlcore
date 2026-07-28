# Failure injection

Failure injection changes shared Boolean flags read by simulated services on each timer tick.

| Flag | Effect while enabled |
| --- | --- |
| `latencySpike` | Auth latency is generated from 200–800 instead of 10–60. |
| `queueBacklogSpike` | Billing and notification queue depth are generated from 500–5000 instead of 0–150. |
| `cpuSpike` | CPU utilization is generated from 85–100 instead of 10–60. |
| `failSpike` | Notification failure rate is generated from 20–100 instead of 0–10; monitoring has a small chance to throw. |

Flags affect future service executions; enabling one does not rewrite existing metrics. Recovery restores normal generation ranges on later ticks.

`latencySpike`, `cpuSpike`, and `failSpike` can drive health evaluation directly. Queue backlog is observable but is not part of current health thresholds.

`MonitoringService` throws when `failSpike` is enabled and a random check passes. That error is not caught inside the timer callback, so this mode may terminate the process; use it deliberately.

See [Failure API](../api/failures.md).
