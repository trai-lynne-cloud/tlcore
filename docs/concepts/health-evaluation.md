# Health evaluation

TLCore evaluates three metric types: `auth_latency`, `cpu_utilization`, and `notification_fail_rate`. For each type, it averages up to the 10 most recent values found within the monitor's latest 50 metrics.

## Current-state thresholds

| State | Any matching condition |
| --- | --- |
| `FAILING` | auth latency ≥ 200; CPU > 85; notification failure rate > 20 |
| `DEGRADED` | auth latency ≥ 30; CPU > 60; notification failure rate > 10 |
| `HEALTHY` | no degraded or failing condition |
| `UNKNOWN` | no metrics were supplied |

Failing conditions are checked first. Billing and notification queue-depth metrics are collected but do not currently affect health.

## Stabilization

Each current-state result is added to a five-entry history. The stable state is:

- `FAILING` when at least two history entries are failing;
- otherwise `DEGRADED` when at least three entries are degraded; or
- otherwise `HEALTHY`.

An empty history returns `UNKNOWN`. Because stabilization uses fixed counts rather than a simple majority, mixed histories may resolve to `HEALTHY`.
