# Metrics API

Base URL: `http://localhost:3000`

## Ingest a metric

`POST /metrics`

```json
{
  "service_id": "AuthService",
  "metric_type": "auth_latency",
  "metric_value": 42
}
```

The service adds `timestamp` before storing the metric. A successful request returns HTTP 200 with the text `Metrics received!`.

If any required field is absent, the API returns HTTP 400 with `Missing required fields: service_id, metric_type, metric_value`. Domain validation also requires non-empty string identifiers and a numeric value.

## List metrics

`GET /debug`

Returns HTTP 200 and a JSON array containing all metrics stored since process startup. This endpoint is intended for local inspection.

```bash
curl -X POST http://localhost:3001/metrics \
  -H 'Content-Type: application/json' \
  -d '{"service_id":"AuthService","metric_type":"auth_latency","metric_value":42}'
```
