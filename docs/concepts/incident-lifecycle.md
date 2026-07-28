# Incident lifecycle

Every incident starts as `OPEN` and follows one linear path:

```text
OPEN ──► ACTIVE ──► RESOLVED
```

No transition can be skipped or reversed, and `RESOLVED` is terminal.

An incident record contains:

| Field | Meaning |
| --- | --- |
| `incident_id` | Generated UUID |
| `service_id` | Service or detector associated with the incident |
| `severity` | `S0`, `S1`, `S2`, `S3`, or test value `test` |
| `start_time` | ISO-8601 creation time |
| `status` | Current lifecycle status |

Each accepted status change also produces a transition record with `incident_id`, `previous_status`, `next_status`, and `transition_time`. Incident records show current state; transition records provide the audit history.

The update and history append are synchronous but are not backed by a transaction or persistent database.
