# Telemetry architecture

Telemetry is the boundary between simulated workload behavior and health evaluation.

## Metric pipeline

1. A runtime service or `POST /metrics` calls `emitMetric`.
2. `validateMetric` checks the three supplied fields.
3. `createMetric` adds an ISO-8601 timestamp.
4. `metricStore` appends the metric to an in-memory array.
5. The health monitor reads a copy of the stored array.

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 42,
  "timestamp": "2026-07-28T19:00:00.000Z"
}
```

`service_id` and `metric_type` must be non-empty strings. `metric_value` must be a number. Metric types are not restricted to a fixed registry, although only selected types affect health.

The store is append-only during normal execution, has no retention limit, and is cleared on process restart. `getMetrics()` returns a shallow copy.

See [Metrics API](../api/metrics.md) and [Health evaluation](../concepts/health-evaluation.md).
